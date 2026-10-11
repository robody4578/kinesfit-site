/* Kinesfit — lista de orçamento, formulário e catálogo (carregado em todas as páginas) */
(function(){
"use strict";
const $ = (s, r) => (r||document).querySelector(s);
const $$ = (s, r) => Array.from((r||document).querySelectorAll(s));
const KEY = "kf_orc_v1";
const T0 = Date.now();
let mem = [];
function load(){ try{ const j = JSON.parse(localStorage.getItem(KEY)||"null"); if(Array.isArray(j)) return j.filter(x=>x && x.k); }catch(e){} return mem; }
let items = load();
function save(){ mem = items; try{ localStorage.setItem(KEY, JSON.stringify(items)); }catch(e){} }
const prod = id => equipamentos.find(p=>p.id===id||p.idAntigo===id);
const nameOf = it => it.id ? (prod(it.id)||{nome:it.id}).nome : it.n;
const total = () => items.reduce((a,b)=>a+(b.q||1),0);
const clampQ = v => Math.max(1, Math.min(999, parseInt(v,10)||1));

/* ---------- estrutura (gaveta, aviso, botão flutuante) ---------- */
document.body.insertAdjacentHTML("beforeend",
 '<div class="ov" id="ov"></div>' +
 '<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Meu orçamento" aria-hidden="true">' +
  '<div class="dh"><h2>Meu orçamento</h2><button type="button" class="dx" data-close aria-label="Fechar">×</button></div>' +
  '<div class="db"><p class="dsub">Ajuste a quantidade e informe o modelo de cada item. Depois é só enviar o pedido por e-mail ou WhatsApp.</p><div class="orc-items" id="dItems"></div></div>' +
  '<div class="df"><a class="btn btn-vinho" id="dGo" href="/orcamento.html">Finalizar pedido de orçamento</a><button type="button" class="clr" data-clear>Limpar lista</button></div>' +
 '</aside>' +
 '<div class="toast" id="toast" role="status" aria-live="polite"></div>' +
 '<button type="button" class="orc-fab" id="orcFab" data-open hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg><span>Ver meu orçamento</span><b id="fabN">0</b></button>');

function itemRow(it){
  const p = it.id ? prod(it.id) : null;
  const th = p ? '<div class="th">' + imgTag(p, "", 'loading="lazy"') + '</div>' : '<div class="th cu">+</div>';
  const nm = esc(nameOf(it)), k = esc(it.k);
  return '<div class="it" data-k="' + k + '">' + th +
   '<div class="nf"><b>' + nm + '</b><input class="mod" type="text" maxlength="120" data-mod="' + k + '" value="' + esc(it.m||"") + '" placeholder="Modelo, cor, voltagem… (opcional)" aria-label="Modelo ou observações de ' + nm + '"></div>' +
   '<div class="qty"><button type="button" data-dec="' + k + '" aria-label="Diminuir quantidade">−</button><input type="number" inputmode="numeric" min="1" max="999" data-q="' + k + '" value="' + (it.q||1) + '" aria-label="Quantidade de ' + nm + '"><button type="button" data-inc="' + k + '" aria-label="Aumentar quantidade">+</button></div>' +
   '<button type="button" class="rm" data-rm="' + k + '" aria-label="Remover ' + nm + '">×</button></div>';
}
function listHTML(){
  if(!items.length) return '<p class="empty-list">Sua lista está vazia. Use o botão <b>+ Orçamento</b> nos equipamentos para montar o seu pedido.</p>';
  return items.map(itemRow).join("");
}
function render(){
  const n = total();
  $$("[data-count]").forEach(e=>e.textContent = n);
  const fab = $("#orcFab"); fab.hidden = !n || !!$("#orcForm"); $("#fabN").textContent = n;
  $$("[data-add]").forEach(b=>{ const on = items.some(i=>i.id===b.dataset.add); b.classList.toggle("on", on); b.textContent = on ? "✓ Na lista" : (b.dataset.lbl || "+ Orçamento"); });
  $$(".orc-items").forEach(c=>{ c.innerHTML = listHTML(); });
}
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(toast.h); toast.h=setTimeout(()=>t.classList.remove("on"),2600); }

/* ---------- gaveta ---------- */
let lastFocus = null;
function openDrawer(){ lastFocus=document.activeElement; $("#drawer").classList.add("open"); $("#ov").classList.add("open"); $("#drawer").setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; const x=$("#drawer .dx"); if(x) x.focus(); }
function closeDrawer(){ $("#drawer").classList.remove("open"); $("#ov").classList.remove("open"); $("#drawer").setAttribute("aria-hidden","true"); document.body.style.overflow=""; if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
const hasForm = !!$("#orcForm");
function goFinish(e){
  if(hasForm){ e.preventDefault(); closeDrawer(); $("#orcForm").scrollIntoView({behavior:"smooth",block:"start"}); }
}

/* ---------- operações na lista ---------- */
function addItem(id){
  if(items.some(i=>i.id===id)){ openDrawer(); return; }
  items.push({k:id, id:id, q:1, m:""}); save(); render();
  toast("Adicionado à lista de orçamento");
}
function addCustom(nome, q){
  nome = (nome||"").trim().slice(0,120); if(!nome) return false;
  items.push({k:"x"+Date.now().toString(36)+Math.floor(Math.random()*1000), n:nome, q:clampQ(q), m:""}); save(); render(); return true;
}
const byK = k => items.find(i=>i.k===k);
function setQ(k, q, inPlace){
  const it = byK(k); if(!it) return; it.q = clampQ(q); save();
  $$('[data-q="' + (window.CSS&&CSS.escape?CSS.escape(k):k) + '"]').forEach(i=>{ if(inPlace) i.value = it.q; });
  const n = total(); $$("[data-count]").forEach(e=>e.textContent=n); $("#fabN").textContent=n;
}

/* ---------- formulário ---------- */
function buildText(d){
  const L = ["Olá! Gostaria de solicitar um orçamento à Kinesfit.", "", "Nome: " + d.nome];
  if(d.empresa) L.push("Empresa/condomínio: " + d.empresa);
  if(d.tel) L.push("Telefone: " + d.tel);
  if(d.email) L.push("E-mail: " + d.email);
  if(d.tipo) L.push("Tipo de espaço: " + d.tipo);
  if(d.itens.length){ L.push("", "Itens do orçamento:"); d.itens.forEach((it,i)=>L.push((i+1) + ") " + it.nome + " — Quantidade: " + it.qtd + (it.modelo ? " — Modelo/obs.: " + it.modelo : ""))); }
  if(d.msg) L.push("", "Mensagem: " + d.msg);
  return L.join("\n");
}
function collect(){
  const v = id => ($("#"+id) ? $("#"+id).value.trim() : "");
  return {nome:v("fNome"), empresa:v("fEmp"), tel:v("fTel"), email:v("fMail"), tipo:v("fTipo"), msg:v("fMsg"),
    itens: items.map(it=>({nome:nameOf(it), qtd:it.q||1, modelo:(it.m||"").trim()})),
    website: v("fSite"), t: Date.now()-T0};
}
function say(html, ok){ const m=$("#orcMsg"); m.className = "orc-msg " + (ok?"ok":"err"); m.innerHTML = html; m.scrollIntoView({behavior:"smooth",block:"nearest"}); }
function validate(d, needMail){
  if(!d.nome){ say("Informe o seu nome.", false); $("#fNome").focus(); return false; }
  if(!d.itens.length && !d.msg){ say("Adicione ao menos um equipamento à lista ou escreva uma mensagem.", false); return false; }
  if(needMail){
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){ say("Para enviar por e-mail, informe um e-mail válido para recebermos sua resposta.", false); $("#fMail").focus(); return false; }
  } else if(!d.tel && !d.email){ say("Informe um telefone ou e-mail para contato.", false); $("#fTel").focus(); return false; }
  return true;
}
function sendWa(){
  const d = collect(); if(!validate(d,false)) return;
  window.open(waLink(buildText(d)), "_blank", "noopener");
  say("Abrimos o WhatsApp com o seu pedido pronto. É só tocar em enviar.", true);
}
async function sendMail(btn){
  const d = collect(); if(!validate(d,true)) return;
  const label = btn.textContent; btn.disabled = true; btn.textContent = "Enviando…";
  try{
    const r = await fetch("/enviar.php", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(d)});
    const j = await r.json();
    if(!r.ok || !j || !j.ok) throw new Error("falha");
    items = []; save(); render();
    ["fEmp","fTel","fMsg"].forEach(i=>{ if($("#"+i)) $("#"+i).value=""; });
    say("<b>Pedido enviado!</b> Recebemos a sua solicitação" + (j.ref ? " (protocolo " + esc(j.ref) + ")" : "") + " e responderemos por e-mail em breve.", true);
  }catch(e){
    const href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Pedido de orçamento - " + d.nome) + "&body=" + encodeURIComponent(buildText(d).replace(/\n/g,"\r\n"));
    say('Não conseguimos enviar automaticamente. <a href="' + href + '"><b>Clique aqui para abrir o seu e-mail</b></a> com o pedido já preenchido, ou use o botão do WhatsApp.', false);
    location.href = href;
  }
  btn.disabled = false; btn.textContent = label;
}
function renderForm(){
  const box = $("#orcForm"); if(!box) return;
  box.innerHTML =
   '<form id="form" novalidate onsubmit="return false">' +
    '<h3 class="fh">1. Itens do orçamento</h3>' +
    '<div class="orc-items" id="orcItems"></div>' +
    '<div class="orc-add"><input id="cNome" type="text" maxlength="120" placeholder="Outro equipamento (nome ou descrição)" aria-label="Outro equipamento"><input id="cQ" type="number" min="1" max="999" value="1" inputmode="numeric" aria-label="Quantidade"><button type="button" class="btn btn-dark" data-addcustom>Adicionar</button></div>' +
    '<p class="hint"><a href="/#catalogo" class="lk">Ver mais equipamentos no catálogo</a></p>' +
    '<h3 class="fh">2. Seus dados</h3>' +
    '<div class="f2"><div class="fg"><label for="fNome">Nome *</label><input id="fNome" required autocomplete="name"></div><div class="fg"><label for="fEmp">Empresa / condomínio</label><input id="fEmp" autocomplete="organization"></div></div>' +
    '<div class="f2"><div class="fg"><label for="fMail">E-mail *</label><input id="fMail" type="email" autocomplete="email"></div><div class="fg"><label for="fTel">Telefone / WhatsApp</label><input id="fTel" type="tel" autocomplete="tel"></div></div>' +
    '<div class="fg"><label for="fTipo">Tipo de espaço</label><select id="fTipo"><option value="">Selecione</option><option>Condomínio</option><option>Espaço corporativo</option><option>Construtora / empreendimento</option><option>Academia</option><option>Outro</option></select></div>' +
    '<div class="fg"><label for="fMsg">Mensagem</label><textarea id="fMsg" placeholder="Prazo, local de entrega, observações…"></textarea></div>' +
    '<div class="hp" aria-hidden="true"><label for="fSite">Não preencha</label><input id="fSite" tabindex="-1" autocomplete="off"></div>' +
    '<div class="send"><button type="button" class="btn btn-vinho" data-send="mail">Enviar por e-mail</button><button type="button" class="btn btn-wa" data-send="wa">Enviar pelo WhatsApp</button></div>' +
    '<div id="orcMsg" class="orc-msg" role="status" aria-live="polite"></div>' +
    '<p class="hint">Escolha como prefere enviar. Respondemos com uma proposta personalizada, sem compromisso.</p>' +
   '</form>';
}

