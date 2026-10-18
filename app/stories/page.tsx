import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/stories",'Creative Stories');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="stories"/>}
