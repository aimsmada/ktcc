"use client";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { navLinks } from "@/lib/data";
import { useLanguage } from "@/lib/language";

export type PageCopy = {
 path: string; eyebrow: string; title: string; accent: string; description: string;
 hero_media_url: string; hero_media_type: "image" | "video" | "gif";
 seo_title: string; seo_description: string; published: boolean;
};
export type Section = {
 id: string; page_path: string; section_type: "text" | "feature" | "image" | "video" | "gallery" | "cta" | "quote" | "embed";
 eyebrow:string; title:string; body:string; media_url:string; media_alt:string; action_label:string;action_url:string;
 media_items:string[];sort_order:number;published:boolean;
};
export type BrandSettings = {
 siteName:string;tagline:string;logoUrl:string;footerText:string;
 footerDescription:string;footerDescriptionEn:string;
 contactEmail:string;instagram:string;youtube:string;tiktok:string;threads:string;
};
export type NavSettings={links:{label:string;href:string;icon?:string}[]};
export type MascotSettings={heroImage:string;profileImage:string;name:string;subtitle:string};
export const defaultMascot:MascotSettings={heroImage:"/mascot/cece-hero.png",profileImage:"/mascot/cece-about.png",name:"Meet Cece!",subtitle:"Maskot KTCC."};
export type AppearanceSettings={green:string;blue:string;purple:string;red:string;yellow:string;navy:string;surface:string};
export const defaultAppearance:AppearanceSettings={green:"#14b839",blue:"#079ef3",purple:"#a12bec",red:"#ff2e52",yellow:"#ffc009",navy:"#102c63",surface:"#ffffff"};
export const defaultBrand:BrandSettings={
 siteName:"Kutai Timur Creative Center",tagline:"Kutim First — Kaltim Connected — Global Ready",
 logoUrl:"/brand/ktcc-logo.webp",footerText:"© 2026 KTCC. All rights reserved.",
 footerDescription:"Platform Digital Terintegrasi untuk Akselerasi Ekonomi Kreatif, Pemberdayaan Talenta Lokal, dan Transformasi Ekonomi Kutai Timur Menuju 2045",
 footerDescriptionEn:"An Integrated Digital Platform to Accelerate the Creative Economy, Empower Local Talent, and Transform Kutai Timur’s Economy Toward 2045",
 contactEmail:"",instagram:"",youtube:"",tiktok:"",threads:""
};
export const defaultNavigation:NavSettings={links:navLinks};
/** Stable IDs for sections built into the KTCC homepage. Admin may hide/show each one. */
export const homeSectionLabels:Record<string,string>={
 hero:"Hero — The Future is Local",
 introduction:"Pengantar KTCC",
 cece:"Profil maskot Cece",
 ceceTicker:"Running text KUTIM HEBAT 2045",
 statistics:"Statistik ekosistem",
 ecosystem:"Discover / Match / Future",
 trending:"Trending in Kutim",
 market:"Made in Kutim",
 events:"Event kreatif",
 vision:"Kutim 2045 — visi",
 creators:"Profil kreator",
 stories:"Creative Journal",
 impact:"Dampak dan kolaborasi",
 ticker:"Running text / filosofi KTCC"
};
export type HomeLayoutSettings={visible:Record<string,boolean>};
export const defaultHomeLayout:HomeLayoutSettings={visible:Object.fromEntries(Object.keys(homeSectionLabels).map(key=>[key,true]))};
export type VerifiedImpact={transactions:number;transactionEvidence:string;jobs:number;jobEvidence:string};
export const defaultImpact:VerifiedImpact={transactions:0,transactionEvidence:"",jobs:0,jobEvidence:""};
export const editableCopy:Record<string,string>={
 "home.introTitle":"One creative region. Unlimited possibilities.",
 "home.introDescription":"KTCC menghubungkan karya lokal dengan peluang ekonomi digital, komunitas, pasar, dan kolaborasi lintas sektor.",
 "home.ecosystemHeading":"Your creative world, all in one place.",
 "home.discoverCardTitle":"Explore what’s happening in Kutim.",
 "home.discoverCardBody":"One map. More possibilities as the ecosystem grows.",
 "home.matchCardTitle":"Good ideas find great people.",
 "home.matchCardBody":"Creative Match helps talents discover their next collaboration.",
 "home.futureCardTitle":"Build the next chapter.",
 "home.futureCardBody":"Explore verified future initiatives toward 2045.",
 "home.trendingTitle":"Trending in Kutim.",
 "home.marketTitle":"Made in Kutim.",
 "home.eventTitle":"Come together. Make things.",
 "home.visionTitle":"Creating tomorrow, together.",
 "home.visionBody":"From natural potential to creative value. Follow Kutai Timur’s long-term ambitions and verified initiatives across government and business.",
 "home.creatorsTitle":"People behind the next wave.",
 "home.storiesTitle":"Stories worth sharing.",
 "home.impactTitle":"Build. Connect. Measure.",
 "home.impactBody":"KTCC connects creative discovery to real collaboration and measurable impact.",
 "cece.title":"Cece, maskot dari Kutai Timur Creative Center.",
 "cece.description":"Cece adalah wajah kreatif KTCC: ramah, energik, kolaboratif, dan siap membawa karya lokal Kutai Timur menuju ekosistem digital yang lebih luas.",
 "cece.story":"Nama Cece merepresentasikan semangat Creative Center. Gaya visualnya memadukan nuansa muda, teknologi, dan budaya kreatif yang terbuka pada kolaborasi.",
 "cece.green":"Pertumbuhan, alam Kutai Timur, dan keberlanjutan.",
 "cece.blue":"Inovasi digital, konektivitas, dan masa depan.",
 "cece.purple":"Imajinasi, seni, dan eksplorasi ide baru.",
 "cece.red":"Energi, keberanian, dan semangat berkarya.",
 "cece.yellow":"Optimisme, peluang, dan kreativitas tanpa batas."
};
/** Language-specific public copy stored as site_settings.copy_id and .copy_en. */
export const editableCopyID:Record<string,string>={
 "home.introTitle":"Satu wilayah kreatif. Peluang tanpa batas.",
 "home.introDescription":"KTCC menghubungkan karya lokal dengan peluang ekonomi digital, komunitas, pasar, dan kolaborasi lintas sektor.",
 "home.ecosystemHeading":"Dunia kreatifmu, semua dalam satu tempat.",
 "home.discoverCardTitle":"Jelajahi yang sedang terjadi di Kutim.",
 "home.discoverCardBody":"Satu peta, semakin banyak peluang seiring berkembangnya ekosistem.",
 "home.matchCardTitle":"Ide hebat bertemu orang-orang kreatif.",
 "home.matchCardBody":"Creative Match membantumu menemukan rekan kolaborasi yang tepat.",
 "home.futureCardTitle":"Bangun babak baru Kutai Timur.",
 "home.futureCardBody":"Jelajahi inisiatif masa depan terverifikasi menuju 2045.",
 "home.trendingTitle":"Yang sedang tren di Kutim.",
 "home.marketTitle":"Karya dan produk dari Kutim.",
 "home.eventTitle":"Berkumpul, berkolaborasi, berkarya.",
 "home.visionTitle":"Ciptakan masa depan bersama.",
 "home.visionBody":"Dari potensi alam menjadi nilai kreatif. Ikuti aspirasi jangka panjang Kutai Timur dan inisiatif terverifikasi pemerintah serta dunia usaha.",
 "home.creatorsTitle":"Talenta di balik gelombang baru.",
 "home.storiesTitle":"Kisah yang layak dibagikan.",
 "home.impactTitle":"Berkarya. Terhubung. Berdampak.",
 "home.impactBody":"KTCC menghubungkan penemuan potensi kreatif dengan kolaborasi nyata dan dampak yang terukur.",
 "cece.title":"Kenali Cece, maskot Kutai Timur Creative Center.",
 "cece.description":"Cece adalah wajah kreatif KTCC: ramah, energik, kolaboratif, dan siap membawa karya lokal Kutai Timur menuju ekosistem digital yang lebih luas.",
 "cece.story":"Nama Cece mewakili semangat Creative Center. Gayanya memadukan energi generasi muda, teknologi, dan budaya kreatif yang terbuka pada kolaborasi.",
 "cece.green":"Pertumbuhan, alam Kutai Timur, dan keberlanjutan.",
 "cece.blue":"Inovasi digital, konektivitas, dan masa depan.",
 "cece.purple":"Imajinasi, seni, dan eksplorasi ide baru.",
 "cece.red":"Energi, keberanian, dan semangat berkarya.",
 "cece.yellow":"Optimisme, peluang, dan kreativitas tanpa batas."
};
export const editableCopyEN:Record<string,string>={...editableCopy,
 "cece.title":"Meet Cece, the Kutai Timur Creative Center mascot.",
 "cece.description":"Cece represents KTCC's creative spirit: friendly, energetic and collaborative, helping local talent connect to a wider digital economy.",
 "cece.story":"The name Cece embodies Creative Center. Her style brings together youth, technology, and an open, collaborative creative culture.",
 "cece.green":"Growth, Kutai Timur's nature, and sustainability.",
 "cece.blue":"Digital innovation, connectivity, and the future.",
 "cece.purple":"Imagination, art, and exploring new ideas.",
 "cece.red":"Energy, courage, and the spirit of creation.",
 "cece.yellow":"Optimism, opportunity, and boundless creativity."
};
export type CeceTickerSettings={text:string;enabled:boolean;duration:number};
export const defaultCeceTicker:CeceTickerSettings={text:"KUTIM HEBAT 2045",enabled:true,duration:25};
export const editablePaths=[
 ["/","Beranda"],["/discover","Discover"],["/market","Market"],["/digital","Digital Products"],
 ["/creators","Creators"],["/events","Events"],["/startups","Startups"],["/spaces","Spaces"],
 ["/future","Kutim 2045"],["/communities","Communities"],["/stories","Stories"],
 ["/opportunities","Opportunities"],["/ai","Creative Match"],["/impact","Impact"],
 ["/join","Join KTCC"],["/passport","Creative Passport"],["/privacy","Privasi"],["/terms","Ketentuan"],["/contact","Kontak"]
] as const;

