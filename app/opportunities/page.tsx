import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/opportunities",'Creative Opportunities');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="opportunities"/>}
