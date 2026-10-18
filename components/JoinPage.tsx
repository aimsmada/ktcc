"use client";
import { CmsHero,CmsSections } from "@/components/CmsSections";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, UserRound, CheckCircle2, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured,supabase } from "@/lib/supabase";
const roles=["Visitor","Creator","UMKM","Startup","Community","Space Manager","Event Organizer","Government / Partner"];
const slugRole:Record<string,string>={Visitor:"visitor",Creator:"creator",UMKM:"umkm",Startup:"startup",Community:"community","Space Manager":"space_manager","Event Organizer":"event_organizer","Government / Partner":"visitor"};
export default function JoinPage(){
 const [role,setRole]=useState("Creator");const [email,setEmail]=useState("");const [display,setDisplay]=useState("");const [status,setStatus]=useState("");const [busy,setBusy]=useState(false);const [logged,setLogged]=useState(false);
 useEffect(()=>{
 if(typeof window!=="undefined")setDisplay(localStorage.getItem("ktcc-passport-name")||"");
 supabase?.auth.getUser().then(async({data})=>{
  setLogged(Boolean(data.user));if(!data.user)return;
  const pending=localStorage.getItem("ktcc-pending-role");const pendingName=localStorage.getItem("ktcc-pending-name");
  if(pending&&pendingName){
   const {error}=await supabase!.rpc("ktcc_choose_member_role",{chosen_role:pending,chosen_name:pendingName});
   if(error)setStatus("Signed in, but role update failed: "+error.message);else{setStatus("Signed in. Member category saved to secure profile.");localStorage.removeItem("ktcc-pending-role");localStorage.removeItem("ktcc-pending-name");}
  }
 }).catch(()=>{});
 },[]);
 const submit=async()=>{
  if(!display.trim()){setStatus("Enter a creative name.");return}
  if(!isSupabaseConfigured){setStatus("Pendaftaran online sedang disiapkan. Silakan hubungi administrator KTCC.");return;}
  if(!email.trim()){setStatus("Please enter your email to receive a login link.");return}
  setBusy(true);
  localStorage.setItem("ktcc-pending-role",slugRole[role]||"visitor");
  localStorage.setItem("ktcc-pending-name",display.trim());
  const {error}=await supabase!.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+"/join",data:{full_name:display.trim()}}});setStatus(error?error.message:role==="Government / Partner"?"Check email for login. Government/partner privileges require separate verification; your initial role is Visitor.":"Check your email for the secure sign-in link. Your chosen member category is applied after login.");setBusy(false);
 };
 return <><CmsHero path="/join" eyebrow="BECOME PART OF WHAT’S NEXT" title="There’s room for" accent="your ideas." description="Join a creative ecosystem built around discovery, collaboration and new opportunities."/><section className="container directory-area" style={{maxWidth:1060}}><div className="feature-dashboard"><div className="dashboard-card"><span className="eyebrow">YOUR CREATIVE IDENTITY</span><h3 style={{fontSize:30}}>Join KTCC</h3><label className="field-label">Creative name</label><input className="field" value={display} onChange={e=>setDisplay(e.target.value)} placeholder="What should we call you?"/><label className="field-label">I am joining as...</label><div className="chip-row">{roles.map(x=><button key={x} className={`chip ${role===x?"active":""}`} onClick={()=>setRole(x)}>{x}</button>)}</div>{isSupabaseConfigured&&<><label className="field-label">Email address</label><input className="field" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="hello@example.com"/></>}<button className="btn btn-dark btn-large" style={{marginTop:25}} disabled={busy} onClick={submit}>{busy?"Please wait...":isSupabaseConfigured?"Send secure sign-in link":"Join KTCC"}<ArrowUpRight size={18}/></button>{status&&<div role="status" className="small-alert" style={{marginTop:16}}>{status}</div>}{logged&&<div className="small-alert" style={{marginTop:13}}>You are signed in with Supabase. Admin access still requires an approved profile role.</div>}</div><div className="dashboard-card" style={{background:"#e9f2e3"}}><span className="eyebrow">CREATE / CONNECT / GROW</span><h3 style={{fontSize:30,marginTop:20}}>Your work deserves to be seen.</h3><p className="subheading">A future place for local makers, creatives, startup founders, communities and public/private partners to exchange opportunities.</p><div className="map-list" style={{marginTop:25}}><span>✳ Discover local market opportunities</span><span>✳ Build a credible creative portfolio</span><span>✳ Match with potential collaborators</span><span>✳ Join and publish verified events</span><span>✳ Access maker-friendly local spaces</span></div><div className="small-alert" style={{marginTop:22}}><ShieldCheck size={15} style={{display:"inline"}}/> Keanggotaan dan peran yang memerlukan verifikasi khusus akan ditinjau oleh pengelola KTCC.</div><Link href="/dashboard" className="text-link" style={{marginTop:24}}>View role-based dashboard <ArrowUpRight size={16}/></Link></div></div></section><CmsSections path="/join"/></>;
}
