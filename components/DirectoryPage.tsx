"use client";
import { useEffect,useMemo,useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { type Kind, districts } from "@/lib/data";
import { ListingGrid } from "@/components/ListingCard";
import ExploreMap from "@/components/ExploreMap";
import { CmsSections,CmsHero } from "@/components/CmsSections";
import { useSitePage } from "@/lib/cms";
import { useLanguage } from "@/lib/language";

type PageKey="discover"|"market"|"digital"|"creators"|"startups"|"spaces"|"communities"|"opportunities"|"stories";
const config:Record<PageKey,{tag:string;title:string;italic:string;description:string;kinds:Kind[]}>={
 discover:{tag:"DISCOVER KUTIM",title:"Find your next",italic:"possibility.",description:"Explore the people, products, spaces and ideas shaping Kutai Timur's future creative economy.",kinds:["product","digital","creator","startup","space","event","community","opportunity"]},
 market:{tag:"CURATED LOCAL MARKET",title:"Made with",italic:"meaning.",description:"Discover curated merchandise, local products and maker stories. Meet makers and discover products from Kutai Timur.",kinds:["product"]},
 digital:{tag:"DIGITAL CREATIVE MARKET",title:"Creativity without",italic:"borders.",description:"Discover digital illustrations, fonts, photo presets and motion assets from a new generation of creators.",kinds:["digital"]},
 creators:{tag:"PEOPLE MAKE THE PLACE",title:"Meet the",italic:"makers.",description:"Explore photographers, designers, creative technologists and artists. Find your next collaborator.",kinds:["creator"]},
 startups:{tag:"BUILD WHAT'S NEXT",title:"Small teams.",italic:"Bold futures.",description:"A discovery space for startups and ventures addressing local challenges with creative ideas.",kinds:["startup"]},
 spaces:{tag:"WHERE IDEAS COME ALIVE",title:"Find room to",italic:"create.",description:"Studios, coworking spaces, libraries and other places to make, meet and grow together.",kinds:["space"]},
 communities:{tag:"GROW WITH YOUR PEOPLE",title:"Find your",italic:"community.",description:"Explore local communities building shared creative momentum.",kinds:["community"]},
 stories:{tag:"KTCC CREATIVE JOURNAL",title:"Stories worth",italic:"sharing.",description:"Notes on people, design and the creative future of Kutai Timur. Read stories and meet the people behind local creativity.",kinds:["article"]},
 opportunities:{tag:"TURN DISCOVERY INTO ACTION",title:"Your next",italic:"opportunity.",description:"Explore projects, creative briefs and collaboration calls. Find opportunities to collaborate and grow.",kinds:["opportunity"]},
};
const indonesia:Record<PageKey,{tag:string;title:string;italic:string;description:string}>={
 discover:{tag:"JELAJAHI KUTIM",title:"Temukan peluang",italic:"barumu.",description:"Jelajahi talenta, produk, ruang, dan ide yang membentuk masa depan ekonomi kreatif Kutai Timur."},
 market:{tag:"PASAR KREATIF PILIHAN",title:"Karya yang",italic:"bermakna.",description:"Temukan merchandise pilihan, produk lokal, dan kisah para pembuatnya di Kutai Timur."},
 digital:{tag:"PASAR KARYA DIGITAL",title:"Kreativitas tanpa",italic:"batas.",description:"Temukan ilustrasi digital, font, preset fotografi, dan aset video dari kreator berbakat."},
 creators:{tag:"TALENTA LOKAL",title:"Kenali para",italic:"kreator.",description:"Temukan fotografer, desainer, seniman, dan pengembang kreatif untuk kolaborasi berikutnya."},
 startups:{tag:"BANGUN MASA DEPAN",title:"Tim kecil.",italic:"Ide besar.",description:"Jelajahi startup dan usaha baru yang menjawab tantangan daerah dengan ide inovatif."},
 spaces:{tag:"RUANG UNTUK BERKARYA",title:"Temukan ruang",italic:"kreatifmu.",description:"Studio, coworking, perpustakaan, dan ruang kolaborasi untuk bertemu, berkarya, serta tumbuh bersama."},
 communities:{tag:"TUMBUH BERSAMA",title:"Temukan",italic:"komunitasmu.",description:"Jelajahi komunitas lokal yang membangun semangat kreatif bersama."},
 stories:{tag:"JURNAL KREATIF KTCC",title:"Cerita yang",italic:"menginspirasi.",description:"Kisah tentang manusia, desain, dan masa depan kreatif Kutai Timur."},
 opportunities:{tag:"WUJUDKAN KOLABORASI",title:"Peluang",italic:"berikutnya.",description:"Temukan proyek, peluang kerja kreatif, dan ajakan berkolaborasi untuk berkembang bersama."}
};
export default function DirectoryPage({section}:{section:PageKey}){
 const {language,localize,ui}=useLanguage();const cfg={...config[section],...(language==="id"?indonesia[section]:{})};const {items,mode}=useCatalog();
 const [search,setSearch]=useState("");const [district,setDistrict]=useState("Semua Kecamatan");const [kind,setKind]=useState("all");const [category,setCategory]=useState("all");const [mapMode,setMapMode]=useState(false);
 useEffect(()=>{
  const qs=new URLSearchParams(window.location.search);setSearch(qs.get("q")||"");setKind(qs.get("type")||"all");setMapMode(qs.get("map")==="1");
 },[]);
 const pool=useMemo(()=>items.filter(x=>cfg.kinds.includes(x.kind)),[items,cfg.kinds]);
 const categories=useMemo(()=>[...new Set(pool.map(x=>x.category))].sort(),[pool]);
 const shown=pool.filter(x=>{
  const q=search.toLocaleLowerCase().trim();
  return (!q||[x.title,x.subtitle,x.category,x.location,x.description,...x.tags].join(" ").toLocaleLowerCase().includes(q))&&(district==="Semua Kecamatan"||x.district===district)&&(kind==="all"||x.kind===kind)&&(category==="all"||x.category===category);
 });
 return <><CmsHero path={`/${section}`} eyebrow={cfg.tag} title={cfg.title} accent={cfg.italic} description={cfg.description}/><section className="container"><div className="hero-actions">{section==="market"?<Link href="/digital" className="btn btn-dark">{localize("Jelajahi produk digital","Explore digital products")} <ArrowUpRight size={16}/></Link>:section==="discover"?<button className="btn btn-dark" onClick={()=>{setMapMode(!mapMode)}}><MapPin size={16}/>{mapMode?localize("Tampilkan direktori","Show directory"):localize("Lihat peta kreatif","View creative map")}</button>:section==="creators"?<Link className="btn btn-dark" href="/ai">{localize("Temukan rekan kreatif","Find a creative match")} <Sparkles size={16}/></Link>:section==="spaces"?<span className="chip chip-soft">{localize("Hubungi pengelola untuk memastikan ketersediaan","Contact venues to check availability")}</span>:null}</div></section>
 <div className="container directory-area"><div className="filterbar"><label className="filter-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={localize("Cari di ekosistem kreatif...","Search creative ecosystem...")} aria-label="Cari katalog"/></label><select className="filter-select" aria-label="Filter kecamatan" value={district} onChange={e=>setDistrict(e.target.value)}>{districts.map(x=><option key={x}>{x}</option>)}</select>{section==="discover"&&<select className="filter-select" aria-label="Filter jenis" value={kind} onChange={e=>setKind(e.target.value)}><option value="all">{localize("Semua jenis","All types")}</option>{cfg.kinds.map(x=><option value={x} key={x}>{x[0].toUpperCase()+x.slice(1)}</option>)}</select>}<select className="filter-select" aria-label="Filter kategori" value={category} onChange={e=>setCategory(e.target.value)}><option value="all">{localize("Semua kategori","All categories")}</option>{categories.map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="filter-meta"><span><SlidersHorizontal size={13} style={{display:"inline",verticalAlign:"middle"}}/> &nbsp; <b>{shown.length}</b> {localize("hasil","results")} </span>{section==="discover"&&<div className="seg-control"><button className={!mapMode?"active":""} onClick={()=>setMapMode(false)}>{localize("Kartu","Cards")}</button><button className={mapMode?"active":""} onClick={()=>setMapMode(true)}>{localize("Peta","Map")}</button></div>}</div>
 {mapMode&&section==="discover"?<><ExploreMap items={shown}/><div style={{height:32}}/></>:null}
 <ListingGrid items={shown} empty="Belum ditemukan hasil untuk filter ini. Coba kata kunci atau kecamatan lain."/>

 </div><CmsSections path={`/${section}`}/></>;
}
