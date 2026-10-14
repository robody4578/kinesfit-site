<?php
/* Kinesfit — recebe a planta da sala (só imagens) pelo site e envia por e-mail com os arquivos anexos.
   As imagens não ficam gravadas no servidor: vão anexas no e-mail e são descartadas. */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$DESTINO = 'contato@kinesfit.com.br';
$REMETENTE = 'contato@kinesfit.com.br';
$MAX_ARQ = 3;                    /* até 3 imagens */
$MAX_BYTES = 8 * 1024 * 1024;    /* por imagem (o site já reduz antes de enviar) */
$TIPOS = array('image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp');

function sair($ok, $extra = array(), $code = 200) {
    http_response_code($code);
    echo json_encode(array_merge(array('ok' => $ok), $extra));
    exit;
}
function limpa($s, $max) {
    $s = is_string($s) ? $s : '';
    $s = preg_replace('/[^\P{C}\n\t]+/u', '', $s);
    $s = trim($s);
    return mb_substr($s, 0, $max, 'UTF-8');
}
function linha($s) { return trim(preg_replace('/[\r\n]+/', ' ', $s)); }
function campo($k, $max) { return isset($_POST[$k]) ? limpa($_POST[$k], $max) : ''; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') sair(false, array('erro' => 'metodo'), 405);
/* POST maior que o limite do PHP chega vazio */
if (empty($_POST) && empty($_FILES)) sair(false, array('erro' => 'grande'), 413);

/* anti-spam: campo invisível preenchido = robô (responde "ok" sem enviar) */
if (campo('website', 200) !== '') sair(true, array('ref' => 'KF-OK'));

$nome = linha(campo('nome', 120));
$email = linha(campo('email', 160));
$tel = linha(campo('tel', 40));
$tipo = linha(campo('tipo', 60));
$cidade = linha(campo('cidade', 80));
$msg = campo('msg', 2000);
if ($nome === '') sair(false, array('erro' => 'nome'), 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) sair(false, array('erro' => 'email'), 422);

/* limite por IP: 5 envios a cada 15 minutos */
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0';
$arq = sys_get_temp_dir() . '/kf_pl_' . md5($ip);
$agora = time();
$marcas = array();
if (is_file($arq)) {
    $marcas = array_filter(array_map('intval', explode(',', (string)@file_get_contents($arq))), function ($t) use ($agora) { return $t > $agora - 900; });
}
if (count($marcas) >= 5) sair(false, array('erro' => 'limite'), 429);

/* arquivos: confere o conteúdo de verdade (não só a extensão) */
$anexos = array();
if (isset($_FILES['planta']) && is_array($_FILES['planta']['name'])) {
    $f = $_FILES['planta'];
    $qtd = count($f['name']);
    if ($qtd > $MAX_ARQ) sair(false, array('erro' => 'quantidade'), 422);
    for ($i = 0; $i < $qtd; $i++) {
        if ($f['error'][$i] === UPLOAD_ERR_NO_FILE) continue;
        if ($f['error'][$i] === UPLOAD_ERR_INI_SIZE || $f['error'][$i] === UPLOAD_ERR_FORM_SIZE) sair(false, array('erro' => 'grande'), 413);
        if ($f['error'][$i] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'][$i])) sair(false, array('erro' => 'upload'), 400);
        if ($f['size'][$i] > $MAX_BYTES) sair(false, array('erro' => 'grande'), 413);
        $info = @getimagesize($f['tmp_name'][$i]);
        $mime = $info && isset($info['mime']) ? $info['mime'] : '';
        if (!isset($TIPOS[$mime])) sair(false, array('erro' => 'tipo'), 415);
        $anexos[] = array('nome' => 'planta-' . (count($anexos) + 1) . '.' . $TIPOS[$mime], 'mime' => $mime, 'dados' => file_get_contents($f['tmp_name'][$i]));
    }
}
if (!count($anexos)) sair(false, array('erro' => 'sem_arquivo'), 422);

$ref = 'KF-' . date('ymd') . '-' . strtoupper(substr(md5($nome . $email . microtime()), 0, 4));
$corpo = "Nova planta para projeto de layout pelo site (protocolo $ref)\n\n";
$corpo .= "Nome: $nome\n";
$corpo .= "E-mail: $email\n";
if ($tel !== '') $corpo .= "Telefone/WhatsApp: $tel\n";
if ($tipo !== '') $corpo .= "Tipo de espaço: $tipo\n";
if ($cidade !== '') $corpo .= "Cidade: $cidade\n";
if ($msg !== '') $corpo .= "\nMensagem:\n$msg\n";
$corpo .= "\nArquivos anexos: " . count($anexos) . " imagem(ns).\n";
$corpo .= "\n--\nEnviado em " . date('d/m/Y H:i') . " pelo site kinesfit.com.br. Para responder, use \"Responder\": o e-mail do cliente já está no campo de resposta.\n";

if (campo('dry', 5) !== '') sair(true, array('ref' => $ref, 'dry' => true, 'arquivos' => count($anexos)));

$lim = 'kf' . md5(uniqid('', true));
$corpoMime = "--$lim\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($corpo));
foreach ($anexos as $a) {
    $corpoMime .= "--$lim\r\nContent-Type: {$a['mime']}; name=\"{$a['nome']}\"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"{$a['nome']}\"\r\n\r\n" . chunk_split(base64_encode($a['dados']));
}
$corpoMime .= "--$lim--\r\n";

$assunto = '=?UTF-8?B?' . base64_encode("Projeto de layout $ref - $nome") . '?=';
$cab = array(
    'From: =?UTF-8?B?' . base64_encode('Site Kinesfit') . '?= <' . $REMETENTE . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $lim . '"',
    'X-Mailer: kinesfit-site'
);
$ok = @mail($DESTINO, $assunto, $corpoMime, implode("\r\n", $cab), '-f' . $REMETENTE);

/* registro em texto fora da pasta pública (sem as imagens), caso o e-mail caia no spam */
@file_put_contents(dirname(__DIR__) . '/plantas-recebidas.log', '[' . date('c') . "] " . ($ok ? 'ENVIADO' : 'FALHA') . "\n" . $corpo . "\n==========\n", FILE_APPEND | LOCK_EX);

if (!$ok) sair(false, array('erro' => 'envio'), 500);
$marcas[] = $agora;
@file_put_contents($arq, implode(',', $marcas));
sair(true, array('ref' => $ref));
