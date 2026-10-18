"use client";
export type SavedState = { favorites: string[]; registrations: string[]; bookings: { id:string; date:string; seat:string }[]; inquiries: { id:string; type:string; message:string }[] };
const KEY = "ktcc-demo-state-v1";
const empty: SavedState = { favorites:[], registrations:[], bookings:[], inquiries:[] };
export function readState():SavedState {
 if (typeof window === "undefined") return empty;
 try { return { ...empty, ...JSON.parse(window.localStorage.getItem(KEY) || "{}") }; } catch { return empty; }
}
export function saveState(s:SavedState) {
 if (typeof window === "undefined") return;
 window.localStorage.setItem(KEY, JSON.stringify(s));
 window.dispatchEvent(new Event("ktcc-store-update"));
}
export function toggleFavorite(id:string) {
 const s = readState();
 s.favorites = s.favorites.includes(id) ? s.favorites.filter(x=>x!==id) : [...s.favorites,id];
 saveState(s);
 return s.favorites.includes(id);
}
export function registerEvent(id:string) {
 const s=readState(); if(!s.registrations.includes(id)) s.registrations.push(id); saveState(s);
}
export function addInquiry(id:string,type:string,message:string) {
 const s=readState();s.inquiries.push({id,type,message});saveState(s);
}
export function addBooking(id:string,date:string,seat:string) {
 const s=readState();s.bookings.push({id,date,seat});saveState(s);
}
export function downloadEventICS(title:string,date:string,location:string) {
 const stamp=date.replaceAll("-", "")+"T100000";
 const safe=(x:string)=>x.replace(/[,;\\]/g," ").replace(/\r?\n/g," ");
 const data=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//KTCC//ID\r\nBEGIN:VEVENT\r\nUID:ktcc-${stamp}-${title.replace(/\W/g,"")}@ktcc.local\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}\r\nDTSTART:${stamp}\r\nDTEND:${date.replaceAll("-", "")}T120000\r\nSUMMARY:${safe(title)}\r\nLOCATION:${safe(location)}\r\nDESCRIPTION:Periksa jam acara langsung kepada penyelenggara sebelum berangkat.\r\nEND:VEVENT\r\nEND:VCALENDAR`;
 const url=URL.createObjectURL(new Blob([data],{type:"text/calendar;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="ktcc-event.ics";a.click();URL.revokeObjectURL(url);
}
