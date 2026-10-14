/* Gerador do site Kinesfit: recebe os dados e os textos-base e devolve {caminho: conteúdo}. Roda no Node e no navegador. */
(function(root){
function kfBuild(DATA, SH, CSS, APP, PHP, HOJE){
  var S = new Function("equipamentos", SH + "\n;return {CONFIG:CONFIG,CATS:CATS,SUBS:SUBS,CAT_LABEL:CAT_LABEL,CAT_SLUG:CAT_SLUG,esc:esc,slug:slug,waLink:waLink,tipo:tipo,localImg:localImg,altText:altText,imgTag:imgTag,pUrl:pUrl,cardHTML:cardHTML,brl:brl,precoHTML:precoHTML};")(DATA);
  var esc = S.esc, SITE = S.CONFIG.site, out = {};
  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="7" fill="#a21d54"/><path d="M15 12v40M16.5 32L40 13M16.5 32L40 52" stroke="#fff" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M52 13L44.5 51" stroke="#fff" stroke-opacity=".45" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var WORD = '<span class="lw"><b>KINES<i>FIT</i></b><small>Equipamentos fitness</small></span>';
  var FAV = "/assets/favicon.svg?v=" + HOJE + ".12";
  var WAI = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.4-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.2 1.5z"/></svg>';
  var MAILI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
  var WAURL = S.waLink("Olá! Gostaria de solicitar um orçamento de equipamentos fitness.");
  var OGIMG = SITE + "/assets/og-kinesfit.png";

  var PHURI = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#e9eef1"/><path d="M70 60v80M70 102l50-42M84 98l40 42" stroke="#b8c6ce" stroke-width="14" stroke-linecap="round" fill="none"/></svg>');
  var IMGFAIL = '<script>function imgFail(el){try{if(typeof equipamentos==="undefined"){el.dataset.r=(+el.dataset.r||0)+1;if(el.dataset.r<20){setTimeout(function(){imgFail(el)},250);return}}else if(el.dataset.step==="0"){var p=equipamentos.find(function(x){return x.id===el.dataset.pid});if(p){el.dataset.step="1";el.src=p.img;return}}}catch(e){}el.onerror=null;el.src="' + PHURI + '"}</script>';
  function cut(s, n){ s = s.replace(/\s+/g," ").trim(); if(s.length<=n) return s; s = s.slice(0,n-1); return s.slice(0,s.lastIndexOf(" ")).replace(/[,;:\-–—]+$/,"") + "…"; }
  function J(o){ return '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g,String.fromCharCode(92)+"u003c") + '</script>'; }
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
  function absImg(p){ return SITE + S.localImg(p); }

  /* ---------- textos ---------- */
  var USO = {"Estações":"montar áreas de musculação completas, com vários exercícios em um único equipamento","Bancos":"treinos com barras e halteres, com ajuste de posição e estofado resistente ao uso diário","Gaiolas":"treino funcional e de força com segurança, em estúdios, condomínios e salas de cross training","Máquinas":"treino guiado e seguro em academias de condomínios, empresas e espaços corporativos","Peso Livre":"complementar a sala de musculação com treinos de peso livre","Esteiras":"corrida e caminhada em academias de condomínios, empresas e clubes","Spinning":"aulas coletivas e treinos de ciclismo indoor","Ergométricas":"treino cardiovascular de baixo impacto, de uso simples para todos os perfis de alunos","Elípticos":"treino cardiovascular de baixo impacto em academias e áreas fitness","Plataforma":"treinos de vibração, mobilidade e fortalecimento","Acessórios":"complementar treinos funcionais, de força e de recuperação"};
  var PARA2 = {
    "Musculação":["Equipamentos de musculação são pensados para uso frequente por vários alunos ao longo do dia. Por isso, vale alinhar com a nossa equipe o espaço disponível, a quantidade de usuários e o tipo de treino da sua academia.","Antes de fechar o pedido, informe o espaço disponível e o perfil de uso. Assim indicamos a combinação de equipamentos mais adequada para o seu projeto."],
    "Cardio":["Equipamentos de cardio costumam ser os mais usados em academias de condomínio e áreas fitness de empresas. Informe quantos alunos vão usar e o espaço disponível para recebermos o seu pedido com a configuração ideal.","Para áreas de cardio, vale considerar espaço, ponto de energia e quantidade de usuários. Conte o seu cenário no pedido de orçamento e indicamos as opções mais adequadas."],
    "Acessórios":["Acessórios ajudam a ampliar as possibilidades de treino sem ocupar muito espaço. Você pode somar vários itens na mesma lista e pedir tudo em um único orçamento.","Dá para combinar este item com outros acessórios e equipamentos na mesma solicitação. Informe quantidades e modelos na lista de orçamento."]
  };
  var ESPEC = {
    "vst-5900":[["Motor","3,5 HP"],["Velocidade","1 a 18 km/h"],["Inclinação","Eletrônica, 15 níveis"],["Esteira de corrida","500 x 1360 mm"],["Peso máximo do usuário","140 kg"],["Programas","12"]],
    "vst-375":[["Motor","3 HP"],["Velocidade","1 a 18 km/h"],["Inclinação","Eletrônica, 15 níveis"],["Esteira de corrida","480 x 1350 mm"],["Peso máximo do usuário","150 kg"],["Programas","12"]],
    "vst-803":[["Motor","2,5 HP DC, sem escova"],["Inclinação","Elétrica, até 12%"],["Área de corrida","150 x 51 cm"],["Peso máximo do usuário","150 kg"],["Painel","Touch, com acesso a aplicativos"]],
    "esteira-profissional-voeil":[["Motor","3 HP real"],["Velocidade","Até 18 km/h"],["Área de corrida","135 x 50 cm"],["Peso máximo do usuário","180 kg"],["Programas","10"],["Voltagem","220 V"]],
    "bike-de-spinning-profissional":[["Peso máximo do usuário","180 kg"],["Disco de inércia","20 kg"],["Monitor","LCD"]],
    "bicicleta-spinning-bc-826":[["Disco de inércia","20 kg"],["Peso máximo do usuário","130 kg"],["Transmissão","Por corrente, com trava de segurança"],["Selim","Ajuste vertical e horizontal"]],
    "bicicleta-ergometrica-bc-802":[["Resistência","Magnética, 15 níveis"],["Disco de inércia","10 kg"],["Peso máximo do usuário","150 kg"]],
    "bicicleta-polibike-4600":[["Dimensões","118 x 60 x 137 cm"],["Visor","LCD com luz de fundo"]],
    "eliptico-polielliptical-4600":[["Dimensões","170 x 63 x 164 cm"],["Visor","LCD com luz de fundo"]],
    "eliptico-proteus-promaster-e12":[["Dimensões montado","185 x 78,5 x 161 cm"],["Peso máximo do usuário","180 kg"]],
    "eliptico-proteus-profissional-eec7097":[["Dimensões","165 x 74 x 161 cm"],["Peso máximo do usuário","150 kg"]],
    "fita-de-suspensao-jet-stream-ka17":[["Fixação","Suporte de porta e extensão para ponto mais alto"],["Construção","Fitas com costura dupla e fivelas anodizadas"]],
    "vantage-r5":[["Dimensões","143 x 29 x 112 cm"],["Peso máximo do usuário","150 kg"]],
    "cross-over-profissional":[["Carga","150 kg (75 kg em cada torre)"],["Dimensões","2,34 m x 3,15 m x 77 cm"],["Acompanha","Par de puxador estribo"]],
    "estacao-mono-cross-over-profissional-75":[["Carga integrada","75 kg (15 placas)"],["Sistema","Polia alta e baixa"]],
    "estacao-de-musculacao-uma-coluna":[["Peso máximo do usuário","125 kg"],["Carga inclusa","Até 50 kg"],["Medidas","202 x 105 x 175 cm"]],
    "gaiola-mc-300":[["Capacidade dos suportes","300 kg"],["Altura","2,09 m"]],
    "barra-olimpica-voeil-bo-1000":[["Rolamentos","8"],["Capacidade de carga","Até 680 kg"],["Acabamento","Oxidado preto"]],
    "barra-regular-voeil-br-1000":[["Diâmetro","30 mm"],["Comprimentos","150, 180 e 220 cm"]],
    "barra-regular-ez-curl-voeil-br-1001":[["Diâmetro","30 mm"],["Formato","Ondulado (barra EZ)"]],
    "vbs-3500":[["Carga máxima","250 kg"],["Peso máximo do usuário","110 kg"],["Medidas montado","170 x 80 x 162 cm"]],
    "vbs-4580":[["Carga máxima","250 kg"],["Peso máximo do usuário","120 kg"],["Medidas montado","240 x 122 x 155 cm"]],
    "vbr-3500":[["Carga máxima","250 kg"],["Peso máximo do usuário","130 kg"]],
    "par-de-halteres-vinil-3-kg":[["Peso","3 kg cada (par)"],["Revestimento","PVC"],["Formato","Sextavado"]],
    "7-series-peso-livre-profissional":[["Tubos e quadros","Aço com 6 mm de espessura"],["Espuma","Alta densidade"],["Revestimento","Couro PU 1,5 mm"],["Parafusos","Aço inoxidável"],["Pintura","Teste de névoa salina acima de 500 horas"]],
    "adutor-abdutor-combo-voeil-vc-2000":[["Peso máximo do usuário","150 kg"],["Carga de peso","80 kg"],["Dimensões (C x L x A)","173 x 170 x 135 cm"],["Função","Adutor e abdutor (dupla função)"],["Estrutura","Metalon de 2,00 a 4,25 mm de parede"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Glúteos, adutores, abdutores, quadríceps"]],
    "banco-lombar-45":[["Dimensões (C x L x A)","1,20 x 1,00 x 0,70 m"],["Peso","25 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"],["Estofado","Courvin náutico antimofo, espuma AG 140"]],
    "banco-scott":[["Dimensões (C x L x A)","1,00 x 1,00 x 1,00 m"],["Peso","25 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"],["Estofado","Courvin náutico antimofo, espuma AG 140"]],
    "banco-supino-reto":[["Dimensões (C x L x A)","1,20 x 1,00 x 1,40 m"],["Peso","35 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"],["Estofado","Courvin náutico antimofo, espuma AG 140"]],
    "flexora-extensora-voeil-vc2010":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Dimensões (C x L x A)","1210 x 905 x 1565 mm"],["Referência","Voeil VC-2010"],["Função","Extensora e flexora de pernas (dupla função)"],["Estrutura","Metalon de 2,00 a 4,25 mm de parede"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Quadríceps e posteriores de coxa"]],
    "chin-dip-assist-graviton-voeil-vc-3070":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino, como assistência)"],["Dimensões (C x L x A)","1000 x 1100 x 2200 mm"],["Referência","Voeil VC-3070"],["Função","Barra fixa e mergulho assistidos, com contrapeso"],["Estrutura","Metalon reforçado, tubo de 3\" com parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Dorsais e bíceps (barra); peitoral e tríceps (mergulho)"]],
    "cross-over":[["Peso máximo do usuário","150 kg"],["Carga de peso","90 kg por torre (pilha seletora por pino)"],["Dimensões (C x L x A)","2480 x 1200 x 2300 mm"],["Referência","Voeil VC-2050"],["Função","Cross over angular com duas torres de polia regulável e barra fixa"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Peitoral, ombros, costas e core"]],
    "crossover-e-smith-machine-voeil-vcs-3000":[["Peso máximo do usuário","150 kg"],["Carga de peso","90 kg de cada lado"],["Dimensões (C x L x A)","180 x 100 x 150 cm"],["Função","Crossover e Smith Machine (dupla função)"],["Estrutura","Metalon de 2,00 a 4,25 mm de parede"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Peitoral, deltoides, dorsal, bíceps, tríceps, abdômen, quadríceps, glúteos, lombar"]],
    "elevacao-pelvica-voeil-vc-3050":[["Peso máximo do usuário","150 kg"],["Carga de peso","Anilhas olímpicas na barra (não inclusas)"],["Dimensões (C x L x A)","1560 x 1310 x 860 mm"],["Referência","Voeil VC-3050"],["Função","Elevação pélvica (hip thrust) guiada, com cinto de quadril acolchoado"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Glúteos, posteriores de coxa e core"]],
    "espaldar-aco":[["Dimensões (C x L x A)","0,50 x 1,00 x 2,20 m"],["Peso","25 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Instalação","4 pontos de fixação, 2 parafusos em cada"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"]],
    "estacao-cross-smith-multipower-v-8800":[["Configuração","Duas colunas de peso integradas + smith machine"],["Indicação","Academias, condomínios e estúdios"]],
    "estacao-profissional-voeil-ve-3500-com-leg-press":[["Carga","90 kg por torre"],["Bateria de peso","Aço fundido"],["Cabo de aço","Revestido em nylon de alta resistência"],["Tubulação","2 a 3\", parede de 2,25 a 3 mm"],["Estofado","Courvin náutico antimofo, espuma AG 120"],["Pintura","Eletrostática"],["Dimensões montado (C x L x A)","1,85 x 1,95 x 2,10 m"]],
    "kit-de-gaiola-mc-300":[["Dimensões","218,43 x 41 x 86 cm"],["Peso","139,5 kg"],["Composição","2 gaiolas MC 300 + 3 Monkey RR 100 + 1 DP 100 (dip/chin)"],["Pintura","Eletrostática a pó"],["Solda","Robotizada"]],
    "leg-press-sentado-voeil-vc2070":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Dimensões (C x L x A)","1800 x 1000 x 1500 mm"],["Referência","Voeil VC-2070"],["Função","Leg press e hack squat (2 em 1)"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Quadríceps, glúteos e panturrilhas"]],
    "leg-press-45-voeil-vc2060":[["Peso máximo do usuário","150 kg"],["Carga de peso","Anilhas olímpicas (não inclusas)"],["Dimensões (C x L x A)","1800 x 1000 x 1500 mm"],["Referência","Voeil VC-2060"],["Função","Leg press 45° com carro sobre trilhos e trava de segurança"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Quadríceps, glúteos e posteriores de coxa"]],
    "maquina-de-biceps-voeil-vc2080":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Dimensões (C x L x A)","1500 x 1100 x 1500 mm"],["Referência","Voeil VC-2080"],["Função","Rosca scott guiada, com apoio articulado"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Bíceps"]],
    "multi-gym-com-leg-press":[["Configuração","Estação multifuncional com leg press integrado"],["Linha","Semi profissional (condomínios e uso residencial)"]],
    "panturrilha-sentada":[["Dimensões (C x L x A)","1,00 x 0,60 x 0,80 m"],["Peso","30 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"],["Estofado","Courvin náutico antimofo, espuma AG 140"]],
    "remada-articulada":[["Dimensões (C x L x A)","1,40 x 1,20 x 1,30 m"],["Peso","40 kg"],["Tubulação","Aço carbono 3\", parede de 2,65 a 3 mm"],["Solda","MIG"],["Pintura","Eletrostática (prata, chumbo, preto fosco ou branco)"],["Estofado","Courvin náutico antimofo, espuma AG 140"]],
    "supino-vertical-voeil-vc-3090":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Dimensões (C x L x A)","2000 x 1100 x 1500 mm"],["Referência","Voeil VC-3090"],["Função","Supino vertical sentado, trajetória guiada"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Peitoral, tríceps e deltoide anterior"]],
    "vbr-3000":[["Peso máximo do usuário","110 kg"],["Peso","11,5 kg"],["Revestimento","Couro náutico ecológico em duas cores"],["Pintura","Reforçada, resistente à ferrugem"],["Solda","Robotizada"]],
    "vbr-3580":[["Regulagem","Múltiplas posições"]],
    "peck-deck-dorsal-voeil-vc2030":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Referência","Voeil VC-2030"],["Função","Voador (peck deck) e dorsal na mesma estação"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Peitoral, deltoide posterior e dorsais"],["Dimensões (C x L x A)","1200 x 1000 x 1700 mm"]],
    "peck-deck-voeil-vc2045":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Referência","Voeil VC-2045"],["Função","Peck deck (voador), adução horizontal de peitoral"],["Estrutura","Metalon oblongo 98 x 50 mm, parede de 2,65 a 3 mm"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Peitoral"],["Dimensões (C x L x A)","1200 x 1000 x 1700 mm"]],
    "puxador-com-remada-voeil-vc2040":[["Peso máximo do usuário","150 kg"],["Carga de peso","70 kg (pilha seletora por pino)"],["Referência","Voeil VC-2040"],["Função","Puxador alto e remada baixa sentada, polias conjugadas"],["Acabamento","Pintura eletrostática a pó"],["Grupos musculares","Dorsais, trapézio, romboides e bíceps"],["Dimensões (C x L x A)","1700 x 1100 x 2200 mm"]],
    "plataforma-vibracao-profissional-proteus":[["Peso máximo do usuário","180 kg"],["Modelo","I-VIB 5020"],["Frequência","3 a 10 Hz"],["Amplitude","4 mm"],["Programas","7 faixas de frequência e 3 programas"],["Controle","Remoto sem fio"],["Motor","DC, até 375 W"],["Dimensões","690 x 590 x 250 mm"],["Peso","46 kg"],["Certificações","CE e TÜV/GS"]],
    "esteira-profissional-alfa-a-6-000i":[["Motor","3,0 HP AC"],["Velocidade","Até 18 km/h"],["Inclinação","Elétrica, 0 a 15%"],["Área de corrida","1,60 x 0,60 m"],["Peso máximo do usuário","180 kg"],["Painel","LCD touch 10,1\" com 3 janelas de LED"],["Amortecimento","Deck flutuante, com botão de emergência"],["Dimensões (C x L x A)","2,15 x 0,95 x 1,60 m"],["Peso","170 kg"]],
    "jbm-5255":[["Motor","DC 3,0 HP real (4,0 HP de pico)"],["Velocidade","1 a 18 km/h"],["Manta","52 x 155 cm"],["Peso máximo do usuário","150 kg"],["Programas","25"],["Visor","130 x 60 mm"],["Dimensões","208 x 84 x 149 cm"],["Peso","110 kg"]],
    "jdm-5200":[["Linha","Profissional"],["Dimensões (C x L x A)","186 x 88 x 139 cm"],["Peso","126 kg"]],
    "pec-7097":[["Dimensões","139 x 45 x 117 cm"],["Peso","55 kg"]],
    "pec-7597":[["Dimensões em uso","70 x 147 x 133 cm"],["Peso","59 kg"]],
    "magnetic-bike-bf-5150":[["Resistência","Magnética"],["Linha","Semi profissional"]],
    "esteira-profissional-vsi-300":[["Linha","Profissional"]],
    "bola-queens":[["Peso","1,8 kg"]],
    "caneleira-voeil-cn-1000":[["Material","Couro natural, interior almofadado em algodão"],["Fecho","Fivela"],["Uso","Máquinas com sistema de polias"]],
    "cinto-voeil-para-halterofilismo-ct-1000":[["Material","Couro"],["Fecho","Fivela"],["Comprimento","120 cm"],["Largura","11 cm"],["Espessura","2,5 cm"]],
    "clubbell-voeil-preto-revestido":[["Peso","8 kg"],["Material","Aço, ponta pesada com PVC vulcanizado"],["Espessura do punho","2,3 cm"]],
    "clubbell-voeil-preto-revestido-pvc-4-kg":[["Peso","4 kg"],["Material","Aço, ponta pesada com PVC vulcanizado"],["Espessura do punho","2,3 cm"]],
    "clubbell-voeil-preto-revestido-em-pvc-de-6-kg":[["Peso","6 kg"],["Material","Aço, ponta pesada com PVC vulcanizado"],["Espessura do punho","2,3 cm"]],
    "colchonete-profissional-voeil":[["Dimensões","90 x 45 x 4 cm"],["Espuma","Alta densidade (80G)"],["Revestimento","Couro sintético 2 mm"],["Capacidade","150 kg"],["Peso","2 kg"]],
    "mx-400":[["Uso","Suporte de parede para saco de pancada"],["Capacidade","Sacos de até 70 kg"],["Dimensões","61,5 x 16 x 6,5 cm"],["Peso","3,5 kg"]],
    "2-halteres-voeil-de-10kg-cada-sextavado-emborrachado-em-pvc":[["Peso","10 kg cada (par)"],["Revestimento","PVC"],["Formato","Sextavado"]],
    "2-halteres-de-5kg-cada-sextavado-voeil":[["Peso","5 kg cada (par)"],["Revestimento","PVC"],["Formato","Sextavado"]],
    "2-halteres-voeil-de-7kg-cada-sextavado-emborrachado-em-pvc":[["Peso","7 kg cada (par)"],["Revestimento","PVC"],["Formato","Sextavado"]],
    "tornozeleira-profissional-voeil-4kg":[["Peso","4 kg cada (par)"],["Material","Couro sintético, velcro e nylon"]],
    "prancha-de-equilibrio":[["Material","PP (polipropileno)"],["Peso máximo do usuário","120 kg"]],
    "puxadores-voeil":[["Modelos","17 opções (barra reta, dorsal, V, cordas, pegadores simples e rotativos)"],["Material","Aço e corda"],["Uso","Máquinas com sistema de polias"]],
    "suportes-voeil-para-academia-anilhas-colchonetes-dumbbell-hasteres-tornozeleiras-e-puxadores":[["Material","Aço carbono"],["Acabamento","Pintura eletrostática"]]
  };
  function specs(p){
    var r = [["Categoria", S.CAT_LABEL[p.categoria]], ["Linha", p.sub]];
    if(p.marca) r.push(["Marca", p.marca]);
    if(p.modelo) r.push(["Modelo", p.modelo]);
    (ESPEC[p.id]||[]).forEach(function(x){ r.push(x); });
    r.push(["Fornecimento", "Sob orçamento"]);
    return r;
  }
  function descProd(p){
    var t = S.tipo(p);
    var base = p.nome + ": " + t[1] + (p.marca ? " " + p.marca : "") + " para academias de condomínios e empresas";
    var ex = (ESPEC[p.id]||[]).slice(0,2).map(function(x){ return x[0].toLowerCase() + " " + x[1]; });
    var fim = ". Peça orçamento na Kinesfit.";
    var d = base + (ex.length ? " (" + ex.join(", ") + ")" : "") + fim;
    if(d.length > 158) d = base + fim;
    return cut(d, 158);
  }
  function tituloProd(p){
    var t = S.tipo(p), a = p.nome + " | " + cap(t[1]) + " | Kinesfit";
    var b = p.nome + " | " + cap(t[1]) + " para academias | Kinesfit";
    return b.length <= 68 ? b : a;
  }
  function relacionados(p){
    var mesmo = DATA.filter(function(x){ return x.sub===p.sub && x.id!==p.id; });
    var i = DATA.indexOf(p), r = mesmo.slice();
    if(r.length<4) r = r.concat(DATA.filter(function(x){ return x.categoria===p.categoria && x.sub!==p.sub; }));
    var start = r.length ? i % r.length : 0, out2 = [];
    for(var k=0;k<r.length && out2.length<4;k++) out2.push(r[(start+k)%r.length]);
    return out2;
  }

  /* ---------- layout ---------- */
  function navHTML(){
    var h = '<ul><li><a class="top" href="/">Início</a></li>';
    S.CATS.forEach(function(c){
      var subs = S.SUBS[c] || [];
      h += '<li><a class="top" href="/' + S.CAT_SLUG[c] + '.html">' + S.CAT_LABEL[c] + '</a>' +
        (subs.length ? '<div class="sub">' + subs.map(function(s){ return '<a href="/' + S.CAT_SLUG[c] + '.html#' + S.slug(s) + '">' + s + '</a>'; }).join("") + '</div>' : '') + '</li>';
    });
    return h + '<li><a class="top" href="/#como-funciona">Como funciona</a></li><li><a class="top" href="/projeto-de-layout.html">Projeto de layout</a></li><li><a class="top" href="/#contato">Contato</a></li></ul>';
  }
  function header(){
    return '<header><div class="wrap hbar"><a href="/" class="logo" aria-label="Kinesfit - início">' + LOGO + WORD + '</a>' +
      '<nav id="nav" aria-label="Menu principal">' + navHTML() + '</nav>' +
      '<div class="hact"><button type="button" class="orc-btn" data-open aria-label="Abrir meu orçamento"><span class="lb">Meu orçamento</span><b data-count>0</b></button>' +
      '<button class="burger" id="burger" type="button" aria-label="Abrir menu" aria-expanded="false"><span></span></button></div></div>' +
      '<div class="hsearch"><div class="wrap"><form action="/" method="get" role="search" id="hsForm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" name="q" id="hq" placeholder="Buscar equipamento por nome, marca ou modelo…" aria-label="Buscar equipamentos" autocomplete="off"><button type="submit">Buscar</button></form><div class="hres" id="hres" hidden></div></div></div></header>';
  }
  function footer(){
    return '<footer><div class="wrap"><div class="top"><a href="/" class="logo" aria-label="Kinesfit">' + LOGO + WORD + '</a>' +
      '<ul><li><a href="/musculacao.html">Musculação</a></li><li><a href="/cardio.html">Cardio Máquinas</a></li><li><a href="/acessorios.html">Acessórios</a></li><li><a href="/#publico">Para quem</a></li><li><a href="/projeto-de-layout.html">Projeto de layout</a></li><li><a href="/#sobre">Sobre</a></li><li><a href="/#contato">Contato</a></li></ul></div>' +
      '<div class="bot"><span>© <span id="ano"></span> Kinesfit. Todos os direitos reservados. · <a href="mailto:' + S.CONFIG.email + '">' + S.CONFIG.email + '</a> · WhatsApp ' + S.CONFIG.whatsappExibido + '</span><span>Todo fornecimento é feito sob orçamento.</span></div></div></footer>' +
      '<a class="wa" data-wa href="' + WAURL + '" target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.4-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.2 1.5z"/></svg></a>';
  }
  function page(o){
    var url = SITE + o.path;
    var h = '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.desc) + '">\n' +
      '<meta name="robots" content="' + (o.noindex ? "noindex, follow" : "index, follow, max-image-preview:large") + '">\n' +
      '<link rel="canonical" href="' + url + '">\n<meta name="theme-color" content="#2e3f4f">\n' +
      '<meta property="og:type" content="' + (o.ogType||"website") + '">\n<meta property="og:locale" content="pt_BR">\n<meta property="og:site_name" content="Kinesfit">\n' +
      '<meta property="og:title" content="' + esc(o.title) + '">\n<meta property="og:description" content="' + esc(o.desc) + '">\n<meta property="og:url" content="' + url + '">\n' +
      '<meta property="og:image" content="' + (o.image||OGIMG) + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
      '<link rel="icon" href="' + FAV + '" type="image/svg+xml">\n<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">\n<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">\n' +
      IMGFAIL + '\n<link rel="stylesheet" href="/assets/site.css?v=' + HOJE + '.12">\n' + (o.ld||[]).map(J).join("\n") + '\n</head>\n<body>\n' +
      header() + '\n' + o.body + '\n' + footer() +
      '\n<script src="/assets/catalogo.js?v=' + HOJE + '.12"></script>\n<script src="/assets/app.js?v=' + HOJE + '.12"></script>\n</body>\n</html>\n';
    out[o.path === "/" ? "index.html" : o.path.slice(1)] = h;
  }
  function crumb(list){
    return '<nav class="crumb" aria-label="Você está em"><ol>' + list.map(function(c,i){ return '<li>' + (c[1] && i<list.length-1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span aria-current="page">' + esc(c[0]) + '</span>') + '</li>'; }).join("") + '</ol></nav>';
  }
  function crumbLD(list){
    return {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":list.map(function(c,i){ var o2 = {"@type":"ListItem","position":i+1,"name":c[0]}; if(c[1]) o2.item = SITE + c[1]; return o2; })};
  }
  function itemList(list){
    return {"@context":"https://schema.org","@type":"ItemList","itemListElement":list.map(function(p,i){ return {"@type":"ListItem","position":i+1,"url":SITE+S.pUrl(p),"name":p.nome}; })};
  }
  var ORG = {"@context":"https://schema.org","@type":"Organization","name":"Kinesfit","url":SITE+"/","logo":SITE+"/assets/logo-kinesfit.png","description":"Equipamentos de musculação, cardio e acessórios para condomínios, espaços corporativos e construtoras.","areaServed":"BR","email":S.CONFIG.email,"telephone":"+"+S.CONFIG.whatsapp.replace(/^(\d\d)(\d\d)(\d{5})(\d{4})$/,"$1 $2 $3-$4"),"contactPoint":{"@type":"ContactPoint","contactType":"sales","telephone":"+"+S.CONFIG.whatsapp.replace(/^(\d\d)(\d\d)(\d{5})(\d{4})$/,"$1 $2 $3-$4"),"email":S.CONFIG.email,"availableLanguage":"Portuguese"}};
  var SITELD = {"@context":"https://schema.org","@type":"WebSite","name":"Kinesfit","url":SITE+"/","inLanguage":"pt-BR"};

  /* ---------- home ---------- */
  var FAQ = [
    ["Como funciona o orçamento?","Todo fornecimento é feito sob orçamento. Você monta a lista com os equipamentos, as quantidades e os modelos, envia por e-mail ou WhatsApp e a Kinesfit responde com uma proposta personalizada."],
    ["Para quais espaços a Kinesfit fornece equipamentos?","Atendemos academias de condomínios residenciais e comerciais, espaços corporativos, construtoras e empreendimentos, além de academias e estúdios."],
    ["Posso pedir vários equipamentos no mesmo orçamento?","Sim. Use o botão + Orçamento em cada equipamento, ajuste as quantidades e informe o modelo desejado. Tudo vai junto em um único pedido."],
    ["A Kinesfit faz o projeto de layout da academia?","Sim. Envie uma imagem da planta pelo site, ou as medidas da sala por WhatsApp ou e-mail, e a Kinesfit monta uma sugestão de layout com a distribuição dos equipamentos, a partir da nossa biblioteca de projetos."],
    ["Quais marcas vocês trabalham?","O catálogo reúne equipamentos de marcas como Voeil, Proteus, Alfa, Jet Stream e Queens, entre outras. Se não encontrar o que procura, fale com a gente."]
  ];
  function faqHTML(list){ return '<div class="faq">' + list.map(function(f){ return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join("") + '</div>'; }
  function faqLD(list){ return {"@context":"https://schema.org","@type":"FAQPage","mainEntity":list.map(function(f){ return {"@type":"Question","name":f[0],"acceptedAnswer":{"@type":"Answer","text":f[1]}}; })}; }
  var LAYWA = S.waLink("Olá! Gostaria de enviar a planta da minha sala para a Kinesfit montar o layout da academia.");
  var LAYMAIL = "mailto:" + S.CONFIG.email + "?subject=" + encodeURIComponent("Projeto de layout da academia") + "&body=" + encodeURIComponent("Olá! Seguem as medidas da sala para o projeto de layout.\n\nTipo de espaço (condomínio, empresa, construtora):\nCidade:\nObservações:");
  function heroLay(){
    return '<a class="hero-lay" href="/projeto-de-layout.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 10h7v11M14 3v7h7"/></svg>' +
      '<span><strong>Fazemos a planta da sua sala fitness <i>– Sem compromisso.</i></strong>Envie a planta da sala e montamos a distribuição dos equipamentos. <u>Ver exemplos, clique aqui</u></span></a>';
  }
  function layoutHTML(){
    return '<div class="layout-cta"><div><div class="eyebrow">Projeto de layout</div><h2>Envie a planta da sala e a gente monta o layout</h2>' +
      '<p>Mande uma imagem da planta ou as medidas do espaço e a Kinesfit sugere a distribuição dos equipamentos, a partir da nossa biblioteca de layouts para condomínios, empresas e construtoras. <a class="lk" href="/projeto-de-layout.html">Ver exemplos de layout</a></p></div>' +
      '<div class="acts"><a class="btn btn-vinho" href="' + LAYWA + '" target="_blank" rel="noopener">' + WAI + 'Enviar pelo WhatsApp</a><a class="btn btn-dark" href="/projeto-de-layout.html#enviar-planta">' + MAILI + 'Enviar a planta pelo site</a></div></div>';
  }

  var destaque = DATA.filter(function(p){ return p.destaque; }).slice(0,8);
  var tiles = S.CATS.map(function(c){
    var img = {"Musculação":"leg-press-45-voeil-vc2060","Cardio":"esteira-profissional-alfa-a-6-000i","Acessórios":"barra-olimpica-voeil-bo-1000"}[c];
    var p = DATA.filter(function(x){ return x.id===img; })[0] || DATA.filter(function(x){ return x.categoria===c; })[0];
    var n = DATA.filter(function(x){ return x.categoria===c; }).length;
    return '<a class="tile" href="/' + S.CAT_SLUG[c] + '.html">' + S.imgTag(p, "", 'loading="lazy" alt="' + esc(S.CAT_LABEL[c] + " para academias") + '"').replace('alt=""','') + '<div><h3>' + S.CAT_LABEL[c] + '</h3><span>' + n + ' equipamentos</span><span class="go">Ver equipamentos →</span></div></a>';
  }).join("");
  var homeBody =
    '<main id="inicio">\n<div class="hero"><div class="wrap"><div class="eyebrow">Equipamentos fitness profissionais · venda sob orçamento</div>' +
    '<h1>Equipamentos de musculação e cardio para <em>condomínios e empresas</em></h1>' +
    '<p>Escolha os equipamentos, monte a sua lista e receba uma proposta. Cada orçamento é feito sob medida para o seu projeto.</p>' +
    heroLay() +
    '<ol class="hero-steps"><li><b>1</b><span>Escolha no catálogo<small>toque em + Orçamento</small></span></li><li><b>2</b><span>Monte a lista<small>quantidades e modelos</small></span></li><li><b>3</b><span>Envie o pedido<small>por e-mail ou WhatsApp</small></span></li><li><b>4</b><span>Receba a proposta<small>personalizada, sem compromisso</small></span></li></ol>' +
    '<div class="actions"><a class="btn btn-vinho" href="#catalogo">Escolher equipamentos</a><a class="btn btn-line" href="/projeto-de-layout.html#enviar-planta">Enviar a planta da sala</a></div></div></div>\n' +
    '<section class="how" id="como-funciona"><div class="wrap"><div class="sec-head"><div class="eyebrow">Como funciona</div><h2>Peça seu orçamento em 4 passos</h2><p>Não é preciso saber o modelo exato nem fechar nada agora: você monta a lista e a Kinesfit responde com uma proposta sob medida.</p></div>' +
    '<div class="steps"><div class="step"><b class="n">1</b><h3>Escolha os equipamentos</h3><p>Navegue pelo catálogo e toque em <b>+ Orçamento</b> nos itens que interessam. Pode misturar musculação, cardio e acessórios.</p></div>' +
    '<div class="step"><b class="n">2</b><h3>Monte a sua lista</h3><p>Abra <b>Meu orçamento</b> no topo da página, ajuste a quantidade de cada item e informe modelo, cor ou voltagem. Equipamento fora do catálogo? É só incluir à mão.</p></div>' +
    '<div class="step"><b class="n">3</b><h3>Envie o pedido</h3><p>Preencha seus dados e envie por <b>e-mail</b> ou pelo <b>WhatsApp</b>, como preferir. A lista já vai pronta na mensagem.</p></div>' +
    '<div class="step"><b class="n">4</b><h3>Receba a proposta</h3><p>A Kinesfit analisa o pedido e responde com uma proposta personalizada para o seu projeto. Sem compromisso.</p></div></div>' +
    '<div class="actions-row"><a class="btn btn-vinho" href="#catalogo">Escolher equipamentos</a><a class="btn btn-dark" data-wa href="' + WAURL + '" target="_blank" rel="noopener">Prefiro falar no WhatsApp</a></div></div></section>\n' +
    '<section id="categorias"><div class="wrap"><div class="sec-head"><div class="eyebrow">Categorias</div><h2>O que você precisa para sua área de treino</h2></div><div class="tiles">' + tiles + '</div></div></section>\n' +
    '<section id="destaques" style="padding-top:0"><div class="wrap"><div class="sec-head"><div class="eyebrow">Em destaque</div><h2>Equipamentos em destaque</h2><p>Consulte-nos para conhecer configurações, condições e disponibilidade de cada item.</p></div><div class="grid" id="gridDest">' + destaque.map(S.cardHTML).join("") + '</div></div></section>\n' +
    '<section class="catalogo" id="catalogo"><div class="wrap"><div class="sec-head"><div class="eyebrow">Catálogo</div><h2>Todos os equipamentos</h2><p>Os preços mostrados são valores de referência (a partir de); o valor final é confirmado no orçamento. Toque em <b>+ Orçamento</b> nos itens de interesse, ajuste quantidades e modelos e envie o pedido.</p></div>' +
    '<div class="filters"><div class="chips" id="chipsCat"></div><div class="chips sm" id="chipsSub"></div><div class="search"><input type="search" id="busca" placeholder="Buscar por nome, marca ou modelo…" aria-label="Buscar equipamentos"><span class="count" id="contagem">' + DATA.length + ' equipamentos</span></div></div>' +
    '<div class="grid" id="grid">' + DATA.map(S.cardHTML).join("") + '</div></div></section>\n' +
    '<section id="publico"><div class="wrap"><div class="sec-head"><div class="eyebrow">Para quem</div><h2>Soluções para o seu espaço</h2></div><div class="pub">' +
    '<div><h3>Condomínios</h3><p>Equipamentos para academias de condomínio residencial e comercial, com foco em segurança e uso contínuo.</p></div>' +
    '<div><h3>Espaços corporativos</h3><p>Estruturas para academias e salas de ginástica em empresas, promovendo bem-estar para colaboradores.</p></div>' +
    '<div><h3>Construtoras</h3><p>Fornecimento para empreendimentos e áreas de lazer, com orçamento sob medida para cada projeto.</p></div></div></div></section>\n' +
    '<section id="layout" style="padding-top:0"><div class="wrap">' + layoutHTML() + '</div></section>\n' +
    '<section class="sobre" id="sobre"><div class="wrap in"><div><div class="eyebrow">Sobre a Kinesfit</div><h2>Equipamentos fitness com atendimento B2B</h2>' +
    '<p>A Kinesfit é uma marca de equipamentos fitness voltada ao mercado corporativo. Trabalhamos com musculação, cardio e acessórios das principais linhas do mercado, sempre com atendimento direto e proposta individual para cada projeto.</p>' +
    '<p>Informe o que você precisa e retornamos com um orçamento personalizado.</p></div>' +
    '<ul><li>Venda 100% sob orçamento<small>Proposta personalizada para cada cliente</small></li><li>Musculação, cardio e acessórios<small>Linhas completas para montar a sua área de treino</small></li><li>Atendimento direto<small>Fale conosco por e-mail ou WhatsApp</small></li></ul></div></section>\n' +
    '<section class="seo-home" id="duvidas"><div class="wrap"><div class="sec-head"><div class="eyebrow">Dúvidas frequentes</div><h2>Como comprar equipamentos fitness com a Kinesfit</h2></div><div class="prose">' + faqHTML(FAQ) + '</div></div></section>\n' +
    '<section class="contato" id="contato"><div class="wrap in"><div class="info"><div class="eyebrow">Contato</div><h2 style="font-size:clamp(30px,4.2vw,46px);color:var(--petroleo);margin-top:6px">Solicite seu orçamento</h2>' +
    '<p>Monte a lista com os equipamentos, quantidades e modelos e envie por e-mail ou WhatsApp. Respondemos com uma proposta.</p><p class="lay-note">Tem a planta da sala? Envie junto que montamos o layout. <a class="lk" href="/projeto-de-layout.html">Saiba mais</a></p>' +
    '<a class="lnk" data-wa href="' + WAURL + '" target="_blank" rel="noopener">' + WAI + '<span>WhatsApp: ' + S.CONFIG.whatsappExibido + '</span></a>' +
    '<a class="lnk" href="mailto:' + S.CONFIG.email + '">' + MAILI + '<span>' + S.CONFIG.email + '</span></a></div>' +
    '<div id="orcForm"><noscript><p>Para montar o orçamento, ative o JavaScript ou envie um e-mail para <a href="mailto:' + S.CONFIG.email + '">' + S.CONFIG.email + '</a>.</p></noscript></div></div></section>\n</main>';
  page({path:"/", title:"Equipamentos de Musculação e Cardio para Condomínios e Empresas | Kinesfit",
    desc:"Esteiras, bikes, estações de musculação, bancos, gaiolas e acessórios para academias de condomínios e empresas. Monte sua lista e peça orçamento.",
    body:homeBody, ld:[ORG, SITELD, itemList(DATA), faqLD(FAQ)]});

  /* ---------- categorias ---------- */
  var CATI = {
    "Musculação":{title:"Equipamentos de Musculação para Academias e Condomínios | Kinesfit", h1:"Equipamentos de musculação para academias e condomínios", desc:"Estações de musculação, máquinas, bancos, gaiolas e peso livre para academias de condomínios, empresas e construtoras. Peça orçamento na Kinesfit.",
      intro:"Estações, máquinas guiadas, bancos, gaiolas e equipamentos de peso livre para montar a sala de musculação do seu condomínio, empresa ou empreendimento.",
      texto:["Uma boa sala de musculação combina equipamentos guiados, que dão segurança a quem está começando, com peso livre e gaiolas para treinos mais completos. Na Kinesfit você encontra as principais linhas do mercado, como Voeil e Proteus, e monta a sua lista de orçamento com as quantidades e os modelos que precisa.","Para academias de condomínio, o ideal é priorizar equipamentos resistentes ao uso frequente e de fácil utilização. Para espaços corporativos e construtoras, montamos propostas sob medida para o espaço e o número de usuários."]},
    "Cardio":{title:"Esteiras, Bikes e Elípticos: Cardio para Academias | Kinesfit", h1:"Esteiras, bikes e elípticos para academias e condomínios", desc:"Esteiras profissionais, bikes de spinning, bicicletas ergométricas e elípticos para academias de condomínios e empresas. Solicite orçamento.",
      intro:"Esteiras, bikes de spinning, bicicletas ergométricas, elípticos e plataformas vibratórias para a área de cardio da sua academia.",
      texto:["A área de cardio é a mais procurada em academias de condomínio e espaços corporativos. Reunimos esteiras profissionais, bikes de spinning para aulas coletivas, bicicletas ergométricas e elípticos de baixo impacto.","Informe no pedido de orçamento a quantidade de equipamentos, o espaço disponível e o perfil dos usuários. Assim a nossa equipe sugere a combinação mais adequada para o seu projeto."]},
    "Acessórios":{title:"Acessórios para Academia: Barras, Halteres e Mais | Kinesfit", h1:"Acessórios para academia, treino funcional e recuperação", desc:"Barras, halteres, colchonetes, rolos, clubbells, caneleiras e mais acessórios para academias e treino funcional. Monte sua lista e peça orçamento.",
      intro:"Barras, halteres, clubbells, colchonetes, rolos de espuma, caneleiras e outros acessórios para completar a sua área de treino.",
      texto:["Os acessórios completam a área de treino e ampliam as opções de exercícios sem ocupar muito espaço. No catálogo da Kinesfit você encontra barras, halteres sextavados, clubbells, colchonetes, rolos de massagem, tornozeleiras e muito mais.","Você pode somar acessórios e equipamentos na mesma lista de orçamento e enviar tudo em um único pedido."]}
  };
  S.CATS.forEach(function(c){
    var info = CATI[c], list = DATA.filter(function(p){ return p.categoria===c; }), subs = S.SUBS[c] || [];
    var cr = [["Início","/"],[S.CAT_LABEL[c], "/" + S.CAT_SLUG[c] + ".html"]];
    var secs = subs.length ? subs.map(function(s){
      var l = list.filter(function(p){ return p.sub===s; });
      return l.length ? '<div class="subsec" id="' + S.slug(s) + '"><h2>' + s + '</h2><div class="grid">' + l.map(S.cardHTML).join("") + '</div></div>' : "";
    }).join("") : '<div class="subsec"><div class="grid">' + list.map(S.cardHTML).join("") + '</div></div>';
    var body = '<main><div class="phead"><div class="wrap">' + crumb(cr) + '<div class="eyebrow">' + S.CAT_LABEL[c] + '</div><h1>' + esc(info.h1) + '</h1><p>' + esc(info.intro) + '</p>' + heroLay() + '</div></div>' +
      '<div class="cat-body"><div class="wrap">' + secs + '<div style="margin-top:40px">' + layoutHTML() + '</div><div class="prose" style="margin-top:40px">' + info.texto.map(function(t){ return '<p>' + esc(t) + '</p>'; }).join("") + '<p><a class="lk" href="/#contato">Solicitar orçamento</a> · <a class="lk" href="/">Ver todas as categorias</a></p></div></div></div></main>';
    page({path:"/" + S.CAT_SLUG[c] + ".html", title:info.title, desc:info.desc, body:body, ld:[crumbLD(cr), itemList(list)]});
  });

  /* ---------- produtos ---------- */
  DATA.forEach(function(p, idx){
    var t = S.tipo(p), cat = p.categoria, path = S.pUrl(p);
    var cr = [["Início","/"],[S.CAT_LABEL[cat], "/" + S.CAT_SLUG[cat] + ".html"]];
    if(p.sub && p.sub!==cat && (S.SUBS[cat]||[]).indexOf(p.sub)>=0) cr.push([p.sub, "/" + S.CAT_SLUG[cat] + ".html#" + S.slug(p.sub)]);
    cr.push([p.nome, path]);
    var para2 = PARA2[cat][idx % 2];
    var rows = specs(p).map(function(r){ return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("");
    var brand = p.marca ? '<span class="brand" style="color:var(--muted)">' + esc(p.marca) + (p.modelo ? " · " + esc(p.modelo) : "") + '</span>' : "";
    var lead = p.nome + " é " + t[0] + " " + t[1] + (p.marca ? " da marca " + p.marca : "") + ", indicad" + (t[0]==="uma" ? "a" : "o") + " para " + USO[p.sub || "Acessórios"] + ".";
    var faq = [
      ["Como pedir orçamento de " + p.nome + "?","Toque em + Adicionar à lista de orçamento, informe a quantidade e o modelo desejado e envie o pedido por e-mail ou WhatsApp. A Kinesfit responde com uma proposta personalizada."],
      ["Qual o preço de " + p.nome + "?",(p.preco ? p.nome + " sai a partir de " + S.brl(p.preco) + " por unidade. " : "") + "Todo fornecimento da Kinesfit é feito sob orçamento, pois o valor depende da quantidade, da configuração e das condições do projeto. Solicite a sua proposta pela lista de orçamento."],
      ["Posso pedir " + p.nome + " junto com outros equipamentos?","Sim. Adicione quantos itens quiser à lista e envie tudo em um único pedido de orçamento."]
    ];
    var rel = relacionados(p);
    var body = '<main><div class="wrap">' + crumb(cr) + '</div><div class="pg"><div class="wrap"><div class="cols">' +
      '<div class="pic">' + S.imgTag(p, S.altText(p), 'width="430" height="430"') + '</div>' +
      '<div><span class="tag">' + esc(p.sub) + '</span><h1>' + esc(p.nome) + '</h1>' + brand + '<div class="pg-preco">' + S.precoHTML(p) + '</div>' +
      '<p class="lead">' + esc(lead) + '</p><p>' + esc(para2) + '</p>' +
      '<div class="cta"><button type="button" class="b-orc" data-add="' + esc(p.id) + '" data-lbl="+ Adicionar à lista de orçamento">+ Adicionar à lista de orçamento</button><a class="btn btn-line" style="border-color:var(--petroleo);color:var(--petroleo)" href="' + WAURL + '" data-wa target="_blank" rel="noopener">Falar no WhatsApp</a></div>' +
      '<div class="note">' + (p.preco ? 'Preço de referência por unidade. O valor final é confirmado no orçamento, conforme quantidade e condições do projeto.' : 'Valor sob orçamento. Informe quantidade e modelo na lista e enviamos a proposta.') + '</div></div></div></div></div>' +
      '<div class="pgx"><div class="wrap"><div class="prose"><h2>Ficha do equipamento</h2><table class="spec"><tbody>' + rows + '</tbody></table>' +
      '<h2>Dúvidas sobre ' + esc(p.nome) + '</h2>' + faqHTML(faq) + '</div></div></div>' +
      '<section class="rel"><div class="wrap"><h2>Outros equipamentos que podem interessar</h2><div class="grid">' + rel.map(S.cardHTML).join("") + '</div></div></section></main>';
    var ld = [crumbLD(cr), {"@context":"https://schema.org","@type":"Product","name":p.nome,"description":descProd(p),"image":[absImg(p)],"sku":p.id,"category":S.CAT_LABEL[cat] + " > " + p.sub,"url":SITE+path}];
    if(p.marca) ld[1].brand = {"@type":"Brand","name":p.marca};
    if(p.preco) ld[1].offers = {"@type":"AggregateOffer","lowPrice":p.preco,"priceCurrency":"BRL","offerCount":1,"url":SITE+path};
    page({path:path, title:tituloProd(p), desc:descProd(p), body:body, ld:ld, image:absImg(p), ogType:"product"});
  });

  /* ---------- projeto de layout ---------- */
  var EXLAY = [
    {img:"exemplo-323m2", w:3120, h:2590, t:"Exemplo: academia de condomínio, 323\u00a0m²", d:"Quatro salas no mesmo piso: box de treino funcional, cycling com 16 bikes, sala polivalente para aulas e pilates com reformers. Cada equipamento aparece numerado na planta e na lista abaixo dela."},
    {img:"exemplo-903m2", w:3360, h:2960, t:"Exemplo: academia de condomínio, 903\u00a0m²", d:"Ginásio com área de cardio e musculação (peso livre e máquinas): 61 equipamentos distribuídos com zonas de circulação, alongamento e acesso às máquinas encostadas à parede."}
  ];
  (function(){
    var cr = [["Início","/"],["Projeto de layout","/projeto-de-layout.html"]];
    var ex = EXLAY.map(function(e){
      var src = "/assets/layout/" + e.img + ".png";
      return '<figure class="lay-ex"><figcaption><h3>' + esc(e.t) + '</h3><p>' + esc(e.d) + '</p></figcaption>' +
        '<a href="' + src + '" target="_blank" rel="noopener" title="Abrir a imagem em tamanho real"><img src="' + src + '" width="' + e.w + '" height="' + e.h + '" loading="lazy" alt="' + esc(e.t) + ': planta baixa com a distribuição dos equipamentos e a lista numerada"></a>' +
        '<p class="lay-zoom"><a class="lk" href="' + src + '" target="_blank" rel="noopener">Ampliar imagem</a></p></figure>';
    }).join("");
    var body = '<main><div class="phead"><div class="wrap">' + crumb(cr) + '<div class="eyebrow">Serviço</div><h1>Projeto de layout para a sua academia</h1>' +
      '<p>Envie a planta ou as medidas da sala e a Kinesfit monta a distribuição dos equipamentos em escala, com áreas de circulação e a lista completa para o orçamento.</p>' +
      '<div class="lay-hero-acts"><a class="btn btn-vinho" href="#enviar-planta">' + MAILI + 'Enviar a planta</a><a class="btn btn-line" href="' + LAYWA + '" target="_blank" rel="noopener">' + WAI + 'Enviar pelo WhatsApp</a></div>' +
      '<p class="lay-hero-mail">Se preferir, mande as medidas da sala por e-mail para <a href="' + esc(LAYMAIL) + '">' + S.CONFIG.email + '</a>.</p></div></div>' +
      '<section class="how"><div class="wrap"><div class="sec-head"><div class="eyebrow">Como funciona</div><h2>Da planta ao orçamento em 3 passos</h2></div>' +
      '<div class="steps lay-steps"><div class="step"><b class="n">1</b><h3>Envie a planta</h3><p>Envie a planta como imagem (foto ou print) pelo formulário abaixo, ou só as medidas da sala por <b>WhatsApp</b> ou <b>e-mail</b>. Conte o tipo de espaço e quantas pessoas vão usar.</p></div>' +
      '<div class="step"><b class="n">2</b><h3>Montamos o layout</h3><p>Distribuímos cardio, máquinas, peso livre e funcional em escala, respeitando circulação, portas e pilares, a partir da nossa biblioteca de equipamentos em planta.</p></div>' +
      '<div class="step"><b class="n">3</b><h3>Receba o projeto e a proposta</h3><p>Você recebe a planta com cada equipamento numerado, a lista com as quantidades e a proposta de fornecimento para o projeto.</p></div></div></div></section>' +
      '<section><div class="wrap"><div class="sec-head"><div class="eyebrow">Exemplos</div><h2>Layouts que já montamos</h2><p>Projetos reais de academias de condomínio, publicados sem identificar o empreendimento.</p></div>' + ex + '</div></section>' +
      '<section class="how" id="enviar-planta"><div class="wrap"><div class="sec-head"><div class="eyebrow">Envie a sua planta</div><h2>Envie a planta da sala pelo site</h2><p>Anexe até 3 imagens da planta ou de um croqui com as medidas (JPG, PNG ou WEBP). Por segurança, aceitamos só imagens: tire um print ou uma foto da planta.</p></div>' +
      '<form id="plForm" class="pl-form" action="/enviar-planta.php" method="post" enctype="multipart/form-data" novalidate>' +
      '<div class="f2"><div class="fg"><label for="pNome">Nome *</label><input id="pNome" name="nome" required maxlength="120" autocomplete="name"></div><div class="fg"><label for="pMail">E-mail *</label><input id="pMail" name="email" type="email" required maxlength="160" autocomplete="email"></div></div>' +
      '<div class="f2"><div class="fg"><label for="pTel">Telefone / WhatsApp</label><input id="pTel" name="tel" type="tel" maxlength="40" autocomplete="tel"></div><div class="fg"><label for="pCid">Cidade</label><input id="pCid" name="cidade" maxlength="80" autocomplete="address-level2"></div></div>' +
      '<div class="fg"><label for="pTipo">Tipo de espaço</label><select id="pTipo" name="tipo"><option value="">Selecione</option><option>Condomínio</option><option>Espaço corporativo</option><option>Construtora / empreendimento</option><option>Academia</option><option>Outro</option></select></div>' +
      '<div class="fg"><label for="pArq">Imagens da planta * <small>(até 3, JPG, PNG ou WEBP)</small></label><input id="pArq" name="planta[]" type="file" accept="image/jpeg,image/png,image/webp" multiple required><ul class="pl-files" id="plFiles"></ul></div>' +
      '<div class="fg"><label for="pMsg">Mensagem</label><textarea id="pMsg" name="msg" maxlength="2000" placeholder="Quantas pessoas vão usar, equipamentos que deseja, pé-direito, prazo…"></textarea></div>' +
      '<div class="hp" aria-hidden="true"><label for="pSite">Não preencha</label><input id="pSite" name="website" tabindex="-1" autocomplete="off"></div>' +
      '<div class="send"><button type="submit" class="btn btn-vinho">' + MAILI + 'Enviar planta</button><a class="btn btn-wa" href="' + LAYWA + '" target="_blank" rel="noopener">' + WAI + 'Prefiro pelo WhatsApp</a></div>' +
      '<div id="plMsg" class="orc-msg" role="status" aria-live="polite"></div>' +
      '<p class="hint">As imagens chegam por e-mail na Kinesfit e não ficam publicadas no site.</p></form></div></section>' +
      '</main>';
    page({path:"/projeto-de-layout.html", title:"Projeto de Layout para Academia de Condomínio e Empresa | Kinesfit",
      desc:"Envie a planta da sala e a Kinesfit monta o layout da academia em escala, com a distribuição dos equipamentos e a lista para orçamento. Veja exemplos.",
      body:body, ld:[crumbLD(cr)]});
  })();

  /* ---------- orçamento (página própria, sem indexação) ---------- */
  page({path:"/orcamento.html", title:"Meu orçamento | Kinesfit", desc:"Monte a lista de equipamentos e envie seu pedido de orçamento à Kinesfit por e-mail ou WhatsApp.", noindex:true,
    body:'<main><div class="phead"><div class="wrap"><div class="eyebrow">Orçamento</div><h1>Meu orçamento</h1><p>Confira os itens, ajuste quantidades e modelos e envie o pedido por e-mail ou WhatsApp.</p></div></div><section class="contato" style="padding:40px 0 70px"><div class="wrap"><div id="orcForm" style="max-width:760px;margin:0 auto"><noscript><p>Ative o JavaScript ou envie um e-mail para <a href="mailto:' + S.CONFIG.email + '">' + S.CONFIG.email + '</a>.</p></noscript></div></div></section></main>'});

  /* ---------- arquivos de apoio ---------- */
  var urls = ["/"].concat(S.CATS.map(function(c){ return "/" + S.CAT_SLUG[c] + ".html"; })).concat(["/projeto-de-layout.html"]).concat(DATA.map(S.pUrl));
  out["sitemap.xml"] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(function(u,i){ return '<url><loc>' + SITE + u + '</loc><lastmod>' + HOJE + '</lastmod><priority>' + (i===0 ? "1.0" : i<4 ? "0.8" : "0.6") + '</priority></url>'; }).join("\n") + '\n</urlset>\n';
  out["robots.txt"] = "User-agent: *\nAllow: /\nDisallow: /orcamento.html\nDisallow: /enviar.php\nDisallow: /enviar-planta.php\n\nSitemap: " + SITE + "/sitemap.xml\n";
  out["assets/site.css"] = CSS;
  out["assets/app.js"] = APP;
  out["assets/favicon.svg"] = '<svg xmlns="http://www.w3.org/2000/svg" ' + LOGO.slice(5).replace(' aria-hidden="true"','') + "\n";
  out["assets/catalogo.js"] = "const equipamentos = " + JSON.stringify(DATA) + ";\n" + SH;
  out["enviar.php"] = PHP;
  /* endereços antigos (vindos da Body Center) redirecionam para o novo */
  DATA.filter(function(p){ return p.idAntigo; }).forEach(function(p){
    var u = SITE + S.pUrl(p);
    out["equipamentos/" + p.idAntigo + ".html"] = '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<title>' + S.esc(p.nome) + ' | Kinesfit</title>\n<meta name="robots" content="noindex, follow">\n<link rel="canonical" href="' + u + '">\n<meta http-equiv="refresh" content="0; url=' + u + '">\n<script>location.replace("' + u + '");</script>\n</head>\n<body><p>Esta página mudou de endereço: <a href="' + u + '">' + S.esc(p.nome) + '</a>.</p></body>\n</html>\n';
  });
  return out;
}
if(typeof module !== "undefined" && module.exports) module.exports = kfBuild; else root.kfBuild = kfBuild;
})(typeof window !== "undefined" ? window : globalThis);
