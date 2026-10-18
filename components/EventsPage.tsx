"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import { useMemo,useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MapPinned, List, LayoutGrid } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { type Listing, prettyDate } from "@/lib/data";
import { ListingGrid } from "@/components/ListingCard";
import ExploreMap from "@/components/ExploreMap";
import {useLanguage} from "@/lib/language";
const weekdays=["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
export default function EventsPage(){
 const {language,localize}=useLanguage();const {items}=useCatalog();const evs=items.filter(x=>x.kind==="event"&&x.date).sort((a,b)=>a.date!.localeCompare(b.date!));
 const [view,setView]=useState<"cards"|"calendar"|"map">("cards");const [month,setMonth]=useState(1);const [year,setYear]=useState(2027);const [cat,setCat]=useState("all");
 const filtered=evs.filter(x=>cat==="all"||x.category===cat);
 const days=new Date(year,month+1,0).getDate();const start=(new Date(year,month,1).getDay()+6)%7;
 const change=(step:number)=>{const d=new Date(year,month+step,1);setYear(d.getFullYear());setMonth(d.getMonth())};
 const monthName=new Intl.DateTimeFormat(language==="id"?"id-ID":"en-US",{month:"long",year:"numeric"}).format(new Date(year,month,1));
 const cats=[...new Set(evs.map(x=>x.category))];
 return <><CmsHero path="/events" eyebrow={localize("KALENDER KREATIF KTCC","KTCC CREATIVE CALENDAR")} title={localize("Mari wujudkan","Let’s make")} accent={localize("karya bersama.","something happen.")} description={localize("Festival, lokakarya, dan acara yang mempertemukan ekosistem kreatif.","Festivals, workshops, meetups and events that bring the creative ecosystem together.")}/>
 <section className="container directory-area"><div className="event-toolbar"><div className="seg-control"><button className={view==="cards"?"active":""} onClick={()=>setView("cards")}><LayoutGrid size={14} style={{display:"inline",marginRight:5}}/>{localize("Kartu","Cards")}</button><button className={view==="calendar"?"active":""} onClick={()=>setView("calendar")}><CalendarDays size={14} style={{display:"inline",marginRight:5}}/>{localize("Kalender","Calendar")}</button><button className={view==="map"?"active":""} onClick={()=>setView("map")}><MapPinned size={14} style={{display:"inline",marginRight:5}}/>{localize("Peta","Map")}</button></div><select className="filter-select" value={cat} onChange={e=>setCat(e.target.value)} aria-label="Filter acara"><option value="all">{localize("Semua jenis acara","All event types")}</option>{cats.map(x=><option key={x}>{x}</option>)}</select></div>
 {view==="cards"?<ListingGrid items={filtered}/>:view==="map"?<ExploreMap items={filtered}/>:<div className="calendar-card"><div className="calendar-title"><button className="btn btn-plain" onClick={()=>change(-1)} aria-label="Bulan sebelumnya"><ArrowLeft size={18}/></button><span>{monthName}</span><button className="btn btn-plain" onClick={()=>change(1)} aria-label="Bulan berikutnya"><ArrowRight size={18}/></button></div><div className="calendar-grid">{weekdays.map(x=><span key={x}>{x}</span>)}{Array.from({length:start},(_,i)=><div key={'pad-'+i} className="calendar-day muted-day"/>)}{Array.from({length:days},(_,i)=>{
 const iso=`${year}-${String(month+1).padStart(2,"0")}-${String(i+1).padStart(2,"0")}`;const events=filtered.filter(x=>x.date===iso);
 return <div key={iso} className={`calendar-day ${events.length?"has-event":""}`}>{i+1}{events.map(e=><Link key={e.id} href={`/item/${e.slug}`} title={e.title}><b>{e.title}</b></Link>)}</div>
 })}</div></div>}
 
 </section><CmsSections path="/events"/></>;
}
