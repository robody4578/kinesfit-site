const fs=require('fs'),path=require('path');
const kfBuild=require('./build.js');
const r=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
const out=kfBuild(JSON.parse(r('data.json')),r('shared.js'),r('site.css'),r('app.js'),r('enviar.php'),'2026-10-10');
const dist=process.argv[2];
fs.rmSync(dist,{recursive:true,force:true});
let n=0,bytes=0;
for(const [k,v] of Object.entries(out)){const f=path.join(dist,k);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,v);n++;bytes+=Buffer.byteLength(v);}
console.log(n,'arquivos',bytes,'bytes');
