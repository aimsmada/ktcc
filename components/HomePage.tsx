"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Compass, Lightbulb, Rocket, ChartNoAxesCombined, Boxes } from "lucide-react";
import { CmsSections, MediaDisplay } from "@/components/CmsSections";
import { useSitePage,useSiteSetting,useLocalizedCms,editableCopy,editableCopyID,editableCopyEN,defaultMascot,defaultHomeLayout,homeSectionLabels } from "@/lib/cms";
import HeroSearch from "@/components/HeroSearch";
import { ListingCard } from "@/components/ListingCard";
import { useCatalog } from "@/lib/useCatalog";
import { kindLabel, type Kind } from "@/lib/data";
import CeceRunningText from "@/components/CeceRunningText";
import { useLanguage } from "@/lib/language";

const fade={initial:{opacity:0,y:19},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.12},transition:{duration:.55}};
function SectionTitle({kicker,title,href,link="View all"}:{kicker:string;title:React.ReactNode;href?:string;link?:string}){
 return <div className="section-head"><div><span className="eyebrow">{kicker}</span><h2 className="section-heading">{title}</h2></div>{href&&<Link className="text-link" href={href}>{link}<ArrowUpRight size={17}/></Link>}</div>
}
export default function Home(){
 const {items,mode}=useCatalog();const {page}=useSitePage("/");const {language,ui,localize}=useLanguage();const l=useLocalizedCms();
 const copyID=useSiteSetting("copy_id",editableCopyID);const copyEN=useSiteSetting("copy_en",editableCopyEN);const copy=language==="id"?copyID:copyEN;const mascot=useSiteSetting("mascot",defaultMascot);const homeLayout=useSiteSetting("home_layout",defaultHomeLayout);
 const customHero=page?.hero_media_url;
 const count=(kind:Kind)=>items.filter(x=>x.kind===kind).length;
 const counts=[{n:count("product")+count("digital"),l:ui("Creative Products")},{n:count("creator"),l:ui("Creators")},{n:count("community"),l:ui("Communities")},{n:count("startup"),l:ui("Startups")},{n:count("space"),l:ui("Creative Spaces")},{n:count("event"),l:ui("Upcoming Events")}];
 const featured=items.filter(x=>x.featured).slice(0,4);
 const hiddenSections=Object.keys(homeSectionLabels).filter(id=>homeLayout.visible?.[id]===false);
 return <>
  <style>{hiddenSections.map(id=>`[data-ktcc-home="${id}"]{display:none!important}`).join("\n")}</style>
  <section data-ktcc-home="hero" className="hero-section"><div className="container hero-main"><motion.div className="hero-copy" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.65}}><div className="hero-kicker"><span/>{page?.eyebrow?l("page:/:eyebrow",page.eyebrow):localize("EKONOMI KREATIF · KALIMANTAN TIMUR · 2045","CREATIVE ECONOMY · EAST KALIMANTAN · 2045")}</div><h1 className="hero-title"><span className="title-line">{page?.title?l("page:/:title",page.title):ui("The future")}</span><span className="italic-line">{page?.accent?l("page:/:accent",page.accent):ui("is local")}<span style={{fontFamily:"Inter, sans-serif",fontStyle:"normal"}}>.</span></span></h1><p className="hero-description">{page?.description?l("page:/:description",page.description):localize("Temukan karya, talenta, bisnis, acara, ruang kolaborasi, dan peluang baru dari Kutai Timur.","Where local creativity meets the future economy. Discover products, creators, businesses, events, spaces, and new opportunities from Kutai Timur.")}</p><HeroSearch/></motion.div><motion.div className="hero-visual cece-hero-visual" initial={{opacity:0,scale:.94,x:20}} animate={{opacity:1,scale:1,x:0}} transition={{duration:.8,delay:.12}}>
   <div className="cece-ambient cece-ambient-blue" aria-hidden="true"/><div className="cece-ambient cece-ambient-purple" aria-hidden="true"/>
   <div className="cece-orbit-shapes" aria-hidden="true"><i className="cece-orbit-shape cece-orbit-circle"/><i className="cece-orbit-shape cece-orbit-diamond"/><i className="cece-orbit-shape cece-orbit-hex"/><i className="cece-orbit-shape cece-orbit-star"/><i className="cece-orbit-shape cece-orbit-triangle"/></div>
   <div className="cece-stage">
    {customHero?
     <MediaDisplay url={customHero} type={page?.hero_media_type} alt={page?.title||"Visual KTCC"} className="cece-hero-custom-image"/>:
     <MediaDisplay url={mascot.heroImage} alt="Cece, maskot Kutai Timur Creative Center" className="cece-hero-image"/>}
   </div>
   <div className="cece-caption" aria-label="Kenali Cece, maskot KTCC"><span className="cece-caption-spark">✳</span><span><strong>{l("mascot:name",mascot.name)}</strong><small>{l("mascot:subtitle",mascot.subtitle)}</small></span></div>
   <div className="cece-color-dots" aria-hidden="true"><i/><i/><i/><i/><i/></div>
  </motion.div></div></section>
  <div className="hero-underbar"><div className="container"><strong>{ui("Explore a different future for Kutai Timur ↗")}</strong><div className="ticker"><span>DISCOVER</span><i/><span>CREATE</span><i/><span>CONNECT</span><i/><span>GROW</span></div></div></div>
  <div data-ktcc-home="introduction" className="intro-strip"><div className="container"><strong>{copy["home.introTitle"]}</strong><p>{copy["home.introDescription"]}</p></div></div>
  <CeceRunningText/>
  <section data-ktcc-home="cece" className="section-small cece-story-section">
   <div className="container">
    <div className="cece-story-card">
     <div className="cece-story-visual">
      <MediaDisplay url={mascot.profileImage} alt="Cece, maskot Kutai Timur Creative Center" className="cece-story-image"/>
     </div>
     <div className="cece-story-copy">
      <span className="eyebrow">{ui("MEET CECE")}</span>
      <h2 className="section-heading">{copy["cece.title"]}</h2>
      <p>{copy["cece.description"]}</p>
      <p>{copy["cece.story"]}</p>
      <div className="cece-traits">
       <div className="cece-trait cece-trait-green"><span className="cece-trait-badge cece-shape-circle" aria-hidden="true"/><div><strong>Hijau</strong><span>{copy["cece.green"]}</span></div></div>
       <div className="cece-trait cece-trait-blue"><span className="cece-trait-badge cece-shape-diamond" aria-hidden="true"/><div><strong>Biru</strong><span>{copy["cece.blue"]}</span></div></div>
       <div className="cece-trait cece-trait-purple"><span className="cece-trait-badge cece-shape-hex" aria-hidden="true"/><div><strong>Ungu</strong><span>{copy["cece.purple"]}</span></div></div>
       <div className="cece-trait cece-trait-red"><span className="cece-trait-badge cece-shape-triangle" aria-hidden="true"/><div><strong>Merah</strong><span>{copy["cece.red"]}</span></div></div>
       <div className="cece-trait cece-trait-yellow"><span className="cece-trait-badge cece-shape-star" aria-hidden="true"/><div><strong>Kuning</strong><span>{copy["cece.yellow"]}</span></div></div>
      </div>
     </div>
    </div>
   </div>
  </section>
  <div data-ktcc-home="statistics" className="stat-grid" aria-label="Statistik katalog">{counts.map((x,i)=><div className="stat" key={x.l}><motion.b initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}>{x.n.toString().padStart(2,"0")}</motion.b><small>{x.l}</small></div>)}</div>
  <section data-ktcc-home="ecosystem" className="section"><div className="container"><SectionTitle kicker={ui("THE ECOSYSTEM")} title={<>{copy["home.ecosystemHeading"]}</>}/><div className="feature-bento"><Link href="/discover" className="bento-dark"><div className="bento-shape"/><div className="bento-icon"><Compass size={24}/></div><div><span className="bento-badge">01 / DISCOVER <ArrowUpRight size={14}/></span><h3 style={{marginTop:19}}>{copy["home.discoverCardTitle"]}</h3><p>{copy["home.discoverCardBody"]}</p></div></Link><Link href="/ai" className="bento-peach"><div className="bento-shape orange"/><div className="bento-icon"><Lightbulb size={24}/></div><div><span className="bento-badge">02 / MATCH</span><h3 style={{marginTop:19}}>{copy["home.matchCardTitle"]}</h3><p>{copy["home.matchCardBody"]}</p></div></Link><Link href="/future" className="bento-blue"><div className="bento-shape cyan"/><div className="bento-icon"><Rocket size={24}/></div><div><span className="bento-badge">03 / FUTURE</span><h3 style={{marginTop:19}}>{copy["home.futureCardTitle"]}</h3><p>{copy["home.futureCardBody"]}</p></div></Link></div></div></section>
  <section data-ktcc-home="trending" className="section-small" style={{background:"#f2f5ee"}}><div className="container"><SectionTitle kicker={ui("CURATED FOR YOU")} title={<>{copy["home.trendingTitle"]}</>} href="/discover" link={ui("Explore all")}/><div className="listing-grid">{featured.length?featured.map(x=><ListingCard key={x.id} item={x}/>):<p className="muted">Belum ada konten unggulan.</p>}</div></div></section>
  <section data-ktcc-home="market" className="section"><div className="container"><SectionTitle kicker={ui("LOCAL MAKERS, BIG IDEAS")} title={<>{copy["home.marketTitle"]}</>} href="/market" link="Explore marketplace"/><div className="listing-grid">{items.filter(x=>x.kind==="product").slice(0,4).map(x=><ListingCard item={x} key={x.id}/>)}</div><div style={{marginTop:27,textAlign:"center"}}><Link href="/market" className="btn btn-outline">Discover local products <ArrowRight size={16}/></Link></div></div></section>
  <section data-ktcc-home="events" className="section-small" style={{background:"#edf2e7"}}><div className="container"><SectionTitle kicker={ui("WHAT'S NEXT")} title={<>{copy["home.eventTitle"]}</>} href="/events" link={ui("View calendar")}/><div className="listing-grid">{items.filter(x=>x.kind==="event").slice(0,4).map(x=><ListingCard item={x} key={x.id}/>)}</div></div></section>
  <section data-ktcc-home="vision" className="section"><div className="container"><motion.div {...fade} className="vision-panel"><div className="vision-info"><span className="eyebrow inverted">OUR VISION / KUTIM 2045</span><h2>{copy["home.visionTitle"]}</h2><p>{copy["home.visionBody"]}</p><Link href="/future" className="btn btn-lime">Explore Kutim 2045 <ArrowUpRight size={18}/></Link></div><div className="vision-graphic"><span className="vision-floating">A MORE CREATIVE FUTURE ↗</span></div></motion.div></div></section>
  <section data-ktcc-home="creators" className="section-small" style={{background:"#fff"}}><div className="container"><SectionTitle kicker={ui("MEET THE ECOSYSTEM")} title={<>{copy["home.creatorsTitle"]}</>} href="/creators" link={ui("Meet creators")}/><div className="listing-grid">{items.filter(x=>x.kind==="creator").slice(0,4).map(x=><ListingCard key={x.id} item={x}/>)}</div></div></section>
  <section data-ktcc-home="stories" className="section"><div className="container"><SectionTitle kicker={ui("CREATIVE JOURNAL")} title={<>{copy["home.storiesTitle"]}</>} href="/stories" link={ui("Read all stories")}/><div className="listing-grid">{items.filter(x=>x.kind==="article").slice(0,3).map(x=><ListingCard key={x.id} item={x}/>)}</div></div></section>
  <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">MORE THAN A WEBSITE</span><h2 className="section-heading">{copy["home.impactTitle"]}</h2><p className="subheading" style={{marginTop:18}}>{copy["home.impactBody"]}</p></div></div><div className="feature-bento"><Link href="/startups" className="bento-blue"><div className="bento-icon"><Rocket/></div><div><h3>Start something meaningful.</h3><p>Meet local startups and explore bold new ideas.</p></div></Link><Link href="/spaces" className="bento-peach"><div className="bento-icon"><Boxes/></div><div><h3>Find space to create.</h3><p>Discover coworking, studios and creative facilities.</p></div></Link><Link href="/impact" className="bento-dark"><div className="bento-icon"><ChartNoAxesCombined/></div><div><h3>Ideas are good. Impact is better.</h3><p>Explore the metrics that will make real impact visible.</p></div></Link></div></div></section>
  <div data-ktcc-home="ticker" className="marquee-bar">✳ KUTIM FIRST &nbsp;•&nbsp; KALTIM CONNECTED &nbsp;•&nbsp; GLOBAL READY ✳</div>
 <CmsSections path="/"/></>;
}
