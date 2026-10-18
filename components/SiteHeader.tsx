"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Search, X, UserRound, Sparkles, Youtube, Instagram, Compass, ShoppingBag, Palette, CalendarDays, Rocket, Building2, Milestone, Lightbulb, Images, BriefcaseBusiness, HeartHandshake, Info, Globe2, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage, type Language } from "@/lib/language";
import { navLinks } from "@/lib/data";
import { defaultBrand, defaultNavigation, useSiteSetting, isSafeLink,useLocalizedCms } from "@/lib/cms";

const navIcons: Record<string, LucideIcon> = {
 "/discover": Compass,
 "/market": ShoppingBag,
 "/creators": Palette,
 "/events": CalendarDays,
 "/startups": Rocket,
 "/spaces": Building2,
 "/future": Milestone,
 "compass":Compass,"shopping-bag":ShoppingBag,"palette":Palette,"calendar-days":CalendarDays,
 "rocket":Rocket,"building-2":Building2,"milestone":Milestone,"lightbulb":Lightbulb,
 "images":Images,"briefcase":BriefcaseBusiness,"handshake":HeartHandshake,"info":Info,"globe":Globe2
};
export function SiteHeader(){
 const path=usePathname();const [open,setOpen]=useState(false);const {language,setLanguage,ui,localize}=useLanguage();
 const localizedCms=useLocalizedCms();const branding=useSiteSetting("branding",defaultBrand);const navigation=useSiteSetting("navigation",defaultNavigation);
 const links=(navigation.links||navLinks).filter(n=>n.label&&n.href.startsWith("/")&&!n.href.startsWith("//")).slice(0,10);
 const label=(n:{label:string;href:string})=>language==="en"?localizedCms(`nav:${n.href}`,n.label):ui(n.label);
 return <>
  <div className="topline"><span className="signal"/> {ui("THE CREATIVE FUTURE STARTS HERE")} </div>
  <header className="main-header">
   <Link href="/" className="brand ktcc-logo-link" aria-label="Kutai Timur Creative Center — beranda" onClick={()=>setOpen(false)}>
    <Image src={branding.logoUrl||defaultBrand.logoUrl} alt={branding.siteName} width={240} height={64} priority unoptimized className="ktcc-logo" />
   </Link>
   <nav className="desktop-nav" aria-label="Navigasi utama">{links.map(n=>{const Icon=navIcons[n.icon||n.href]||navIcons[n.href]||Compass;return <Link key={n.href} href={n.href} aria-current={path===n.href?"page":undefined} className={`menu-with-icon ${path===n.href?"active":""}`}><span className="nav-icon-holder"><Icon size={17} strokeWidth={2.15} aria-hidden="true"/></span><span>{label(n)}</span></Link>})}</nav>
   <div className="header-actions"><LanguageSwitcher language={language} onChange={setLanguage}/><Link href="/ai" className="nav-icon" title="Creative Match AI" aria-label="Creative Match AI"><Sparkles size={19}/></Link><Link href="/discover" className="nav-icon" title="Pencarian" aria-label="Pencarian"><Search size={19}/></Link><Link href="/passport" className="nav-icon" title="Creative Passport" aria-label="Creative Passport"><UserRound size={19}/></Link><Link className="btn btn-dark header-join" href="/join">{ui("Join KTCC")} <ArrowUpRight size={17}/></Link><button aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} className="menu-toggle" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  </header>
  {open&&<div className="mobile-menu"><div className="mobile-language-row"><LanguageSwitcher language={language} onChange={setLanguage}/></div><nav>{links.map(n=>{const Icon=navIcons[n.icon||n.href]||navIcons[n.href]||Compass;return <Link key={n.href} onClick={()=>setOpen(false)} href={n.href} className="mobile-menu-link"><span className="mobile-menu-label"><span className="nav-icon-holder"><Icon size={17} aria-hidden="true"/></span>{label(n)}</span><ArrowUpRight size={16}/></Link>})}<Link href="/ai" onClick={()=>setOpen(false)}>Creative Match AI<ArrowUpRight size={16}/></Link><Link href="/dashboard" onClick={()=>setOpen(false)}>{localize("Dasbor Saya","My Dashboard")}<ArrowUpRight size={16}/></Link><Link href="/passport" onClick={()=>setOpen(false)}>{localize("Paspor Kreatif","Creative Passport")}<ArrowUpRight size={16}/></Link><Link href="/impact" onClick={()=>setOpen(false)}>KTCC Impact<ArrowUpRight size={16}/></Link></nav></div>}
 </>;
}
/** Icons for official social profiles. Without a verified CMS URL, show a non-clickable icon. */
function SocialIcon({platform}:{platform:"youtube"|"instagram"|"tiktok"|"threads"}){
 if(platform==="youtube")return <Youtube size={20} strokeWidth={2.1} aria-hidden="true"/>;
 if(platform==="instagram")return <Instagram size={19} strokeWidth={2.1} aria-hidden="true"/>;
 if(platform==="tiktok")return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.7 2c.28 2.33 1.58 3.62 4.03 3.78v3.48a8.3 8.3 0 0 1-4.02-1.3v6.26c0 4.08-3.17 7.11-7.18 7.11-3.83 0-6.89-3.03-6.89-6.89 0-4 3.2-7.13 7.19-7.13.35 0 .7.02 1.02.07v3.5a3.7 3.7 0 0 0-1.02-.15 3.7 3.7 0 0 0 0 7.4c2.05 0 3.65-1.58 3.65-3.79V2h3.23Z"/></svg>;
 return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.8 7.8C17 5.6 15.1 4.7 12 4.7c-4.3 0-6.8 2.7-6.8 7.3 0 5 2.5 7.5 6.8 7.5 4.4 0 6.6-2.3 6.6-5.5 0-3.4-2.5-5.2-6.4-5.2-3 0-4.8 1.25-4.8 3.2 0 1.6 1.32 2.65 3.15 2.65 2.85 0 5.6-2.03 5.6-4.82C16.15 7 13.9 5.1 10.65 5.1"/></svg>;
}
export function SiteFooter(){
 const brand=useSiteSetting("branding",defaultBrand);const {ui,localize,language}=useLanguage();
 const networks=(["youtube","instagram","tiktok","threads"] as const).map(platform=>({platform,url:brand[platform]||""}));
 const description=language==="en"?(brand.footerDescriptionEn?.trim()||defaultBrand.footerDescriptionEn):(brand.footerDescription?.trim()||defaultBrand.footerDescription);
 return <footer className="site-footer"><div className="container"><div className="footer-intro"><div><span className="eyebrow inverted">{ui("The Future is Local")}</span><h2>{localize("Biarkan kreativitas","Let creativity")}<br/>{localize("membawa","move")} <em>Kutim</em> {localize("maju.","forward.")}</h2></div><Link href="/join" className="btn btn-lime">{localize("Bergabung bersama kami","Join the movement")} <ArrowUpRight size={18}/></Link></div><div className="footer-bottom">
 <div className="footer-brand"><span className="footer-logo-box"><Image src={brand.logoUrl||defaultBrand.logoUrl} alt={brand.siteName} width={227} height={61} unoptimized className="footer-logo"/></span><p className="footer-description">{description}</p><div className="footer-socials" aria-label={localize("Media sosial KTCC","KTCC social media")}>{networks.map(({platform,url})=>(url.startsWith("https://")&&isSafeLink(url))?<a key={platform} href={url} className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${platform==="threads"?"Threads":platform} KTCC`} title={`${platform==="threads"?"Threads":platform} KTCC`}><SocialIcon platform={platform}/></a>:<span key={platform} className="footer-social-icon is-unlinked" aria-label={`${platform} KTCC — ${localize("tautan belum tersedia","link not configured")}`} title={`${platform} · ${localize("tautan belum tersedia","link not configured")}`}><SocialIcon platform={platform}/></span>)}</div></div>
 <div className="footer-links"><Link href="/market">{ui("Market")}</Link><Link href="/creators">{ui("Creators")}</Link><Link href="/events">{ui("Events")}</Link><Link href="/future">Kutim 2045</Link><Link href="/impact">{ui("Impact")}</Link><Link href="/stories">{ui("Stories")}</Link><Link href="/contact">{localize("Kontak","Contact")}</Link><Link href="/privacy">{localize("Privasi","Privacy")}</Link><Link href="/terms">{localize("Ketentuan","Terms")}</Link></div>
 <p className="footer-legal">{brand.footerText}{brand.contactEmail&&<><br/><a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a></>}</p>
 </div></div></footer>
}

function FlagIcon({country}:{country:Language}){return country==="id"?
 <svg viewBox="0 0 24 16" aria-hidden="true" className="ktcc-flag"><rect width="24" height="16" rx="2" fill="#fff"/><path d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6H0z" fill="#ed1c24"/></svg>:
 <svg viewBox="0 0 24 16" aria-hidden="true" className="ktcc-flag"><rect width="24" height="16" rx="2" fill="#fff"/>{Array.from({length:7},(_,i)=><rect key={i} y={i*2.35} width="24" height="1.18" fill="#b22234"/>)}<rect width="10" height="8.5" fill="#3c3b6e"/><path d="M2 2h1v1H2zM5 2h1v1H5zM8 2h1v1H8zM3.5 4.3h1v1h-1zM6.5 4.3h1v1h-1zM2 6.5h1v1H2zM5 6.5h1v1H5zM8 6.5h1v1H8z" fill="#fff"/></svg>
}
function LanguageSwitcher({language,onChange}:{language:Language;onChange:(next:Language)=>void}){
 return <div className="ktcc-language-switch" role="group" aria-label="Pilih bahasa / Select language">
  {(["id","en"] as Language[]).map(lang=><button key={lang} type="button" className={`ktcc-language-option ${language===lang?"selected":""}`} aria-label={lang==="id"?"Bahasa Indonesia":"English (United States)"} aria-pressed={language===lang} onClick={()=>onChange(lang)}><FlagIcon country={lang}/><span>{lang.toUpperCase()}</span></button>)}
 </div>
}
