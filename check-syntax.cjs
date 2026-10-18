const fs=require('fs'),path=require('path');
let ts;try{ts=require('typescript')}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js')}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.join(dir,f.name)]).filter(x=>/\.tsx?$/.test(x)&&!x.includes('next-env'))}
let errs=0;for(const filename of [...walk('app'),...walk('components'),...walk('lib')]){
 const src=fs.readFileSync(filename,'utf8');
 const s=ts.createSourceFile(filename,src,ts.ScriptTarget.Latest,true,filename.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 if(s.parseDiagnostics.length){errs+=s.parseDiagnostics.length;console.log('ERROR',filename);for(const d of s.parseDiagnostics)console.log(ts.flattenDiagnosticMessageText(d.messageText,'\n'),'at pos',d.start)}
}
console.log(`${errs===0?'PASS':'FAIL'}: ${errs} TypeScript syntax errors across app/components/lib`);process.exitCode=errs?1:0;
