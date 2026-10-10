const CONFIG = {whatsapp:"5511994474886", whatsappExibido:"(11) 99447-4886", email:"contato@kinesfit.com.br", site:"https://kinesfit.com.br"};
const CATS = ["Musculação","Cardio","Acessórios"];
const SUBS = {"Musculação":["Estações","Bancos","Gaiolas","Máquinas","Peso Livre"],"Cardio":["Esteiras","Spinning","Ergométricas","Elípticos","Plataforma"],"Acessórios":[]};
const CAT_LABEL = {"Musculação":"Musculação","Cardio":"Cardio Máquinas","Acessórios":"Acessórios"};
const CAT_SLUG = {"Musculação":"musculacao","Cardio":"cardio","Acessórios":"acessorios"};
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#e9eef1"/><path d="M70 60v80M70 102l50-42M84 98l40 42" stroke="#b8c6ce" stroke-width="14" stroke-linecap="round" fill="none"/></svg>');
const norm = s => (s||"").toLowerCase().normalize("NFD").replace(new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]","g"),"");
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = s => norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const waLink = txt => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(txt);
const TIPO = {"Estações":["uma","estação de musculação"],"Bancos":["um","banco de treino"],"Gaiolas":["uma","gaiola de treino funcional"],"Máquinas":["uma","máquina de musculação"],"Peso Livre":["um","equipamento de peso livre"],"Esteiras":["uma","esteira profissional"],"Spinning":["uma","bike de spinning"],"Ergométricas":["uma","bicicleta ergométrica"],"Elípticos":["um","elíptico"],"Plataforma":["uma","plataforma vibratória"],"Acessórios":["um","acessório de treino"]};
function tipo(p){ if(/el[ií]ptico/i.test(p.nome)) return TIPO["Elípticos"]; return TIPO[p.sub] || ["um","equipamento fitness"]; }
function localImg(p){ const m=/\.(jpe?g|png|webp|gif)(\?|$)/i.exec(p.img||""); return "/img/"+(p.imgId||p.id)+(m?"."+m[1].toLowerCase():".jpg"); }
function altText(p){ return p.nome + " – " + tipo(p)[1] + " | Kinesfit"; }
function imgTag(p, alt, extra){
  return '<img ' + (extra||"") + ' referrerpolicy="no-referrer" data-pid="' + esc(p.id) + '" data-step="0" src="' + esc(localImg(p)) + '" alt="' + esc(alt) + '" onerror="imgFail(this)">';
}
function pUrl(p){ return "/equipamentos/" + p.id + ".html"; }
function cardHTML(p){
  const br = p.marca ? '<span class="brand">' + esc(p.marca) + (p.modelo ? " · " + esc(p.modelo) : "") + '</span>' : (p.modelo ? '<span class="brand">' + esc(p.modelo) + '</span>' : "");
  return '<article class="card"><a class="ph" href="' + pUrl(p) + '" tabindex="-1" aria-hidden="true">' + imgTag(p, altText(p), 'loading="lazy" width="430" height="430"') + '</a>' +
    '<div class="body"><span class="tag">' + esc(p.sub) + '</span><h3><a href="' + pUrl(p) + '">' + esc(p.nome) + '</a></h3>' + br +
    '<div class="row"><a class="b-det" href="' + pUrl(p) + '">Detalhes</a><button type="button" class="b-orc" data-add="' + esc(p.id) + '">+ Orçamento</button></div></div></article>';
}
