// Execute the standalone preview logic in a lightweight mocked DOM to verify routes render.
const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync(require('path').join(__dirname,'KTCC_Interactive_Preview.html'),'utf8');
const match=src.match(/<script>([\s\S]*?)<\/script>/);
if(!match) throw new Error('No preview script found');
const app={innerHTML:'',querySelectorAll(){return []}}, menu={classList:{remove(){},toggle(){}},querySelectorAll(){return []},addEventListener(){}}, noop={classList:{toggle(){}},querySelectorAll(){return []},addEventListener(){}};
const storage=new Map();
const locals={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)};
const context={
 console,window:{localStorage:locals,addEventListener(){}},location:{hash:'#/'},localStorage:locals,
 document:{documentElement:{lang:'id'},getElementById(id){return id==='app'?app:id==='mobile-menu'?menu:noop},querySelector(s){return s==='#app'?app:s==='#mobile-menu'?menu:null},querySelectorAll(){return []},createTreeWalker(){return {nextNode(){return null}}},addEventListener(){}},NodeFilter:{SHOW_TEXT:4},
 scrollTo(){},alert(){},navigator:{clipboard:{writeText:async()=>{}}},URL,Date,Intl,Math,Number,String,Boolean,JSON,Array,Set,Object,FormData,
};
vm.createContext(context);vm.runInContext(match[1],context,{timeout:5000});
const tests=[['/', 'hero-section'],['/discover','listing-grid'],['/market','listing-grid'],['/digital','listing-grid'],['/creators','listing-grid'],['/events','listing-grid'],['/startups','listing-grid'],['/spaces','listing-grid'],['/stories','listing-grid'],['/future','timeline-rail'],['/ai','matching-panel'],['/passport','passport-card'],['/impact','metric-cards'],['/join','field-label'],['/dashboard','dashboard-card'],['/admin','admin-table'],['/item/akar-anyam-signature-tote','detail-layout']];
for(const [route,expect] of tests){context.location.hash='#'+route;context.render();if(!app.innerHTML.includes(expect))throw Error(`Expected ${expect} missing from ${route}`);console.log('✓',route,app.innerHTML.length,'characters');}
console.log(`PASS: ${tests.length} routed interactive preview views render without JavaScript errors`);
