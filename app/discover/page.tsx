import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/discover",'Discover Kutim');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="discover"/>}
