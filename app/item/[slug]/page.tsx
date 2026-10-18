import type { Metadata } from "next";
import ItemPage from "@/components/ItemPage";
type Params={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params;
 const site=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(site&&key){try{
  const endpoint=new URL("/rest/v1/listings",site);
  endpoint.searchParams.set("slug","eq."+slug);endpoint.searchParams.set("status","eq.published");endpoint.searchParams.set("select","data,kind");endpoint.searchParams.set("limit","1");
  const response=await fetch(endpoint.toString(),{headers:{apikey:key,Authorization:`Bearer ${key}`},next:{revalidate:60}});
  if(response.ok){const listing=(await response.json())[0];if(listing){
   const title=String(listing.data?.title||"KTCC"),description=String(listing.data?.description||"Jelajahi karya kreatif Kutai Timur.").slice(0,160);
   const image=listing.data?.image;
   return {title:`${title} | KTCC`,description,openGraph:{title,description,...(image?{images:[image]}:{})}};
  }}
 }catch{/* keep generic safe metadata */}}
 return {title:"Konten Kreatif | KTCC",robots:{index:false}};
}
export default function Page(){return <ItemPage/>}
