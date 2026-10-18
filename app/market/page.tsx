import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/market",'KTCC Creative Market');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="market"/>}
