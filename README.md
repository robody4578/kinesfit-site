# Kinesfit — site (kinesfit.com.br)

Catálogo B2B estático. Fontes em `src/`, site gerado em `public/`.

- Gerar: `node src/run.js public`
- Publicar: o cPanel (Git Version Control → Deploy HEAD Commit) copia `public/` para `public_html` via `.cpanel.yml`. Não apaga nada do servidor (fotos em `/img` e `.htaccess` ficam intactos).
- Arquivos binários (logo, favicons, imagem de compartilhamento) ficam em `src/static/` e são copiados para `public/` na geração.
- Mudou CSS/JS? Troque o sufixo de versão (ex.: `.4` → `.5`) em `src/build.js` antes de gerar.
