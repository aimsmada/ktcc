import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/future",'Kutim 2045 Roadmap');}
import FuturePage from "@/components/FuturePage";
export default function Page(){return <FuturePage/>}
