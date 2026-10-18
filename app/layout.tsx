import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Suspense } from "react";
import VisualCmsRuntime from "@/components/VisualCmsRuntime";
import SiteTheme from "@/components/SiteTheme";
import { LanguageProvider } from "@/lib/language";
import PageTransition from "@/components/PageTransition";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
export const metadata:Metadata={
 ...(process.env.NEXT_PUBLIC_SITE_URL?{metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL)}:{}),
 title:{default:"KTCC — Kutai Timur Creative Center",template:"%s | KTCC"},
 description:"KTCC: Creative products, digital creators, startups, events, spaces and the 2045 creative transformation ecosystem of Kutai Timur.",
 openGraph:{title:"KTCC — The Future Is Local",description:"Kutai Timur Creative Center — Kutim First, Kaltim Connected, Global Ready.",type:"website"},
 robots:{index:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),follow:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body><LanguageProvider><SiteTheme/><SiteHeader/><main><PageTransition>{children}</PageTransition></main><SiteFooter/><Suspense fallback={null}><VisualCmsRuntime/></Suspense></LanguageProvider></body></html>}