/* ---------- eventos ---------- */
document.addEventListener("click", e=>{
  const t = e.target.closest("[data-add],[data-open],[data-close],[data-clear],[data-dec],[data-inc],[data-rm],[data-send],[data-addcustom],#dGo,#ov");
  if(!t) return;
  if(t.dataset.add){ addItem(t.dataset.add); return; }
  if(t.hasAttribute("data-open")){ openDrawer(); return; }
  if(t.hasAttribute("data-close") || t.id==="ov"){ closeDrawer(); return; }
  if(t.hasAttribute("data-clear")){ if(items.length && confirm("Remover todos os itens da lista?")){ items=[]; save(); render(); } return; }
  if(t.dataset.dec){ const it=byK(t.dataset.dec); if(it) setQ(it.k,(it.q||1)-1,true); return; }
  if(t.dataset.inc){ const it=byK(t.dataset.inc); if(it) setQ(it.k,(it.q||1)+1,true); return; }
  if(t.dataset.rm){ items = items.filter(i=>i.k!==t.dataset.rm); save(); render(); return; }
  if(t.dataset.send==="wa"){ sendWa(); return; }
  if(t.dataset.send==="mail"){ sendMail(t); return; }
  if(t.hasAttribute("data-addcustom")){ const n=$("#cNome"); if(addCustom(n.value, $("#cQ").value)){ n.value=""; $("#cQ").value=1; n.focus(); } return; }
  if(t.id==="dGo"){ goFinish(e); return; }
});
document.addEventListener("input", e=>{
  const t = e.target;
  if(t.dataset && t.dataset.mod){ const it=byK(t.dataset.mod); if(it){ it.m=t.value; save(); $$('[data-mod]').forEach(i=>{ if(i!==t && i.dataset.mod===it.k) i.value=t.value; }); } }
  else if(t.dataset && t.dataset.q){ if(t.value!=="" ){ const it=byK(t.dataset.q); if(it){ it.q=clampQ(t.value); save(); const n=total(); $$("[data-count]").forEach(x=>x.textContent=n); $("#fabN").textContent=n; $$('[data-q]').forEach(i=>{ if(i!==t && i.dataset.q===it.k) i.value=it.q; }); } } }
});
document.addEventListener("change", e=>{ const t=e.target; if(t.dataset && t.dataset.q){ const it=byK(t.dataset.q); if(it) setQ(it.k, t.value, true); } });
document.addEventListener("keydown", e=>{
  if(e.key==="Escape" && $("#drawer").classList.contains("open")) closeDrawer();
  if(e.key==="Enter" && e.target.id==="cNome"){ e.preventDefault(); $("[data-addcustom]").click(); }
});

