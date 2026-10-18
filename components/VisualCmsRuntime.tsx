"use client";
import {useEffect,useRef,useState} from "react";
import {usePathname,useSearchParams} from "next/navigation";
import Link from "next/link";
import {supabase} from "@/lib/supabase";
import {isSafeLink} from "@/lib/cms";
import {Check,ChevronLeft,Image as ImageIcon,Link2,MousePointer2,Save,Type,X} from "lucide-react";

type Kind="text"|"media"|"link"|"placeholder";
type Override={page_path:string;element_key:string;content_type:Kind;content_value:string;published:boolean};
type Target={key:string;path:string;kind:Kind;value:string;node:Node|Element;title:string};

function sectionOf(el:Element){const region=el.closest("header,main,footer");return region?.tagName.toLowerCase()==="header"||region?.tagName.toLowerCase()==="footer"?"global":null;}
function nodePath(el:Element){
 const parts:string[]=[];let curr:Element|null=el;
 while(curr && !["HTML","BODY"].includes(curr.tagName)){
  const ix=curr.parentElement?Array.from(curr.parentElement.children).indexOf(curr)+1:1;
  parts.unshift(`${curr.tagName.toLowerCase()}:${ix}`);
  curr=curr.parentElement;
 }
 return parts.join("/");
}
function collect(pathname:string):Target[]{
 const rows:Target[]=[];
 for(const root of document.querySelectorAll("header.main-header, main,footer.site-footer")){
  const prefix=sectionOf(root)==="global"?"global":pathname;
  const scan=(el:Element)=>{
   if(el.closest(".ktcc-live-editor")||el.closest("[data-ktcc-noedit]"))return;
   const p=nodePath(el);
   if(el instanceof HTMLImageElement||el instanceof HTMLVideoElement){
    rows.push({key:`media:${p}`,path:prefix,kind:"media",value:el.getAttribute("src")||"",node:el,title:el.getAttribute("alt")||el.getAttribute("aria-label")||"Visual"});
   }
   if(el instanceof HTMLAnchorElement){rows.push({key:`link:${p}`,path:prefix,kind:"link",value:el.getAttribute("href")||"",node:el,title:`Link: ${el.textContent?.trim().slice(0,50)}`});}
   if(el instanceof HTMLInputElement && el.placeholder){rows.push({key:`placeholder:${p}`,path:prefix,kind:"placeholder",value:el.placeholder,node:el,title:`Placeholder: ${el.placeholder}`});}
   Array.from(el.childNodes).forEach((node,i)=>{
    if(node.nodeType!==Node.TEXT_NODE||!node.textContent?.trim()||!["STYLE","SCRIPT","NOSCRIPT"].every(t=>el.tagName!==t))return;
    if(el instanceof HTMLTextAreaElement||el instanceof HTMLSelectElement||el instanceof HTMLInputElement)return;
    rows.push({key:`text:${p}:${i}`,path:prefix,kind:"text",value:node.textContent||"",node,title:node.textContent.trim().slice(0,64)});
   });
   Array.from(el.children).forEach(scan);
  };
  scan(root);
 }
 return rows;
}
function setVisual(target:Target, value:string){
 if(target.kind==="text"){if(target.node.textContent!==value)target.node.textContent=value;return;}
 const el=target.node as Element;
 if(target.kind==="link"){if(isSafeLink(value)&&el.getAttribute("href")!==value)el.setAttribute("href",value);return;}
 if(target.kind==="placeholder"){if(el.getAttribute("placeholder")!==value)el.setAttribute("placeholder",value);return;}
 if(target.kind==="media"&&isSafeLink(value)){
  if(el.getAttribute("src")!==value){el.setAttribute("src",value);if(el instanceof HTMLVideoElement)el.load();}
 }
}
/**
 * Works on the actual public Next.js pages. Text/media overrides are applied after React renders.
 * Stable DOM paths make it possible to edit text that isn't already expressed as a CMS field.
 * For durable edits during major layout refactors, convert critical elements into named CMS fields.
 */
