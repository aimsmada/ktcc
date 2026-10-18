import type { Metadata } from "next";
const baseTitle="KTCC — Kutai Timur Creative Center";
const baseDescription="Temukan produk kreatif, talenta, event, startup dan ruang kolaborasi Kutai Timur melalui KTCC.";
export async function getPageMetadata(path:string,defaultTitle:string):Promise<Metadata>{
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 let title=defaultTitle,description=baseDescription;
 if(url&&key){
  try{
   const endpoint=new URL("/rest/v1/site_pages",url);
   endpoint.searchParams.set("path","eq."+path);endpoint.searchParams.set("published","eq.true");
   endpoint.searchParams.set("select","seo_title,seo_description,title,description");endpoint.searchParams.set("limit","1");
   const res=await fetch(endpoint.toString(),{headers:{apikey:key,Authorization:`Bearer ${key}`},next:{revalidate:60}});
   if(res.ok){const x=(await res.json())[0];if(x){title=x.seo_title||x.title||title;description=x.seo_description||x.description||description}}
  }catch{/* Metadata falls back to valid local SEO strings. */}
 }
 return {title:`${title} | KTCC`,description,openGraph:{title:`${title} | KTCC`,description,type:"website"},robots:{index:Boolean(url&&key),follow:Boolean(url&&key)}};
}
