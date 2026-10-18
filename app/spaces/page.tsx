import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/spaces",'Creative Spaces');}
import DirectoryPage from "@/components/DirectoryPage";
export default function Page(){return <DirectoryPage section="spaces"/>}
