"use client";
import { supabase } from "@/lib/supabase";
export async function sendEngagement(args:{listingId:string;type:"event_registration"|"space_enquiry"|"collaboration";message?:string;date?:string;slot?:string}){
 if(!supabase)throw new Error("Layanan anggota belum tersedia. Silakan hubungi pengelola KTCC.");
 const {data:{user},error:authError}=await supabase.auth.getUser();
 if(authError||!user)throw new Error("Masuk ke akun KTCC terlebih dahulu untuk mengirim permintaan.");
 const {error}=await supabase.from("engagement_requests").insert({listing_id:args.listingId,requester_id:user.id,request_type:args.type,message:args.message||"",requested_date:args.date||null,requested_slot:args.slot||null});
 if(error)throw new Error(error.message);
 return "Permintaan diterima sistem KTCC. Tunggu konfirmasi dari pengelola; ini belum merupakan tiket atau reservasi yang disetujui.";
}
