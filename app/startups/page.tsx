import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/startups",'KTCC Startup Hub');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="startups"/>}
