import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/impact",'KTCC Impact');}
import ImpactPage from "@/components/ImpactPage";
export default function Page(){return <ImpactPage/>}
