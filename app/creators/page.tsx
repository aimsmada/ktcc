import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/creators",'Kutim Creators');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="creators"/>}
