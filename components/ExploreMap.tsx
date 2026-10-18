"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Listing } from "@/lib/data";
const emojis:Record<string,string>={product:"🛍",digital:"🎨",creator:"✳",event:"🎟",startup:"🚀",space:"⌂",community:"☘",opportunity:"✦",initiative:"◉"};
export default function ExploreMap({items}:{items:Listing[]}){
 const mapNode=useRef<HTMLDivElement|null>(null);
 useEffect(()=>{
  if(!mapNode.current)return;
  let disposed=false;
  let instance:import("leaflet").Map|undefined;
  (async()=>{
   const L=await import("leaflet");
   if(disposed||!mapNode.current)return;
   instance=L.map(mapNode.current,{scrollWheelZoom:false,zoomControl:false}).setView([0.38,117.7],8);
   L.control.zoom({position:"bottomright"}).addTo(instance);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(instance);
   items.filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng)).forEach(item=>{
    const icon=L.divIcon({className:"",html:`<div class="map-pin"><span>${emojis[item.kind]||"✳"}</span></div>`,iconSize:[34,34],iconAnchor:[17,30]});
    const popup=document.createElement("div");
    const h=document.createElement("strong");h.textContent=item.title;popup.appendChild(h);
    const p=document.createElement("p");p.textContent=`${item.category} · ${item.district} · ilustrasi lokasi kecamatan`;popup.appendChild(p);
    const link=document.createElement("a");link.href=`/item/${encodeURIComponent(item.slug)}`;link.textContent="Buka profil ↗";popup.appendChild(link);
    L.marker([item.lat!,item.lng!],{icon}).addTo(instance!).bindPopup(popup);
   });
  })();
  return ()=>{disposed=true;if(instance)instance.remove()};
 },[items]);
 const positioned=items.filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng));
 return <div className="map-section"><div className="map-wrap"><div className="map-el" ref={mapNode} aria-label="Peta interaktif ekosistem Kutai Timur"/><div className="map-caption">Lokasi berasal dari koordinat yang diberikan dan dipublikasikan pengelola konten KTCC.</div></div><div className="pulse-panel"><span className="eyebrow">LIVE ECOSYSTEM EXPLORER</span><h3>Creative Pulse <span style={{color:"#479368"}}>↗</span></h3><p className="subheading">Explore where creators, businesses and events could connect across Kutai Timur.</p><div className="pulse-stats"><div><strong>{positioned.length.toString().padStart(2,"0")}</strong><small>Locations on map</small></div><div><strong>{new Set(items.map(x=>x.district)).size}</strong><small>Districts represented</small></div><div><strong>{items.filter(x=>x.kind==="creator").length}</strong><small>Creators</small></div><div><strong>{items.filter(x=>x.kind==="space").length}</strong><small>Creative spaces</small></div></div><span className="eyebrow">DISCOVER MORE</span><div className="map-list"><Link href="/creators">Meet creators <ArrowUpRight size={14}/></Link><Link href="/spaces">Find spaces <ArrowUpRight size={14}/></Link><Link href="/events">Explore events <ArrowUpRight size={14}/></Link></div><p className="caption-small" style={{marginTop:19}}>Peta memerlukan koneksi internet. Verifikasi lokasi sebelum melakukan kunjungan.</p></div></div>
}
