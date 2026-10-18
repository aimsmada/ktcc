import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/digital",'Digital Creative Market');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="digital"/>}
