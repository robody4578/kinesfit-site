# Kinesfit — site (kinesfit.com.br)

Catálogo B2B estático. Fontes em `src/`, site gerado em `public/`.

- Gerar: `node src/run.js public`
- Publicar: o cPanel (Git Version Control → Deploy HEAD Commit) copia `public/` para `public_html` via `.cpanel.yml`. Não apaga nada do servidor (fotos em `/img` e `.htaccess` ficam intactos).
- Mudou CSS/JS? Troque o sufixo de versão (`.2` → `.3`) em `src/build.js` antes de gerar.
