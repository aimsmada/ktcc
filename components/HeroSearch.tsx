"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { useLanguage } from "@/lib/language";
const quick=["Products","Creators","Events","Startups","Spaces","Opportunities"];
export default function HeroSearch(){
 const [query,setQuery]=useState("");const router=useRouter();const {ui}=useLanguage();
 const submit=(e:FormEvent)=>{e.preventDefault();router.push(`/discover?q=${encodeURIComponent(query)}`)};
 return <div className="hero-search-wrap"><form onSubmit={submit} className="hero-search"><Search size={22}/><input aria-label="Cari di KTCC" value={query} onChange={e=>setQuery(e.target.value)} placeholder={ui("What do you want to discover in Kutim?")}/><button aria-label="Cari" type="submit"><ArrowUpRight size={23}/></button></form><div className="quick-search"><span>{ui("EXPLORE:")}</span>{quick.map(t=><button key={t} onClick={()=>router.push(`/discover?type=${({Products:"product",Creators:"creator",Events:"event",Startups:"startup",Spaces:"space",Opportunities:"opportunity"} as Record<string,string>)[t]}`)}>{ui(t)}</button>)}</div></div>
}