export function useSiteSetting<T extends object>(key:"branding"|"navigation"|"copy"|"copy_id"|"copy_en"|"translations_en"|"cece_ticker"|"impact"|"appearance"|"mascot"|"home_layout",fallback:T){
 const [value,setValue]=useState<T>(fallback);
 useEffect(()=>{if(!supabase)return;let active=true;
  supabase.from("site_settings").select("value").eq("key",key).maybeSingle().then(({data})=>{
   if(active&&data?.value&&typeof data.value==="object")setValue({...fallback,...data.value} as T);
  });return()=>{active=false}
 },[key]);
 return value;
}
export function useSitePage(path:string){
 const [page,setPage]=useState<PageCopy|null>(null);const [sections,setSections]=useState<Section[]>([]);
 useEffect(()=>{if(!isSupabaseConfigured||!supabase)return;let active=true;
  (async()=>{
   const [p,s]=await Promise.all([
    supabase!.from("site_pages").select("*").eq("path",path).eq("published",true).maybeSingle(),
    supabase!.from("site_sections").select("*").eq("page_path",path).eq("published",true).order("sort_order")
   ]);
   if(active){setPage(p.data as PageCopy|null);setSections((s.data||[]) as Section[])}
  })();return()=>{active=false}
 },[path]);
 return {page,sections};
}
export function isSafeLink(link?:string){
 if(!link)return false;
 if(link.startsWith("/")&&!link.startsWith("//"))return true;
 try {const u=new URL(link);return u.protocol==="https:"}catch{return false}
}
export function safeEmbedUrl(url:string){
 try{
  const u=new URL(url);
  if(u.protocol!=="https:")return null;
  if(["youtube.com","www.youtube.com","m.youtube.com"].includes(u.hostname)){
   if(u.pathname==="/watch"&&u.searchParams.get("v"))return "https://www.youtube-nocookie.com/embed/"+encodeURIComponent(u.searchParams.get("v")!);
   if(u.pathname.startsWith("/embed/"))return "https://www.youtube-nocookie.com"+u.pathname;
  }
  if(u.hostname==="youtu.be")return "https://www.youtube-nocookie.com/embed/"+encodeURIComponent(u.pathname.slice(1));
  if(u.hostname==="player.vimeo.com"&&/^\/video\/\d+$/.test(u.pathname))return u.toString();
 }catch{}
 return null;
}

/** Existing database schema stays unchanged. English translations live in site_settings.translations_en.
 * Indonesian primary content is managed in normal CMS fields. */
export function useLocalizedCms(){
 const {language,ui}=useLanguage();
 const translations=useSiteSetting("translations_en",{} as Record<string,string>);
 return (key:string,source:string)=>language==="en"?(translations[key]?.trim()||source):ui(source);
}
