const fs=require('fs');
const s=fs.readFileSync('lib/data.ts','utf8');
const body=s.split('export const demoListings: Listing[] = [')[1].split('];\n\nexport const currency')[0];
const arr=new Function('return ['+body+'];')();
fs.writeFileSync(require('path').join(__dirname,'.ktcc-raw-items.json'),JSON.stringify(arr));
console.log('Extracted',arr.length,'sample listings');
