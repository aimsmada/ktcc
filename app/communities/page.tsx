import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/communities",'Creative Communities');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="communities"/>}
