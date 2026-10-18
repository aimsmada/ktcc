"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, MapPin, CalendarDays, BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { Listing, currency, kindLabel, prettyDate } from "@/lib/data";
import { readState,toggleFavorite } from "@/lib/client-store";
import { useLocalizedCms } from "@/lib/cms";
import { useLanguage } from "@/lib/language";
export function ListingCard({item,compact=false}:{item:Listing;compact?:boolean}){
 const [liked,setLiked]=useState(false);const l=useLocalizedCms();const {localize}=useLanguage();
 useEffect(()=>{const cb=()=>setLiked(readState().favorites.includes(item.id));cb();window.addEventListener("ktcc-store-update",cb);return ()=>window.removeEventListener("ktcc-store-update",cb)},[item.id]);
 return <article className={`listing-card ${compact?"listing-compact":""}`}>
   <div className="listing-photo"><Link href={`/item/${item.slug}`} aria-label={`Detail ${item.title}`}><Image src={item.image||"/visuals/art.svg"} alt={item.mediaAlt||item.title} unoptimized fill sizes="(max-width:768px) 85vw, (max-width:1200px) 48vw, 30vw" className="cover-img"/></Link><span className="card-category">{kindLabel[item.kind]}</span><button type="button" className={`heart-btn ${liked?"heart-active":""}`} title={liked?"Hapus favorit":"Simpan favorit"} aria-label={liked?`Hapus ${item.title} dari favorit`:`Favoritkan ${item.title}`} onClick={()=>setLiked(toggleFavorite(item.id))}><Heart size={17} fill={liked?"currentColor":"none"}/></button></div>
   <div className="listing-info"><div className="listing-subline"><span><MapPin size={12}/>{item.district}</span>{item.kind==="event"&&item.date?<span><CalendarDays size={12}/>{prettyDate(item.date)}</span>:item.kind==="startup"?<span><BriefcaseBusiness size={12}/>{item.stage}</span>:null}</div>
   <Link href={`/item/${item.slug}`} className="listing-title">{l(`listing:${item.id}:title`,item.title)}<ArrowUpRight size={18}/></Link><p>{l(`listing:${item.id}:subtitle`,item.subtitle)}</p><div className="listing-bottom">{item.price!=null?<strong>{currency(item.price)}</strong>:<span className="tag-simple">{item.category}</span>}<span className="listing-arrow">{localize("Jelajahi ↗","Explore ↗")}</span></div></div>
 </article>
}
export function ListingGrid({items,empty="Belum ada konten pada kategori ini."}:{items:Listing[];empty?:string}){return items.length?<div className="listing-grid">{items.map(x=><ListingCard key={x.id} item={x}/>)}</div>:<div className="empty-state">{empty}</div>}
