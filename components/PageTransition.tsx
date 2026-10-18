"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function PageTransition({children}:{children:React.ReactNode}){
 const pathname=usePathname();const reduced=useReducedMotion();
 if(reduced)return <>{children}</>;
 return <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.24,ease:"easeOut"}}>{children}</motion.div></AnimatePresence>;
}
