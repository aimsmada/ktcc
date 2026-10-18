"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LayoutDashboard, UserRound, Sparkles, Rocket, CalendarDays, Building2, ShoppingBag, Handshake } from "lucide-react";
import { isSupabaseConfigured,supabase } from "@/lib/supabase";
import { useCatalog } from "@/lib/useCatalog";
import { ListingGrid } from "@/components/ListingCard";
import { type Kind } from "@/lib/data";
const roleMap:Record<string,{intro:string;kinds:Kind[];links:[string,string][]}>={
 Visitor:{intro:"Discover the creative economy and find your people.",kinds:["event","creator","product"],links:[["Discover Kutim","/discover"],["Save inspiration","/passport"],["Creative Match","/ai"]]},
 Creator:{intro:"Show your work, discover events and connect with future clients.",kinds:["opportunity","event","creator"],links:[["Explore projects","/opportunities"],["Find a match","/ai"],["Your Passport","/passport"]]},
 UMKM:{intro:"Build your brand with local makers and creative collaborators.",kinds:["creator","product","event"],links:[["Explore Market","/market"],["Hire a creator","/creators"],["Discover events","/events"]]},
 Startup:{intro:"Find talent, creative spaces and partners for your next venture.",kinds:["opportunity","creator","space"],links:[["Startup Hub","/startups"],["Find space","/spaces"],["Discover collaborators","/ai"]]},
 Community:{intro:"Connect members, share events and find new spaces.",kinds:["event","space","community"],links:[["See events","/events"],["Find spaces","/spaces"],["Meet creators","/creators"]]},
 "Space Manager":{intro:"Help creators discover welcoming places to meet and make.",kinds:["space","event","community"],links:[["Space catalogue","/spaces"],["Upcoming events","/events"],["Community directory","/communities"]]},
 "Event Organizer":{intro:"Bring people together and discover the region's creative talent.",kinds:["creator","space","event"],links:[["Hire creators","/creators"],["Spaces","/spaces"],["Event calendar","/events"]]},
 "Government / Partner":{intro:"Support credible initiatives and collaborations with local creators.",kinds:["initiative","startup","creator"],links:[["Kutim 2045","/future"],["Impact metrics","/impact"],["Creative ecosystem","/discover"]]},
 admin:{intro:"Moderate content and support a trusted creative ecosystem.",kinds:["initiative","event","startup"],links:[["Open CMS","/admin"],["Impact dashboard","/impact"],["Review Roadmap","/future"]]},
};
export default function RoleDashboardPage(){
 const [role,setRole]=useState("Visitor");const [name,setName]=useState("KTCC Explorer");const {items}=useCatalog();
 useEffect(()=>{
  setName(localStorage.getItem("ktcc-passport-name")||"KTCC Explorer");
  setRole(localStorage.getItem("ktcc-demo-role")||"Visitor");
  if(supabase){supabase.auth.getUser().then(async({data})=>{
   if(!data.user)return;
   const {data:profile}=await supabase!.from("profiles").select("role,display_name").eq("id",data.user.id).maybeSingle();
   if(profile){const r=profile.role;const converted=r==="event_organizer"?"Event Organizer":r==="space_manager"?"Space Manager":r==="partner"?"Government / Partner":r==="umkm"?"UMKM":r?.charAt(0).toUpperCase()+r?.slice(1);setRole(converted||"Visitor");setName(profile.display_name||data.user.email||"KTCC Member")}
  }).catch(()=>{});}
 },[]);
 const config=roleMap[role]||roleMap.Visitor;
 return <><CmsHero path="/dashboard" eyebrow="YOUR PERSONAL KTCC HUB" title="Welcome back," accent="" description="Jelajahi rekomendasi yang cocok untuk peran Anda."/><section className="container directory-area"><div className="feature-dashboard"><div className="dashboard-card"><span className="eyebrow">YOUR NEXT MOVES</span><h3 style={{fontSize:26}}>Open doors for creative growth.</h3><div className="map-list">{config.links.map(([label,url])=><Link key={url} href={url}>{label} <ArrowUpRight size={15}/></Link>)}</div></div><div className="dashboard-card" style={{background:"#eaf2e6"}}><span className="eyebrow">ROLE-AWARE DASHBOARD</span><h3 style={{fontSize:26}}>One platform, different journeys.</h3><p className="subheading">KTCC menampilkan rekomendasi based on whether you join as a creator, UMKM, startup, community, space manager, event organiser or partner. Hak akses pengguna diverifikasi melalui akun KTCC.</p></div></div><div style={{marginTop:52}}><div className="section-head"><div><span className="eyebrow">RECOMMENDED FOR YOUR ROLE</span><h2 className="section-heading">Explore <em>what's relevant.</em></h2></div></div><ListingGrid items={items.filter(x=>config.kinds.includes(x.kind)).slice(0,8)}/></div></section><CmsSections path="/dashboard"/></>;
}
