"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import { useMemo,useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight, WandSparkles, Search, ShieldCheck } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { ListingCard } from "@/components/ListingCard";
import type { Listing } from "@/lib/data";
const examples=["Saya fotografer pemula di Sangatta dan ingin event, komunitas, atau proyek.","Saya pemilik UMKM, perlu desainer branding dan studio foto.","Saya developer dan ingin mencari startup atau kolaborasi kreatif."];
const aliases:Record<string,string[]>={fotografer:["photography","photographer","photo","studio","photografi","visual"],desainer:["designer","design","branding","illustration"],umkm:["business","craft","market","branding","product"],komunitas:["community","komunitas"],startup:["startup","technology","developer","saas"],event:["event","workshop","festival","meetup"],kerja:["opportunity","hire","open for work"],musik:["musician","music","audio"]};
const pick=(item:Listing,q:string)=>{
 const query=q.toLowerCase();const words=query.split(/\W+/).filter(x=>x.length>3);
 const hay=[item.title,item.subtitle,item.category,item.district,item.description,item.kind,...item.tags].join(" ").toLowerCase();
 let score=0;
 for(const w of words){if(hay.includes(w))score+=3;for(const synonym of (aliases[w]||[])){if(hay.includes(synonym))score+=2}}
 if(query.includes("sangatta")&&item.district.includes("Sangatta"))score+=3;
 if(query.includes("kolaborasi")&&["creator","startup","community","opportunity"].includes(item.kind))score+=3;
 return score;
};
export default function CreativeMatchPage(){
 const [query,setQuery]=useState(examples[0]);const [submitted,setSubmitted]=useState("");const {items}=useCatalog();
 const matches=useMemo(()=>submitted?items.map(item=>({...item,score:pick(item,submitted)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8):[],[items,submitted]);
 return <><CmsHero path="/ai" eyebrow="KTCC CREATIVE MATCH" title="Find the right" accent="connections." description="Describe what you do or need. Discover relevant creators, projects, startups, events, spaces and communities."/><div className="container directory-area" style={{maxWidth:1150}}><div className="matching-panel"><span className="eyebrow inverted">IDEAS NEED PEOPLE</span><h2>What are you looking for?</h2><p>Type in Bahasa Indonesia or English. Rekomendasi dicocokkan dengan bidang, deskripsi, dan kata kunci pada katalog KTCC.</p><textarea value={query} onChange={e=>setQuery(e.target.value)} aria-label="Deskripsikan kebutuhan kreatif"/><button className="btn btn-lime" disabled={!query.trim()} onClick={()=>setSubmitted(query)}><WandSparkles size={18}/> Find my matches <ArrowUpRight size={17}/></button></div><div className="chip-row" style={{marginTop:20}}>{examples.map((x,i)=><button className="chip" key={i} onClick={()=>{setQuery(x);setSubmitted(x)}}>Example {i+1} ↗</button>)}</div>
 {submitted&&<section className="match-results"><span className="eyebrow">RECOMMENDATIONS</span><h2 className="section-heading" style={{marginTop:15}}>Matches for <em>your idea.</em></h2><div className="small-alert" style={{margin:"20px 0 27px"}}><ShieldCheck size={17} style={{display:"inline",verticalAlign:"middle",marginRight:6}}/> Hasil pencocokan berdasarkan relevansi kata kunci dan profil terpublikasi, bukan keputusan otomatis AI generatif. Periksa detail kesempatan sebelum bertindak.</div>{matches.length?<div className="listing-grid">{matches.map(x=><div key={x.id}><div style={{fontSize:11,color:"#4b7b58",fontWeight:800,marginBottom:7}}>Relevance score: {x.score} · {x.kind}</div><ListingCard item={x}/></div>)}</div>:<div className="empty-state">Belum ada kecocokan pada katalog. Coba deskripsi yang lebih umum.</div>}</section>}
 </div><CmsSections path="/ai"/></>;
}
