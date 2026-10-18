import HomePage from "@/components/HomePage";
import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/","Kutai Timur Creative Center")}
export default function Page(){return <HomePage/>}
