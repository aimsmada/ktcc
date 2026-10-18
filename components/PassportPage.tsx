"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import { useEffect,useState } from "react";
import Link from "next/link";
import { Award, ArrowUpRight, CalendarDays, Heart, Handshake, Boxes, Sparkles, UserRound } from "lucide-react";
import { readState,type SavedState } from "@/lib/client-store";
import { useCatalog } from "@/lib/useCatalog";
import { ListingGrid } from "@/components/ListingCard";
const zero:SavedState={favorites:[],registrations:[],bookings:[],inquiries:[]};
export default function PassportPage(){
 const [state,setState]=useState(zero);const [name,setName]=useState("KTCC Explorer");const {items}=useCatalog();
 useEffect(()=>{setState(readState());setName(window.localStorage.getItem("ktcc-passport-name")||"KTCC Explorer");const change=()=>setState(readState());window.addEventListener("ktcc-store-update",change);return()=>window.removeEventListener("ktcc-store-update",change)},[]);
 const points=state.favorites.length*2+state.registrations.length*5+state.inquiries.length*8+state.bookings.length*4;
 const level=Math.max(1,Math.floor(points/20)+1);
 const badges=[{name:"Explorer",ok:true},{name:"Creator",ok:state.favorites.length>=2},{name:"Collaborator",ok:state.inquiries.length>=1},{name:"Community Builder",ok:state.registrations.length>=1},{name:"Space Maker",ok:state.bookings.length>=1}];
 const saved=items.filter(x=>state.favorites.includes(x.id));
 return <><CmsHero path="/passport" eyebrow="YOUR CREATIVE IDENTITY" title="Creative" accent="Passport." description="Simpan inspirasi, temukan komunitas, dan jelajahi karya ekonomi kreatif Kutai Timur."/><section className="container directory-area"><div className="feature-dashboard"><div className="passport-card"><div className="passport-top"><span>KTCC CREATIVE PASSPORT ✳</span><Award size={26}/></div><h2>{name}</h2><p>CREATIVE LEVEL {String(level).padStart(2,"0")} · {points} EXPLORER POINTS</p><div className="passport-badges">{badges.filter(x=>x.ok).map(x=><span key={x.name}>✳ {x.name}</span>)}</div></div><div className="dashboard-card"><span className="eyebrow">YOUR PROFILE · PERSONAL SPACE</span><h3>Make it yours.</h3><p className="subheading">Nama dan favorit saat ini tersimpan pada browser perangkat ini. Gunakan akun KTCC untuk mengirim permintaan kolaborasi dan event.</p><label className="field-label">Creative name</label><input className="field" aria-label="Nama passport" value={name} onChange={e=>{setName(e.target.value);window.localStorage.setItem("ktcc-passport-name",e.target.value)}}/><div className="chip-row" style={{marginTop:18}}>{badges.map(x=><span key={x.name} className={`chip ${x.ok?"chip-soft":""}`}>{x.ok?"✓":"○"} {x.name}</span>)}</div></div></div>
 <div className="metric-cards">{[{i:<Heart/>,n:state.favorites.length,t:"Saved items"},{i:<CalendarDays/>,n:state.registrations.length,t:"Calendar interests"},{i:<Handshake/>,n:state.inquiries.length,t:"Collaboration requests"},{i:<Boxes/>,n:state.bookings.length,t:"Spaces saved"}].map(x=><div key={x.t} className="metric-card">{x.i}<strong>{x.n}</strong><span>{x.t}</span></div>)}</div>
 <div className="section-head"><div><span className="eyebrow">YOUR COLLECTION</span><h2 className="section-heading">Saved <em>inspiration.</em></h2></div><Link href="/discover" className="text-link">Explore more <ArrowUpRight size={17}/></Link></div><ListingGrid items={saved} empty="Nothing saved yet. Tap the heart on a product, creator or event to build your collection."/><div className="small-alert" style={{marginTop:35}}>Lencana Explorer menunjukkan aktivitas penelusuran. Partisipasi acara, pekerjaan, dan kolaborasi resmi memerlukan konfirmasi penyelenggara.</div>
 </section><CmsSections path="/passport"/></>;
}
