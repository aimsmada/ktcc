"use client";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { useSitePage,isSafeLink,safeEmbedUrl,type Section,type PageCopy,useLocalizedCms } from "@/lib/cms";

export function MediaDisplay({url,alt="",type="image",className=""}:{url:string;alt?:string;type?:string;className?:string}){
 if(!url || !(url.startsWith("/")&&!url.startsWith("//")||isSafeLink(url)))return null;
 if(type==="video"||/\.(mp4|webm)(\?.*)?$/i.test(url))return <video className={className} src={url} controls playsInline preload="metadata" aria-label={alt||"Video KTCC"}/>;
 return <img className={className} src={url} alt={alt} loading="lazy"/>;
}
const editorialCover:Record<string,string> = {
 "/discover":"/visuals/hero-discover.webp", "/market":"/visuals/hero-market.webp", "/digital":"/visuals/hero-digital.webp",
 "/creators":"/visuals/hero-creators.webp", "/events":"/visuals/hero-events.webp", "/startups":"/visuals/hero-startups.webp",
 "/spaces":"/visuals/hero-spaces.webp", "/future":"/visuals/hero-future.webp", "/stories":"/visuals/hero-stories.webp",
 "/impact":"/visuals/hero-impact.webp", "/communities":"/visuals/hero-discover.webp", "/opportunities":"/visuals/hero-discover.webp"
};
export function CmsHero({path,eyebrow,title,accent,description}:{path:string;eyebrow:string;title:string;accent?:string;description:string}){
 const {page}=useSitePage(path);const l=useLocalizedCms();
 if(page&&!page.published)return null;
 return <section className="page-hero cms-page-hero"><div className="container cms-hero-layout"><div><span className="eyebrow">{l(`page:${path}:eyebrow`,page?.eyebrow||eyebrow)}</span><h1>{l(`page:${path}:title`,page?.title||title)} {(page?.accent||accent)&&<em className="cms-hero-accent">{l(`page:${path}:accent`,page?.accent||accent||"")}</em>}</h1><p>{l(`page:${path}:description`,page?.description||description)}</p></div>{(page?.hero_media_url||editorialCover[path])&&<div className="cms-hero-visual"><MediaDisplay url={page?.hero_media_url||editorialCover[path]} type={page?.hero_media_type} alt={page?.title||title}/></div>}</div></section>;
}
function Action({href,label}:{href:string;label:string}){return isSafeLink(href)?<Link className="btn btn-dark" href={href}>{label} <ArrowUpRight size={16}/></Link>:null}
function Block({block:b}:{block:Section}){
 const l=useLocalizedCms();const tr=(field:string,value:string)=>l(`section:${b.id}:${field}`,value);
 const media=b.media_url ? <MediaDisplay url={b.media_url} type={b.section_type==="video"?"video":"image"} alt={b.media_alt||b.title}/> : null;
 if(b.section_type==="embed"){
  const src=safeEmbedUrl(b.media_url);return <article className="cms-render-section"><div className="container"><span className="eyebrow">{tr("eyebrow",b.eyebrow)}</span><h2>{tr("title",b.title)}</h2>{b.body&&<p>{tr("body",b.body)}</p>}{src&&<iframe loading="lazy" className="cms-video-embed" src={src} title={b.title||"Video kreatif"} referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>}</div></article>
 }
 if(b.section_type==="gallery")return <section className="cms-render-section"><div className="container"><span className="eyebrow">{tr("eyebrow",b.eyebrow)}</span><h2>{tr("title",b.title)}</h2><p>{tr("body",b.body)}</p><div className="cms-gallery">{(b.media_items||[]).filter(x=>isSafeLink(x)).map((x,i)=><MediaDisplay key={i} url={x} alt={`${tr("title",b.title)} ${i+1}`}/>)}</div></div></section>;
 if(b.section_type==="quote")return <section className="cms-quote"><div className="container"><span className="eyebrow">{tr("eyebrow",b.eyebrow)}</span><blockquote>“{tr("body",b.body||b.title)}”</blockquote><strong>{tr("title",b.title)}</strong></div></section>;
 return <section className={`cms-render-section cms-section-${b.section_type}`}><div className={`container ${media?"cms-section-grid":""}`}><div className="cms-section-text"><span className="eyebrow">{tr("eyebrow",b.eyebrow)}</span><h2>{tr("title",b.title)}</h2><p>{tr("body",b.body)}</p>{b.action_label&&<Action label={tr("action_label",b.action_label)} href={b.action_url}/>}</div>{media&&<div className="cms-section-media">{media}</div>}</div></section>
}
export function CmsSections({path}:{path:string}){const {sections}=useSitePage(path);return <>{sections.map(b=><Block block={b} key={b.id}/>)}</>}
