import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/passport",'Creative Passport');}
import PassportPage from "@/components/PassportPage";
export default function Page(){return <PassportPage/>}
