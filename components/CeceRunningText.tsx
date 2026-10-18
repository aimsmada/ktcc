"use client";
import {useSiteSetting,defaultCeceTicker,defaultHomeLayout} from "@/lib/cms";
/** Four differently colored phrases; duplicated only to make the moving ribbon seamless. */
export default function CeceRunningText(){
 const ticker=useSiteSetting("cece_ticker",defaultCeceTicker);
 const layout=useSiteSetting("home_layout",defaultHomeLayout);
 if(!ticker.enabled||layout.visible?.ceceTicker===false)return null;
 const parts=["green","blue","purple","red"] as const;
 const group=(duplicate:boolean)=><div className="cece-running-group" aria-hidden={duplicate} key={duplicate?"copy":"original"}>{parts.map((color,i)=><span key={i} className={`cece-running-phrase cece-running-${color}`}><span className="cece-running-star" aria-hidden="true">✦</span> {ticker.text||defaultCeceTicker.text}</span>)}</div>;
 return <div className="cece-running-container" aria-label={`✦ ${[ticker.text||defaultCeceTicker.text,ticker.text||defaultCeceTicker.text,ticker.text||defaultCeceTicker.text,ticker.text||defaultCeceTicker.text].join(" ✦ ")}`}>
  <div className="cece-running-track" style={{animationDuration:`${Math.max(10,Math.min(120,Number(ticker.duration)||25))}s`}}>{group(false)}{group(true)}</div>
 </div>
}
