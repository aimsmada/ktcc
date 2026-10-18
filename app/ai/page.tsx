import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/ai",'Creative Match');}
import CreativeMatchPage from "@/components/CreativeMatchPage";
export default function Page(){return <CreativeMatchPage/>}
