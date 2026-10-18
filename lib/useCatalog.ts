"use client";
import { useEffect, useState } from "react";
import { demoListings, type Listing } from "@/lib/data";
import { supabase } from "@/lib/supabase";
// Explicit opt-in development previews only. Production never publishes invented demo records.
const previewEnabled=process.env.NEXT_PUBLIC_KTCC_SAMPLE_CONTENT==="true" && process.env.NODE_ENV!=="production";
export function useCatalog() {
 const [items,setItems]=useState<Listing[]>(previewEnabled ? demoListings : []);
 const [mode,setMode]=useState<"sample"|"live"|"loading"|"unconfigured"|"error">(supabase?"loading":previewEnabled?"sample":"unconfigured");
 useEffect(()=>{
  if(!supabase)return;
  let cancelled=false;
  const load=async()=>{
   const {data,error}=await supabase!.from("listings").select("*").eq("status","published").order("created_at",{ascending:false}).limit(500);
   if(cancelled)return;
   if(error){setMode("error");return;}
   setItems((data||[]).map(x=>({...x.data,id:x.id,slug:x.slug,kind:x.kind,status:x.status,createdAt:x.created_at})) as Listing[]);
   setMode("live");
  };
  load();
  const channel=supabase.channel("ktcc-public-catalog")
   .on("postgres_changes",{event:"*",schema:"public",table:"listings"},()=>{void load()}).subscribe();
  return()=>{cancelled=true;supabase?.removeChannel(channel)};
 },[]);
 return {items,mode};
}
