"use client";
import {useEffect,useState,type FormEvent} from "react";
import Link from "next/link";
import {LockKeyhole,Eye,EyeOff,ArrowRight,ShieldCheck} from "lucide-react";
import {supabase} from "@/lib/supabase";

/** 'admin' is a display/login alias. Credentials are checked by Supabase Auth, never JavaScript. */
export default function AdminLogin(){
 const [username,setUsername]=useState("admin");const [password,setPassword]=useState("");
 const [show,setShow]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState("");
 const adminEmail=process.env.NEXT_PUBLIC_KTCC_ADMIN_EMAIL?.trim();
 useEffect(()=>{if(!supabase)return;supabase.auth.getUser().then(async({data})=>{
  if(!data.user)return;
  const {data:profile}=await supabase!.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
  if(profile?.role==="admin")window.location.replace("/admin");
 }).catch(()=>{});},[]);
 async function submit(e:FormEvent){e.preventDefault();setError("");
  if(username.trim()!=="admin"){setError("Username atau password tidak sesuai.");return;}
  if(!adminEmail||!supabase){setError("Admin belum diaktifkan. Konfigurasikan Supabase dan email admin terlebih dahulu.");return;}
  setBusy(true);
  try{
   const {data,error:authError}=await supabase.auth.signInWithPassword({email:adminEmail,password});
   if(authError||!data.user)throw new Error("Username atau password tidak sesuai.");
   const {data:profile,error:roleError}=await supabase.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
   if(roleError||profile?.role!=="admin"){
    await supabase.auth.signOut();throw new Error("Akun ini tidak memiliki akses administrator.");
   }
   window.location.replace("/admin");
  }catch(err){setError(err instanceof Error?err.message:"Gagal masuk.");setPassword("");}
  finally{setBusy(false);}
 }
 return <section className="admin-login-screen"><div className="admin-login-card">
  <div className="admin-login-icon"><LockKeyhole size={27}/></div><span className="eyebrow">KTCC / CONTENT STUDIO</span>
  <h1>Admin <em>Sign In.</em></h1><p>Kelola tampilan, konten, media, serta publikasi ekosistem kreatif Kutai Timur.</p>
  <form onSubmit={submit} className="cms-form" autoComplete="on">
   <label className="cms-field"><span>Username</span><input className="field" name="username" autoComplete="username" required value={username} onChange={e=>setUsername(e.target.value)}/></label>
   <label className="cms-field"><span>Password</span><div className="admin-password-wrap"><input className="field" name="password" autoComplete="current-password" type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" className="admin-eye" onClick={()=>setShow(!show)} aria-label={show?"Sembunyikan password":"Tampilkan password"}>{show?<EyeOff size={19}/>:<Eye size={19}/>}</button></div></label>
   {error&&<p role="alert" className="admin-login-error">{error}</p>}
   <button disabled={busy} type="submit" className="btn btn-dark admin-submit">{busy?"Memeriksa kredensial...":"Masuk ke Content Studio"} <ArrowRight size={17}/></button>
  </form><div className="admin-login-footer"><ShieldCheck size={16}/> Akses dikelola oleh autentikasi Supabase & kebijakan RLS.</div>
  <Link href="/" className="admin-back-home">← Kembali ke website</Link>
 </div></section>;
}