export default function VisualCmsRuntime(){
 const pathname=usePathname();const params=useSearchParams();
 const enabled=params.get("ktccEdit")==="1"&&!pathname.startsWith("/admin");
 const [allowed,setAllowed]=useState(false);const [active,setActive]=useState<Target|null>(null);
 const [value,setValue]=useState("");const [assetOptions,setAssetOptions]=useState<{public_url:string;file_name:string}[]>([]);
 const [status,setStatus]=useState("");const [busy,setBusy]=useState(false);
 const rowsRef=useRef<Target[]>([]);const savedRef=useRef<Map<string,string>>(new Map());
 useEffect(()=>{
  if(!enabled||!supabase){setAllowed(false);return;}
  let mounted=true;
  (async()=>{
   const {data}=await supabase!.auth.getUser();if(!data.user)return;
   const {data:profile}=await supabase!.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
   if(mounted&&profile?.role==="admin"){
    setAllowed(true);
    const media=await supabase!.from("media_assets").select("public_url,file_name").order("created_at",{ascending:false}).limit(150);
    if(mounted)setAssetOptions(media.data||[]);
   }
  })();return()=>{mounted=false};
 },[enabled]);
 useEffect(()=>{
  if(!supabase||pathname.startsWith("/admin"))return;
  let mounted=true;let frame=0;let processing=false;
  savedRef.current=new Map();
  const refresh=()=>{
   if(processing)return;processing=true;
   rowsRef.current=collect(pathname);
   for(const t of rowsRef.current){const key=`${t.path}|${t.key}`;const val=savedRef.current.get(key);if(val!==undefined)setVisual(t,val);}
   processing=false;
  };
  (async()=>{
   const {data,error}=await supabase!.from("visual_overrides").select("page_path,element_key,content_type,content_value,published").in("page_path",["global",pathname]).eq("published",true);
   if(!mounted)return;
   if(!error)for(const d of data||[])savedRef.current.set(`${d.page_path}|${d.element_key}`,d.content_value);
   refresh();
  })();
  refresh();
  const observer=new MutationObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(refresh)});
  const main=document.querySelector("main");const head=document.querySelector("header.main-header");const foot=document.querySelector("footer.site-footer");
  for(const n of [main,head,foot])if(n)observer.observe(n,{subtree:true,childList:true,characterData:true});
  const change=()=>{refresh()};window.addEventListener("ktcc-content-refresh",change);
  return()=>{mounted=false;observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener("ktcc-content-refresh",change)};
 },[pathname]);
 useEffect(()=>{
  if(!enabled||!allowed)return;
  const onClick=(ev:MouseEvent)=>{
   const el=ev.target instanceof Element?ev.target:null;
   if(!el||el.closest(".ktcc-live-editor")||el.closest("[data-ktcc-noedit]"))return;
   let picked:Target|undefined;
   for(let cursor:Element|null=el;cursor && !picked;cursor=cursor.parentElement){
    const own=rowsRef.current.filter(x=>x.node===cursor||(x.kind==="text"&&x.node.parentElement===cursor));
    picked=own.find(x=>x.kind==="media")||own.find(x=>x.kind==="text")||own.find(x=>x.kind==="placeholder")||own.find(x=>x.kind==="link");
    if(cursor.matches("header,main,footer"))break;
   }
   if(!picked)return;
   ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();
   const current=savedRef.current.get(`${picked.path}|${picked.key}`);setActive(picked);setValue(current??picked.value);setStatus("");
  };
  document.addEventListener("click",onClick,true);return()=>document.removeEventListener("click",onClick,true);
 },[enabled,allowed]);
 async function save(){if(!active||!supabase)return;
  if((active.kind==="media"||active.kind==="link")&&!isSafeLink(value)){setStatus("Gunakan URL HTTPS atau path lokal yang aman.");return;}
  setBusy(true);setStatus("");
  const {data}=await supabase.auth.getUser();if(!data.user){setStatus("Sesi berakhir, silakan login ulang.");setBusy(false);return;}
  const {error}=await supabase.from("visual_overrides").upsert({page_path:active.path,element_key:active.key,content_type:active.kind,content_value:value,published:true,updated_by:data.user.id},{onConflict:"page_path,element_key"});
  if(error)setStatus(error.message);else{
   savedRef.current.set(`${active.path}|${active.key}`,value);setVisual(active,value);setActive(null);setStatus("Konten diterbitkan ke website.");
   window.dispatchEvent(new Event("ktcc-content-refresh"));
  }
  setBusy(false);
 }
 async function reset(){if(!active||!supabase)return;setBusy(true);
  const {error}=await supabase.from("visual_overrides").delete().eq("page_path",active.path).eq("element_key",active.key);
  if(error){setStatus(error.message);}else{savedRef.current.delete(`${active.path}|${active.key}`);setActive(null);setStatus("Override dihapus. Muat ulang halaman untuk melihat teks bawaan.");}
  setBusy(false);
 }
 const relatedLink=active&&active.kind!=="link"?rowsRef.current.find(x=>x.kind==="link"&&x.path===active.path&&x.node instanceof Element&&(
  (active.node instanceof Element?active.node:active.node.parentElement)?.closest("a")===x.node)):null;
 const relatedText=active&&active.kind==="link"?rowsRef.current.find(x=>x.kind==="text"&&x.path===active.path&&x.node.parentElement===active.node):null;
 const switchTo=(target:Target)=>{setActive(target);setValue(savedRef.current.get(`${target.path}|${target.key}`)??target.value);};
 if(!enabled||!allowed)return null;
 return <div className="ktcc-live-editor" data-ktcc-noedit>
  <div className="ktcc-editor-toolbar"><MousePointer2 size={18}/><strong>KTCC Visual Editor</strong><span>Klik teks, gambar, atau tautan untuk mengedit.</span><Link href="/admin" className="ktcc-editor-back"><ChevronLeft size={15}/> Admin</Link><Link href={pathname} className="ktcc-editor-exit"><X size={15}/> Keluar</Link></div>
  {status&&<div className="ktcc-editor-toast" role="status"><Check size={16}/>{status}<button onClick={()=>setStatus("")} aria-label="Tutup notifikasi"><X size={14}/></button></div>}
  {active&&<div className="ktcc-editor-shade"><div className="ktcc-editor-dialog" role="dialog" aria-modal="true" aria-label="Edit konten langsung">
   <div className="ktcc-editor-dialog-head"><span>{active.kind==="text"?<Type size={17}/>:active.kind==="media"?<ImageIcon size={17}/>:<Link2 size={17}/>} Edit {active.kind==="text"?"teks":active.kind==="media"?"media":active.kind==="link"?"tautan":"placeholder"}</span><button onClick={()=>setActive(null)} aria-label="Tutup editor"><X size={18}/></button></div>
   <small>{active.path} • {active.title}</small>
   {active.kind==="text"?<textarea rows={7} autoFocus className="field cms-textarea" value={value} onChange={e=>setValue(e.target.value)}/>:<input autoFocus className="field" value={value} onChange={e=>setValue(e.target.value)}/>}
   {active.kind==="media"&&<><p>URL gambar, GIF, MP4 atau WebM dari pustaka media:</p><select className="field" value="" onChange={e=>e.target.value&&setValue(e.target.value)}><option value="">Pilih dari Media Library…</option>{assetOptions.map(x=><option key={x.public_url} value={x.public_url}>{x.file_name}</option>)}</select></>}
   {relatedLink&&<button className="btn btn-plain" onClick={()=>switchTo(relatedLink)}><Link2 size={15}/> Edit tujuan tautan ini</button>}
   {relatedText&&<button className="btn btn-plain" onClick={()=>switchTo(relatedText)}><Type size={15}/> Edit teks tautan ini</button>}
   {status&&<p role="alert">{status}</p>}
   <div className="ktcc-editor-controls"><button type="button" onClick={reset} disabled={busy} className="btn btn-plain">Reset</button><button type="button" onClick={()=>setActive(null)} className="btn btn-outline">Batal</button><button type="button" onClick={save} disabled={busy} className="btn btn-dark"><Save size={16}/> {busy?"Menyimpan...":"Simpan & Terbitkan"}</button></div>
  </div></div>}
 </div>;
}
