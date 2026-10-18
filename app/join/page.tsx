import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/join",'Join KTCC');}
import JoinPage from "@/components/JoinPage";
export default function Page(){return <JoinPage/>}
