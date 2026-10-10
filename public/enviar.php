<?php
/* Kinesfit — recebe o pedido de orçamento do site e envia para o e-mail da empresa. */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$DESTINO = 'contato@kinesfit.com.br';
$REMETENTE = 'contato@kinesfit.com.br';

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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') sair(false, array('erro' => 'metodo'), 405);
$raw = file_get_contents('php://input');
if (strlen($raw) > 60000) sair(false, array('erro' => 'grande'), 413);
$in = json_decode($raw, true);
if (!is_array($in)) sair(false, array('erro' => 'dados'), 400);

/* anti-spam: campo invisível preenchido ou envio rápido demais = robô (responde "ok" sem enviar) */
if (!empty($in['website'])) sair(true, array('ref' => 'KF-OK'));
$nome = linha(limpa(isset($in['nome']) ? $in['nome'] : '', 120));
$email = linha(limpa(isset($in['email']) ? $in['email'] : '', 160));
if ($nome === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) sair(false, array('erro' => 'campos'), 422);

/* limite por IP: 6 envios a cada 15 minutos */
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0';
$arq = sys_get_temp_dir() . '/kf_rl_' . md5($ip);
$agora = time();
$marcas = array();
if (is_file($arq)) {
    $marcas = array_filter(array_map('intval', explode(',', (string)@file_get_contents($arq))), function ($t) use ($agora) { return $t > $agora - 900; });
}
if (count($marcas) >= 6) sair(false, array('erro' => 'limite'), 429);

$empresa = linha(limpa(isset($in['empresa']) ? $in['empresa'] : '', 120));
$tel = linha(limpa(isset($in['tel']) ? $in['tel'] : '', 40));
$tipo = linha(limpa(isset($in['tipo']) ? $in['tipo'] : '', 60));
$msg = limpa(isset($in['msg']) ? $in['msg'] : '', 2000);

$linhas = array();
$n = 0;
if (!empty($in['itens']) && is_array($in['itens'])) {
    foreach ($in['itens'] as $it) {
        if (!is_array($it) || $n >= 60) continue;
        $nm = linha(limpa(isset($it['nome']) ? $it['nome'] : '', 140));
        if ($nm === '') continue;
        $q = max(1, min(999, (int)(isset($it['qtd']) ? $it['qtd'] : 1)));
        $md = linha(limpa(isset($it['modelo']) ? $it['modelo'] : '', 140));
        $n++;
        $linhas[] = $n . ') ' . $nm . ' — Quantidade: ' . $q . ($md !== '' ? ' — Modelo/obs.: ' . $md : '');
    }
}
if ($n === 0 && $msg === '') sair(false, array('erro' => 'vazio'), 422);

$ref = 'KF-' . date('ymd') . '-' . strtoupper(substr(md5($raw . microtime()), 0, 4));
$corpo = "Novo pedido de orçamento pelo site (protocolo $ref)\n\n";
$corpo .= "Nome: $nome\n";
if ($empresa !== '') $corpo .= "Empresa/condomínio: $empresa\n";
$corpo .= "E-mail: $email\n";
if ($tel !== '') $corpo .= "Telefone/WhatsApp: $tel\n";
if ($tipo !== '') $corpo .= "Tipo de espaço: $tipo\n";
if ($n > 0) $corpo .= "\nItens do orçamento:\n" . implode("\n", $linhas) . "\n";
if ($msg !== '') $corpo .= "\nMensagem:\n$msg\n";
$corpo .= "\n--\nEnviado em " . date('d/m/Y H:i') . " pelo site kinesfit.com.br. Para responder, use \"Responder\": o e-mail do cliente já está no campo de resposta.\n";

if (!empty($in['dry'])) sair(true, array('ref' => $ref, 'dry' => true));

$assunto = '=?UTF-8?B?' . base64_encode("Pedido de orçamento $ref - $nome") . '?=';
$cab = array(
    'From: =?UTF-8?B?' . base64_encode('Site Kinesfit') . '?= <' . $REMETENTE . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'X-Mailer: kinesfit-site'
);
$ok = @mail($DESTINO, $assunto, chunk_split(base64_encode($corpo)), implode("\r\n", $cab), '-f' . $REMETENTE);

/* cópia de segurança fora da pasta pública (caso o e-mail caia no spam) */
@file_put_contents(dirname(__DIR__) . '/orcamentos-recebidos.log', '[' . date('c') . "] " . ($ok ? 'ENVIADO' : 'FALHA') . "\n" . $corpo . "\n==========\n", FILE_APPEND | LOCK_EX);

if (!$ok) sair(false, array('erro' => 'envio'), 500);
$marcas[] = $agora;
@file_put_contents($arq, implode(',', $marcas));
sair(true, array('ref' => $ref));
