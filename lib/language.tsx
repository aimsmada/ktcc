"use client";
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from "react";
export type Language="id"|"en";
export const languageLabels={id:"Bahasa Indonesia",en:"English"};
const LOCAL_KEY="ktcc-language";
const englishToIndonesian:Record<string,string>={
 "Discover":"Jelajahi", "Market":"Pasar Kreatif", "Creators":"Kreator", "Events":"Acara", "Startups":"Startup", "Spaces":"Ruang Kreatif", "Kutim 2045":"Kutim 2045", "Join KTCC":"Gabung KTCC", "Join the movement":"Bergabung bersama kami", "Your creative companion.":"Teman kreativitasmu.", "THE CREATIVE FUTURE STARTS HERE":"MASA DEPAN KREATIF DIMULAI DI SINI",
 "The future":"Masa depan", "is local":"berawal dari lokal", "MEET CECE":"KENALI CECE", "Creative Products":"Produk Kreatif", "Creators":"Kreator", "Communities":"Komunitas", "Creative Spaces":"Ruang Kreatif", "Upcoming Events":"Acara Mendatang", "What do you want to discover in Kutim?":"Apa yang ingin kamu temukan di Kutim?", "EXPLORE:":"JELAJAHI:", "Products":"Produk", "Opportunities":"Peluang", "VIEW ALL":"LIHAT SEMUA",
 "THE ECOSYSTEM":"EKOSISTEM KREATIF", "CURATED FOR YOU":"PILIHAN UNTUKMU", "LOCAL MAKERS, BIG IDEAS":"KREATOR LOKAL, GAGASAN BESAR", "WHAT'S NEXT":"KEGIATAN MENDATANG", "OUR VISION / KUTIM 2045":"VISI KAMI / KUTIM 2045", "MEET THE ECOSYSTEM":"KENALI EKOSISTEM", "CREATIVE JOURNAL":"JURNAL KREATIF", "MORE THAN A WEBSITE":"LEBIH DARI WEBSITE",
 "Explore all":"Jelajahi semua", "Discover local products":"Temukan produk lokal", "View calendar":"Lihat kalender", "Meet creators":"Kenali kreator", "Read all stories":"Baca semua cerita", "Explore Kutim 2045":"Jelajahi Kutim 2045", "Start something meaningful.":"Mulai sesuatu yang bermakna.", "Find space to create.":"Temukan ruang untuk berkarya.", "Ideas are good. Impact is better.":"Ide itu penting. Dampak lebih bermakna.",
 "Explore a different future for Kutai Timur ↗":"Jelajahi masa depan baru untuk Kutai Timur ↗", "Explore what's happening in Kutim.":"Temukan aktivitas kreatif di Kutim.", "Explore what’s happening in Kutim.":"Temukan aktivitas kreatif di Kutim.", "Good ideas find great people.":"Ide hebat mempertemukan orang-orang kreatif.", "Build the next chapter.":"Bangun babak selanjutnya.",
 "All categories":"Semua kategori", "All districts":"Semua kecamatan", "Search":"Cari", "Search creators, events, products...":"Cari kreator, acara, produk...", "Clear":"Hapus", "Reset filters":"Atur ulang filter", "View details":"Lihat detail", "Save Event":"Simpan acara", "Add to Calendar":"Tambahkan ke kalender", "Register":"Daftar", "Visit website":"Kunjungi situs", "View profile":"Lihat profil", "Open profile":"Buka profil", "Hire Creator":"Rekrut kreator", "Invite Collaboration":"Undang kolaborasi", "Read more":"Baca selengkapnya",
 "All sectors":"Semua sektor", "All initiative types":"Semua jenis inisiatif", "Government":"Pemerintah", "Private sector":"Swasta", "Collaboration":"Kolaborasi", "Show all":"Lihat semua", "View on map":"Lihat di peta", "List view":"Tampilan daftar", "Map view":"Tampilan peta", "Calendar":"Kalender", "Timeline":"Linimasa",
 "The Future is Local":"Masa Depan Berawal dari Lokal", "Let creativity":"Biarkan kreativitas", "move":"menggerakkan", "forward.":"maju.", "Impact":"Dampak", "Stories":"Cerita", "Contact":"Kontak", "Privacy":"Privasi", "Terms":"Ketentuan", "Your Passport":"Paspor Kreatifmu", "My Dashboard":"Dasbor Saya",
 "Looking for Talent":"Mencari Talenta", "Looking for Partner":"Mencari Mitra", "Looking for Mentor":"Mencari Mentor", "Looking for Funding":"Mencari Pendanaan", "Featured":"Unggulan", "Made in Kutim":"Buatan Kutim", "View all":"Lihat semua", "Loading...":"Memuat...",
 "DISCOVER KUTIM":"JELAJAHI KUTIM",
 "CURATED LOCAL MARKET":"PASAR KREATIF PILIHAN",
 "DIGITAL CREATIVE MARKET":"PASAR KREATIF DIGITAL",
 "PEOPLE MAKE THE PLACE":"TALENTA MEMBANGUN DAERAH",
 "BUILD WHAT'S NEXT":"BANGUN MASA DEPAN",
 "WHERE IDEAS COME ALIVE":"RUANG IDE MENJADI NYATA",
 "GROW WITH YOUR PEOPLE":"TUMBUH BERSAMA KOMUNITAS",
 "KTCC CREATIVE JOURNAL":"JURNAL KREATIF KTCC",
 "TURN DISCOVERY INTO ACTION":"WUJUDKAN PELUANG",
 "Find your next":"Temukan peluang",
 "possibility.":"barumu.",
 "Made with":"Karya yang",
 "meaning.":"bermakna.",
 "Creativity without":"Kreativitas tanpa",
 "borders.":"batas.",
 "Meet the":"Kenali para",
 "makers.":"kreator.",
 "Small teams.":"Tim kecil.",
 "Bold futures.":"Ide besar.",
 "Find room to":"Temukan ruang",
 "create.":"untuk berkarya.",
 "Find your":"Temukan",
 "community.":"komunitasmu.",
 "Stories worth":"Kisah yang",
 "sharing.":"bermakna.",
 "Your next":"Peluang",
 "opportunity.":"berikutnya.",
 "KTCC CREATIVE MATCH":"KTCC CREATIVE MATCH",
 "Find the right":"Temukan",
 "connections.":"kolaborasi terbaik.",
 "Describe what you do or need. Discover relevant creators, projects, startups, events, spaces and communities.":"Ceritakan kebutuhanmu. Temukan kreator, proyek, startup, acara, ruang, dan komunitas yang relevan.",
 "YOUR CREATIVE IDENTITY":"IDENTITAS KREATIFMU",
 "Creative":"Paspor",
 "Passport.":"Kreatif.",
 "YOUR PERSONAL KTCC HUB":"RUANG KREATIF PRIBADIMU",
 "Welcome back,":"Selamat datang kembali,",
 "BECOME PART OF WHAT’S NEXT":"JADI BAGIAN DARI MASA DEPAN",
 "There’s room for":"Ada ruang untuk",
 "your ideas.":"gagasanmu.",
 "Join a creative ecosystem built around discovery, collaboration and new opportunities.":"Bergabunglah dalam ekosistem kreatif yang menghubungkan karya, kolaborasi, dan peluang baru.",
 "THE ROAD TO TOMORROW":"JALAN MENUJU MASA DEPAN",
 "KTCC IMPACT DASHBOARD":"DASHBOARD DAMPAK KTCC",
 "Creative growth.":"Pertumbuhan kreatif.",
 "Measurable impact.":"Dampak terukur.",
 "IDEAS NEED PEOPLE":"IDE MEMBUTUHKAN ORANG",
 "What are you looking for?":"Apa yang sedang kamu cari?",
 "YOUR NEXT MOVES":"LANGKAHMU BERIKUTNYA",
 "Open doors for creative growth.":"Buka peluang pertumbuhan kreatif.",
 "THE ECOSYSTEM":"EKOSISTEM KREATIF",
 "Explore marketplace":"Jelajahi marketplace",
 "DISCOVER":"JELAJAHI",
 "CREATE":"BERKARYA",
 "CONNECT":"TERHUBUNG",
 "GROW":"TUMBUH",
 "Trending in Kutim":"Tren di Kutim",
 "KTCC CREATIVE PASSPORT ✳":"PASPOR KREATIF KTCC ✳",
 "From natural potential to creative value. Explore illustrative scenarios for tomorrow's Kutai Timur creative economy.":"Dari potensi alam menjadi nilai kreatif. Jelajahi peluang ekonomi kreatif Kutai Timur pada masa depan.",
 "KUTIM HEBAT 2045":"KUTIM HEBAT 2045"
};
export function translateUI(source:string,locale:Language){if(locale==="en")return source;return englishToIndonesian[source]||source;}
type LanguageContextType={language:Language;setLanguage:(language:Language)=>void;ui:(english:string)=>string;localize:(indonesian:string,english:string)=>string};
const LanguageContext=createContext<LanguageContextType>({language:"id",setLanguage:()=>{},ui:(x)=>translateUI(x,"id"),localize:(id)=>id});
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [language,setLanguageState]=useState<Language>("id");
 useEffect(()=>{try{const saved=window.localStorage.getItem(LOCAL_KEY);if(saved==="id"||saved==="en")setLanguageState(saved)}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=language},[language]);
 const setLanguage=useCallback((lang:Language)=>{setLanguageState(lang);try{window.localStorage.setItem(LOCAL_KEY,lang)}catch{}},[]);
 const value=useMemo(()=>({language,setLanguage,ui:(english:string)=>translateUI(english,language),localize:(id:string,en:string)=>language==="id"?id:en}),[language,setLanguage]);
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export const useLanguage=()=>useContext(LanguageContext);
