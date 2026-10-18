import { getPageMetadata } from "@/lib/site-metadata";
export async function generateMetadata(){return getPageMetadata("/events",'Creative Events');}
import EventsPage from "@/components/EventsPage";
export default function Page(){return <EventsPage/>}
