"use client";
import {useSiteSetting,defaultAppearance} from "@/lib/cms";
// Preset-safe palette. CSS variables are interpolated only after HEX validation.
export default function SiteTheme(){
 const appearance=useSiteSetting("appearance",defaultAppearance);
 const color=(value:string,fallback:string)=>/^#[0-9a-fA-F]{6}$/.test(value)?value:fallback;
 const green=color(appearance.green,"#14b839"),blue=color(appearance.blue,"#079ef3");
 const purple=color(appearance.purple,"#a12bec"),red=color(appearance.red,"#ff2e52"),yellow=color(appearance.yellow,"#ffc009");
 const navy=color(appearance.navy,"#102c63"),surface=color(appearance.surface,"#ffffff");
 return <style>{`:root{--ktcc-green:${green};--ktcc-blue:${blue};--ktcc-purple:${purple};--ktcc-red:${red};--ktcc-yellow:${yellow};--ktcc-navy:${navy};--ktcc-surface:${surface};}
 body{background-color:var(--ktcc-surface)}
 .btn-dark{background:var(--ktcc-navy)!important;border-color:var(--ktcc-navy)!important}
 .hero-title .italic-line,.section-heading em,.site-footer em{color:var(--ktcc-blue)}
 .hero-section{background:linear-gradient(128deg,var(--ktcc-navy) 0%,#123f86 90%)}
 .cece-caption-spark{color:var(--ktcc-purple)}
 .hero-kicker span,.signal{background-color:var(--ktcc-green)}
 .cece-color-dots i:nth-child(1){background:var(--ktcc-green)}
 .cece-color-dots i:nth-child(2){background:var(--ktcc-blue)}
 .cece-color-dots i:nth-child(3){background:var(--ktcc-purple)}
 .cece-color-dots i:nth-child(4){background:var(--ktcc-red)}
 .cece-color-dots i:nth-child(5){background:var(--ktcc-yellow)}
 .marquee-bar{background:var(--ktcc-purple)}
 `}</style>;
}
