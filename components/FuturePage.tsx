"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import Link from "next/link";
import Image from "next/image";
import { useMemo,useState } from "react";
import { ArrowUpRight, ExternalLink, Landmark, Building2, UsersRound } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import {useLanguage} from "@/lib/language";
export default function FuturePage(){
 const {localize}=useLanguage();const {items}=useCatalog();const list=items.filter(x=>x.kind==="initiative");const [year,setYear]=useState("all");const [sector,setSector]=useState("all");const [owner,setOwner]=useState("all");
 const categories=[...new Set(list.map(x=>x.category))];
 const shown=list.filter(x=>(year==="all"||x.date?.startsWith(year))&&(sector==="all"||x.category===sector)&&(owner==="all"||x.tags.some(t=>t.toLowerCase().includes(owner))));
 return <><CmsHero path="/future" eyebrow="THE ROAD TO TOMORROW" title="Kutim" accent="2045." description="Ikuti inisiatif transformasi kreatif dan digital Kutai Timur yang memiliki sumber dan status terverifikasi."/>
 <section className="container directory-area"><div className="section-head"><div><span className="eyebrow">{localize("LINIMASA INTERAKTIF MASA DEPAN","INTERACTIVE FUTURE TIMELINE")}</span><h2 className="section-heading">2026 → <em>2045</em></h2></div></div>
 
 <div className="timeline-rail"><button className={`year-pill ${year==="2026"?"active":""}`} onClick={()=>setYear(year==="2026"?"all":"2026")}>2026</button>{["2030","2035","2040","2045"].map(x=><button key={x} onClick={()=>setYear(year===x?"all":x)} className={`year-pill ${year===x?"active":""}`}>{x}</button>)}</div>
 <div className="filterbar" style={{marginTop:30}}><select className="filter-select" value={sector} onChange={e=>setSector(e.target.value)}><option value="all">{localize("Semua sektor","All sectors")}</option>{categories.map(x=><option key={x}>{x}</option>)}</select><select className="filter-select" value={owner} onChange={e=>setOwner(e.target.value)}><option value="all">{localize("Semua jenis inisiatif","All initiative types")}</option><option value="government">{localize("Pemerintah","Government")}</option><option value="private sector">{localize("Swasta","Private sector")}</option><option value="collaboration">{localize("Kolaborasi","Collaboration")}</option></select><button onClick={()=>{setYear("all");setSector("all");setOwner("all")}} className="btn btn-plain">{localize("Atur ulang filter","Reset filters")}</button></div>
 {shown.length?<div className="roadmap-cards">{shown.map(x=><Link className="roadmap-card" key={x.id} href={`/item/${x.slug}`}><Image src={x.image} height={120} width={130} alt={x.title} unoptimized/><div><span>{x.date?.slice(0,4)} · {x.category} · {x.statusLabel||"Scenario"}</span><h3>{x.title} <ArrowUpRight size={15} style={{display:"inline"}}/></h3><p>{x.description}</p><span>{localize("Lihat selengkapnya ↗","Lihat selengkapnya ↗")}</span></div></Link>)}</div>:<div className="empty-state">Belum ada inisiatif terverifikasi untuk filter tersebut.</div>}
 <div className="vision-panel" style={{marginTop:60,minHeight:310}}><div className="vision-info" style={{padding:40}}><span className="eyebrow inverted">{localize("DARI VISI MENUJU HASIL TERUKUR","FROM VISION TO VERIFIABLE PROGRESS")}</span><h2 style={{fontSize:37}}>Real plans deserve<br/><em>real sources.</em></h2><p>Informasi inisiatif didampingi sumber rujukan, instansi atau mitra penanggung jawab dan perkembangan terbaru.</p><Link href="/join" className="btn btn-lime">{localize("Jadi mitra KTCC","Become a KTCC partner")} <ArrowUpRight size={16}/></Link></div><div className="vision-graphic"/></div>
 </section><CmsSections path="/future"/></>;
}