/* menu mobile */
const burger = $("#burger"), nav = $("#nav");
function closeNav(){ nav.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }
if(burger){
  burger.onclick = ()=>{ const o=nav.classList.toggle("open"); burger.classList.toggle("open",o); burger.setAttribute("aria-expanded",o); };
  nav.addEventListener("click", e=>{ if(e.target.closest("a")) closeNav(); });
}

/* ---------- catálogo da página inicial (filtros e busca) ---------- */
const state = {cat:"Todos", sub:"Todos", q:""};
function renderChips(){
  $("#chipsCat").innerHTML = ["Todos"].concat(CATS).map(c=>'<button type="button" class="chip ' + (state.cat===c?"on":"") + '" data-fcat="' + c + '">' + (c==="Todos"?"Todos":CAT_LABEL[c]) + '</button>').join("");
  const subs = SUBS[state.cat] || [];
  $("#chipsSub").innerHTML = subs.length ? ["Todos"].concat(subs).map(s=>'<button type="button" class="chip ' + (state.sub===s?"on":"") + '" data-fsub="' + s + '">' + s + '</button>').join("") : "";
}
function renderGrid(){
  const q = norm(state.q);
  const list = equipamentos.filter(p => (state.cat==="Todos"||p.categoria===state.cat) && (state.sub==="Todos"||p.sub===state.sub) && (!q || norm([p.nome,p.marca,p.modelo,p.sub,p.categoria].join(" ")).includes(q)));
  $("#grid").innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty">Nenhum equipamento encontrado. <a href="#contato" style="color:var(--vinho);font-weight:600">Fale com a gente</a> — podemos ter o que você procura.</p>';
  $("#contagem").textContent = list.length + (list.length===1?" equipamento":" equipamentos");
  render();
}
if($("#grid")){
  document.addEventListener("click", e=>{
    const t = e.target.closest("[data-fcat],[data-fsub]"); if(!t) return;
    if(t.dataset.fcat){ state.cat=t.dataset.fcat; state.sub="Todos"; } else state.sub=t.dataset.fsub;
    renderChips(); renderGrid();
  });
  $("#busca").addEventListener("input", e=>{ state.q=e.target.value; renderGrid(); });
  renderChips();
}

/* ---------- início ---------- */
const wl = waLink("Olá! Gostaria de solicitar um orçamento de equipamentos fitness.");
$$("[data-wa]").forEach(a=>a.href = wl);
const y = $("#ano"); if(y) y.textContent = new Date().getFullYear();
if(hasForm){ $("#dGo").href = "#orcForm"; }
renderForm();
render();
})();
