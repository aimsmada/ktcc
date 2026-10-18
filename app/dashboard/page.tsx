import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/dashboard",'Your KTCC Hub');}
import RoleDashboardPage from "@/components/RoleDashboardPage";
export default function Page(){return <RoleDashboardPage/>}
