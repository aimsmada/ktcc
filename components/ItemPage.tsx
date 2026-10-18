"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { ArrowLeft, ArrowUpRight, Heart, Share2, MapPin, CalendarDays, ExternalLink, CalendarPlus, CheckCircle2 } from "lucide-react";
import { useCatalog } from "@/lib/useCatalog";
import { kindLabel,currency,prettyDate } from "@/lib/data";
import { readState,toggleFavorite,downloadEventICS } from "@/lib/client-store";
import { sendEngagement } from "@/lib/engagements";
import { MediaDisplay } from "@/components/CmsSections";
import {useLocalizedCms} from "@/lib/cms";
import {useLanguage} from "@/lib/language";
export default function ItemPage(){
 const l=useLocalizedCms();const {language,localize}=useLanguage();
 const params=useParams();const slug=Array.isArray(params.slug)?params.slug[0]:params.slug;const {items,mode}=useCatalog();
 const item=items.find(x=>x.slug===slug);
 const [liked,setLiked]=useState(false);const [success,setSuccess]=useState("");const [message,setMessage]=useState("");const [bookDate,setBookDate]=useState("");const [slot,setSlot]=useState("09:00–11:00");const [sending,setSending]=useState(false);
 useEffect(()=>{if(item)setLiked(readState().favorites.includes(item.id))},[item]);
 if(!item)return <div className="container" style={{paddingTop:100,paddingBottom:100}}><h1>{mode==="loading"?"Memuat konten...":"Konten tidak ditemukan."}</h1><p>{mode==="loading"?"Sebentar, katalog sedang diperbarui.":"Konten mungkin telah diarsipkan atau tautannya berubah."}</p><Link className="btn btn-dark" href="/discover">Kembali ke Discover</Link></div>;
 const request=async(type:"event_registration"|"space_enquiry"|"collaboration")=>{
  setSending(true);setSuccess("");try{
   const result=await sendEngagement({listingId:item.id,type,message:message||`Tertarik dengan ${item.title}`,date:bookDate,slot});
   setSuccess(result);setMessage("");
  }catch(e){setSuccess(e instanceof Error?e.message:"Gagal mengirim permintaan.")}
  finally{setSending(false)}
 };
 return <div className="container"><div className="detail-layout"><div><Link className="back-link" href={item.kind==="initiative"?"/future":"/discover"}><ArrowLeft size={17}/> Kembali</Link><div className="detail-art"><Image src={item.image||"/visuals/art.svg"} alt={item.mediaAlt||item.title} fill unoptimized sizes="(max-width:700px) 94vw, 48vw" style={{objectFit:"cover"}}/></div>{item.videoUrl&&<div className="cms-detail-video"><MediaDisplay url={item.videoUrl} type="video" alt={`Video ${item.title}`}/></div>}{Boolean(item.gallery?.length)&&<div className="cms-detail-gallery">{item.gallery?.map((url,i)=><MediaDisplay key={i} url={url} alt={`${item.title}, galeri ${i+1}`}/>)}</div>}<div className="chip-row" style={{marginTop:18}}>{(item.tags||[]).map(t=><span key={t} className="chip chip-soft">{t}</span>)}</div></div>
 <div className="detail-copy"><span className="eyebrow">{kindLabel[item.kind]} · KUTAI TIMUR CREATIVE CENTER</span><h1>{l(`listing:${item.id}:title`,item.title)}</h1><p className="detail-sub">{l(`listing:${item.id}:subtitle`,item.subtitle)}</p><div className="listing-subline" style={{fontSize:13}}><span><MapPin size={16}/>{item.location}</span>{item.date&&<span><CalendarDays size={16}/>{prettyDate(item.date)}</span>}</div>
 <p style={{marginTop:27}}>{l(`listing:${item.id}:description`,item.description)}</p>{item.story&&<div className="story-box"><h3>{item.kind==="startup"?localize("Tentang startup","About the startup"):localize("Kenali pembuat karya","Meet the maker")}</h3><p>{l(`listing:${item.id}:story`,item.story)}</p></div>}
 {item.kind==="digital"&&item.license&&<div className="story-box"><h3>Lisensi</h3><p>{item.license}</p></div>}
 {item.kind==="startup"&&<div className="story-box"><h3>Startup profile</h3><p>Stage: {item.stage||"Informasi belum tersedia"}. {(item.tags||[]).join(", ")}</p></div>}
 {item.kind==="space"&&<div className="story-box"><h3>Fasilitas & jadwal</h3><p>Kapasitas: {item.capacity||"Hubungi pengelola"} orang. Jam operasional: {item.openingHours||"Hubungi pengelola"}. Ketersediaan dikonfirmasi oleh pengelola.</p></div>}
 {item.socialUrl?.startsWith("https://")&&<div className="small-alert"><a href={item.socialUrl} target="_blank" rel="noopener noreferrer">Kunjungi profil / portofolio ↗</a></div>}
 {item.kind==="initiative"&&item.sourceUrl?.startsWith("https://")&&<div className="small-alert"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Lihat sumber resmi inisiatif ↗</a></div>}
 {item.price!=null&&<div className="detail-price">{currency(item.price)}</div>}
 {item.purchaseUrl?.startsWith("https://")&&<div className="detail-actions"><a href={item.purchaseUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Lihat di toko penjual <ExternalLink size={16}/></a></div>}
 <div className="detail-actions"><button className="btn btn-dark" onClick={()=>{setLiked(toggleFavorite(item.id));setSuccess(liked?"Dihapus dari favorit perangkat ini.":"Disimpan pada favorit perangkat ini.")}}><Heart size={17} fill={liked?"currentColor":"none"}/>{liked?"Tersimpan":"Simpan favorit"}</button><button className="btn btn-outline" onClick={async()=>{try{await navigator.clipboard.writeText(window.location.href);setSuccess("Tautan disalin.")}catch{setSuccess("Salin URL halaman melalui browser Anda.")}}}><Share2 size={16}/>Bagikan</button>{item.kind==="event"&&item.date&&<button className="btn btn-plain" onClick={()=>downloadEventICS(item.title,item.date!,item.location)}><CalendarPlus size={16}/> Tambah ke kalender</button>}</div>
 {item.kind==="event"&&<div className="action-panel"><h3>Registrasi acara</h3><p>Kirim permintaan registrasi ke KTCC. Status keikutsertaan atau tiket harus dikonfirmasi oleh penyelenggara.</p><button className="btn btn-dark" disabled={sending} onClick={()=>void request("event_registration")}>{sending?"Mengirim...":"Ajukan registrasi"}<ArrowUpRight size={16}/></button></div>}
 {item.kind==="space"&&<div className="action-panel"><h3>Permintaan penggunaan ruang</h3><p>Ajukan jadwal yang diinginkan. Tidak ada pemesanan otomatis sebelum disetujui pengelola ruang.</p><label className="field-label">Tanggal pilihan</label><input className="field" value={bookDate} onChange={e=>setBookDate(e.target.value)} type="date" min={new Date().toISOString().slice(0,10)}/><label className="field-label">Sesi</label><select className="field" value={slot} onChange={e=>setSlot(e.target.value)}><option>09:00–11:00</option><option>11:00–13:00</option><option>14:00–16:00</option><option>16:00–18:00</option></select><button className="btn btn-dark" disabled={!bookDate||sending} onClick={()=>void request("space_enquiry")}>Kirim permintaan</button></div>}
 {["creator","startup","product","digital","community","opportunity"].includes(item.kind)&&<div className="action-panel"><h3>{item.kind==="creator"?"Hire / Kolaborasi":item.kind==="startup"?"Mulai kemitraan":"Hubungi pemilik karya"}</h3><p>Pesan Anda akan diterima oleh pengelola KTCC untuk tindak lanjut.</p><textarea className="field" style={{minHeight:88,resize:"vertical"}} placeholder="Ceritakan ide atau kebutuhan Anda..." value={message} onChange={e=>setMessage(e.target.value)}/><button className="btn btn-dark" disabled={sending||!message.trim()} onClick={()=>void request("collaboration")}>Kirim permintaan <ArrowUpRight size={16}/></button></div>}
 {success&&<div className="small-alert" role="status" style={{marginTop:16}}><CheckCircle2 size={16} style={{display:"inline",marginRight:8}}/>{success} {success.includes("Masuk")&&<Link href="/login">Masuk ↗</Link>}</div>}
 </div></div></div>;
}
