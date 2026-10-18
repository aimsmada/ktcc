export type Kind = "product" | "digital" | "creator" | "event" | "startup" | "space" | "initiative" | "community" | "opportunity" | "article";
export type Status = "published" | "pending" | "archived";
export type Listing = {
 id: string; slug: string; kind: Kind; title: string; subtitle: string;
 category: string; district: string; location: string; image: string; videoUrl?:string; gallery?:string[]; mediaAlt?:string;
 description: string; story?: string; tags: string[]; price?: number;
 date?: string; organizer?: string; capacity?: number; license?: string;
 stage?: string; statusLabel?: string; sourceUrl?: string; purchaseUrl?: string; socialUrl?: string; openingHours?: string;
 lat?: number; lng?: number; featured?: boolean; isKutim?: boolean;
 status?: Status; ownerId?: string; createdAt?: string;
};
export const districts = ["Semua Kecamatan", "Sangatta Utara", "Sangatta Selatan", "Bengalon", "Teluk Pandan", "Rantau Pulung", "Muara Wahau", "Kongbeng", "Kaliorang", "Sangkulirang", "Kaubun", "Sandaran", "Karangan", "Telen", "Busang", "Muara Ancalong", "Muara Bengkal", "Batu Ampar", "Long Mesangat", "Samarinda (Kaltim)", "Balikpapan (Kaltim)"];

// All examples are invented and are never claims about existing businesses, events, or public programmes.
export const demoListings: Listing[] = [
 {
  "id": "p1",
  "slug": "akar-anyam-signature-tote",
  "kind": "product",
  "title": "Akar Anyam Signature Tote",
  "subtitle": "Tas anyaman premium untuk mobilitas kreatif harian",
  "category": "Fashion & Craft",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-p1.webp",
  "description": "Tote bag dengan sentuhan anyaman, material ringan, dan visual kontemporer yang mewakili identitas kreatif Kutai Timur. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Merchandise",
   "Fashion",
   "Made in Kutim"
  ],
  "price": 189000,
  "featured": true,
  "isKutim": true,
  "lat": -0.496,
  "lng": 117.556
 },
 {
  "id": "p2",
  "slug": "sangatta-roast-reserve",
  "kind": "product",
  "title": "Sangatta Roast Reserve",
  "subtitle": "Kopi kurasi dengan kemasan siap pasar modern",
  "category": "Food & Beverage",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "image": "/visuals/card-p2.webp",
  "description": "Produk kopi dengan visual kemasan yang dirancang untuk memperkuat daya saing merek lokal di pasar digital dan retail. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Coffee",
   "Branding",
   "Local Product"
  ],
  "price": 98000,
  "featured": true,
  "isKutim": true,
  "lat": -0.567,
  "lng": 117.569
 },
 {
  "id": "p3",
  "slug": "pesisir-notes-stationery",
  "kind": "product",
  "title": "Pesisir Notes Stationery Set",
  "subtitle": "Set alat tulis berilustrasi lanskap pesisir Kutim",
  "category": "Stationery",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "image": "/visuals/card-p3.webp",
  "description": "Koleksi notebook, kartu, dan aksesoris meja dengan bahasa visual editorial yang cocok untuk hadiah dan merchandise kreatif. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Stationery",
   "Souvenir",
   "Illustration"
  ],
  "price": 74000,
  "isKutim": true,
  "lat": 1,
  "lng": 118.02
 },
 {
  "id": "p4",
  "slug": "bengalon-home-ceramics",
  "kind": "product",
  "title": "Bengalon Home Ceramics",
  "subtitle": "Keramik dekoratif untuk pasar gaya hidup modern",
  "category": "Home & Living",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-p4.webp",
  "description": "Peralatan dan dekorasi rumah berbasis craft lokal yang ditampilkan dengan pendekatan visual premium untuk pasar gaya hidup. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Craft",
   "Home & Living",
   "Local Makers"
  ],
  "price": 235000,
  "isKutim": true,
  "lat": 0.75,
  "lng": 117.55
 },
 {
  "id": "p5",
  "slug": "ktcc-crew-essentials",
  "kind": "product",
  "title": "KTCC Crew Essentials",
  "subtitle": "Merch resmi bergaya minimal dan berani",
  "category": "Apparel",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-p5.webp",
  "description": "Koleksi kaos, topi, dan aksesori bergaya kreatif-tech yang memperkuat identitas komunitas KTCC. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Apparel",
   "Merchandise",
   "Community"
  ],
  "price": 175000,
  "featured": true,
  "isKutim": true
 },
 {
  "id": "p6",
  "slug": "mahakam-cocoa-gift-box",
  "kind": "product",
  "title": "Mahakam Cocoa Gift Box",
  "subtitle": "Paket hampers produk olahan lokal siap kurasi",
  "category": "Food Gift",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "image": "/visuals/card-p6.webp",
  "description": "Hampers pilihan untuk kebutuhan gifting, promosi event, dan showcase produk lokal unggulan. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Gift Box",
   "UMKM",
   "Curated"
  ],
  "price": 145000,
  "isKutim": true,
  "lat": -0.98,
  "lng": 117.83
 },
 {
  "id": "d1",
  "slug": "borneo-brand-kit",
  "kind": "digital",
  "title": "Borneo Brand Kit",
  "subtitle": "Template presentasi dan identitas visual untuk UMKM",
  "category": "Brand Asset",
  "district": "Sangatta Utara",
  "location": "Kutim / digital",
  "image": "/visuals/card-d1.webp",
  "description": "Paket aset presentasi, social media, dan materi promosi yang membantu pelaku usaha lokal tampil lebih siap di ruang digital.",
  "tags": [
   "Digital Product",
   "Branding",
   "Template"
  ],
  "price": 99000,
  "license": "Single team license"
 },
 {
  "id": "d2",
  "slug": "kutim-social-pack",
  "kind": "digital",
  "title": "Kutim Social Pack",
  "subtitle": "Konten visual siap pakai untuk promosi event dan komunitas",
  "category": "Social Media Asset",
  "district": "Sangatta Selatan",
  "location": "Kutim / digital",
  "image": "/visuals/card-d2.webp",
  "description": "Template feed, story, poster, dan motion slide yang dirancang untuk promosi event kreatif, UMKM, dan program komunitas.",
  "tags": [
   "Content Pack",
   "Motion",
   "Social Media"
  ],
  "price": 119000,
  "license": "Commercial preview"
 },
 {
  "id": "d3",
  "slug": "coastline-photo-presets-pro",
  "kind": "digital",
  "title": "Coastline Presets Pro",
  "subtitle": "Preset foto bernuansa hangat untuk brand lokal",
  "category": "Photography",
  "district": "Teluk Pandan",
  "location": "Kutim / digital",
  "image": "/visuals/card-d3.webp",
  "description": "Preset fotografi untuk menampilkan produk, ruang, dan lanskap dengan tampilan modern, cerah, dan konsisten.",
  "tags": [
   "Photography",
   "Preset",
   "Creator Tool"
  ],
  "price": 59000,
  "license": "Creator license"
 },
 {
  "id": "d4",
  "slug": "mahakam-motion-graphics-kit",
  "kind": "digital",
  "title": "Mahakam Motion Graphics Kit",
  "subtitle": "Animasi ringan untuk promosi video dan LED screen",
  "category": "Motion Graphic",
  "district": "Samarinda (Kaltim)",
  "location": "Kaltim / digital",
  "image": "/visuals/card-d4.webp",
  "description": "Aset motion graphic untuk opening video, teaser event, dan bumper promosi ekosistem kreatif.",
  "tags": [
   "Motion",
   "Video Asset",
   "Kaltim Connected"
  ],
  "price": 149000,
  "license": "Project license"
 },
 {
  "id": "c1",
  "slug": "nara-wicak-visuals",
  "kind": "creator",
  "title": "Nara Wicak Visuals",
  "subtitle": "Illustrator & visual storyteller",
  "category": "Illustrator",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-c1.webp",
  "description": "Membangun ilustrasi editorial, identitas visual, dan artwork kampanye untuk brand, komunitas, dan event.",
  "tags": [
   "Illustration",
   "Branding",
   "Open for Work"
  ],
  "featured": true,
  "isKutim": true,
  "lat": -0.496,
  "lng": 117.556
 },
 {
  "id": "c2",
  "slug": "alif-lens-studio",
  "kind": "creator",
  "title": "Alif Lens Studio",
  "subtitle": "Photographer for brands, spaces and events",
  "category": "Photographer",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "image": "/visuals/card-c2.webp",
  "description": "Spesialis foto produk, dokumentasi event, dan visual ruang untuk promosi digital yang lebih kuat.",
  "tags": [
   "Photography",
   "Event",
   "Commercial"
  ],
  "isKutim": true,
  "lat": -0.567,
  "lng": 117.569
 },
 {
  "id": "c3",
  "slug": "dara-motion-lab",
  "kind": "creator",
  "title": "Dara Motion Lab",
  "subtitle": "Animator & motion designer",
  "category": "Animator",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-c3.webp",
  "description": "Mengembangkan motion explainer, video kampanye, dan aset visual bergerak untuk ekosistem kreatif.",
  "tags": [
   "Animation",
   "Motion",
   "3D"
  ],
  "isKutim": true,
  "lat": 0.75,
  "lng": 117.55
 },
 {
  "id": "c4",
  "slug": "tania-type-atelier",
  "kind": "creator",
  "title": "Tania Type Atelier",
  "subtitle": "Graphic designer & visual identity specialist",
  "category": "Designer",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-c4.webp",
  "description": "Fokus pada desain kemasan, logo, dan sistem identitas untuk pelaku usaha dan program daerah.",
  "tags": [
   "Identity",
   "Packaging",
   "Design"
  ],
  "isKutim": true
 },
 {
  "id": "c5",
  "slug": "raka-code-lab",
  "kind": "creator",
  "title": "Raka Code Lab",
  "subtitle": "Creative developer for interactive experiences",
  "category": "Developer",
  "district": "Kongbeng",
  "location": "Kongbeng, Kutai Timur",
  "image": "/visuals/card-c5.webp",
  "description": "Mengerjakan web interaktif, landing page promosi, dan pengalaman digital untuk startup serta event.",
  "tags": [
   "Web",
   "Creative Coding",
   "Interactive"
  ],
  "isKutim": true
 },
 {
  "id": "c6",
  "slug": "safira-audio-house",
  "kind": "creator",
  "title": "Safira Audio House",
  "subtitle": "Music producer & sound identity creator",
  "category": "Musician",
  "district": "Muara Wahau",
  "location": "Muara Wahau, Kutai Timur",
  "image": "/visuals/card-c6.webp",
  "description": "Menghasilkan musik latar, sonic branding, dan kebutuhan audio untuk video promosi dan ruang kreatif.",
  "tags": [
   "Audio",
   "Music",
   "Production"
  ],
  "isKutim": true
 },
 {
  "id": "e1",
  "slug": "kutim-creative-week-2027",
  "kind": "event",
  "title": "Kutim Creative Week 2027",
  "subtitle": "Festival kolaboratif untuk produk, ide, dan jejaring baru",
  "category": "Festival",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-e1.webp",
  "description": "Festival kreatif yang mempertemukan produk lokal, komunitas, pertunjukan, workshop, dan showcase talenta dalam satu rangkaian.",
  "tags": [
   "Festival",
   "Creative Economy",
   "Community"
  ],
  "date": "2027-02-18",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "featured": true,
  "lat": -0.496,
  "lng": 117.556
 },
 {
  "id": "e2",
  "slug": "creative-coding-bootcamp",
  "kind": "event",
  "title": "Creative Coding Bootcamp",
  "subtitle": "Belajar membangun pengalaman digital yang interaktif",
  "category": "Workshop",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "image": "/visuals/card-e2.webp",
  "description": "Kelas intensif untuk pelajar, kreator, dan startup yang ingin menggabungkan desain, data, dan coding.",
  "tags": [
   "Workshop",
   "Technology",
   "Youth"
  ],
  "date": "2027-03-06",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "lat": -0.567,
  "lng": 117.569
 },
 {
  "id": "e3",
  "slug": "east-kalimantan-makers-market",
  "kind": "event",
  "title": "East Kalimantan Makers Market",
  "subtitle": "Pasar kreatif untuk brand lokal dan produk kurasi",
  "category": "Market",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "image": "/visuals/card-e3.webp",
  "description": "Ruang temu antara brand lokal, pembeli, komunitas, dan kurator melalui pasar kreatif yang dirancang lebih premium.",
  "tags": [
   "Market",
   "UMKM",
   "Retail"
  ],
  "date": "2027-04-10",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "lat": -0.98,
  "lng": 117.83
 },
 {
  "id": "e4",
  "slug": "borneo-visual-storytelling-night",
  "kind": "event",
  "title": "Borneo Visual Storytelling Night",
  "subtitle": "Pemutaran karya, presentasi, dan networking kreatif",
  "category": "Showcase",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-e4.webp",
  "description": "Malam apresiasi karya visual yang menampilkan kreator foto, video, ilustrasi, dan motion graphics dari berbagai kecamatan.",
  "tags": [
   "Showcase",
   "Networking",
   "Visual Arts"
  ],
  "date": "2027-05-15",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "lat": 0.75,
  "lng": 117.55
 },
 {
  "id": "e5",
  "slug": "startup-demo-day-kutim",
  "kind": "event",
  "title": "Startup Demo Day Kutim",
  "subtitle": "Pitching day untuk solusi digital dan ekonomi kreatif",
  "category": "Startup",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-e5.webp",
  "description": "Ajang presentasi startup lokal, pertemuan mentor, dan sesi penjajakan kolaborasi dengan komunitas serta mitra strategis.",
  "tags": [
   "Startup",
   "Pitching",
   "Innovation"
  ],
  "date": "2027-06-21",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi"
 },
 {
  "id": "s1",
  "slug": "akar-digital-commerce",
  "kind": "startup",
  "title": "Akar Digital Commerce",
  "subtitle": "Membantu brand lokal naik kelas di pasar digital",
  "category": "CommerceTech",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-s1.webp",
  "description": "Platform layanan katalog, foto produk, dan kampanye digital agar pelaku usaha lokal lebih siap menjangkau pasar baru.",
  "story": "Fokus pada kurasi produk, sistem pemesanan, dan distribusi konten promosi untuk membantu pertumbuhan merek lokal.",
  "tags": [
   "Looking for Talent",
   "Growth Support",
   "Commerce"
  ],
  "stage": "Prototype",
  "featured": true,
  "isKutim": true
 },
 {
  "id": "s2",
  "slug": "pesisir-experience-lab",
  "kind": "startup",
  "title": "Pesisir Experience Lab",
  "subtitle": "Mengubah potensi pesisir menjadi pengalaman kreatif",
  "category": "TravelTech",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "image": "/visuals/card-s2.webp",
  "description": "Mengembangkan paket pengalaman wisata berbasis cerita visual, event, dan konten digital yang menonjolkan lanskap pesisir Kutim.",
  "tags": [
   "TravelTech",
   "Content",
   "Experience"
  ],
  "stage": "Ideation",
  "isKutim": true
 },
 {
  "id": "s3",
  "slug": "karya-match-network",
  "kind": "startup",
  "title": "KaryaMatch Network",
  "subtitle": "Platform kolaborasi untuk kreator dan pelaku usaha",
  "category": "CreatorTech",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-s3.webp",
  "description": "Mempertemukan kebutuhan proyek dengan talenta lokal melalui profil portofolio, brief, dan sistem matching kolaborasi.",
  "tags": [
   "SaaS",
   "Matching",
   "Creator Economy"
  ],
  "stage": "MVP",
  "isKutim": true
 },
 {
  "id": "s4",
  "slug": "hijau-sirkular-studio",
  "kind": "startup",
  "title": "Hijau Sirkular Studio",
  "subtitle": "Material, produk, dan desain yang lebih berkelanjutan",
  "category": "GreenTech",
  "district": "Kaliorang",
  "location": "Kaliorang, Kutai Timur",
  "image": "/visuals/card-s4.webp",
  "description": "Startup yang mendorong penggunaan material ramah lingkungan untuk produk kreatif dan merchandise yang lebih bertanggung jawab.",
  "tags": [
   "Sustainability",
   "Product Design",
   "Circular Economy"
  ],
  "stage": "Early Stage",
  "isKutim": true
 },
 {
  "id": "sp1",
  "slug": "studio-tumbuh-coworking",
  "kind": "space",
  "title": "Studio Tumbuh Coworking",
  "subtitle": "Coworking premium untuk bertemu, bekerja, dan mempresentasikan ide",
  "category": "Coworking",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-sp1.webp",
  "description": "Ruang kerja bersama dengan area meeting, podcast corner, dan fasilitas presentasi untuk kreator maupun startup.",
  "tags": [
   "Wi-Fi",
   "Meeting Room",
   "Podcast"
  ],
  "capacity": 24,
  "openingHours": "Belum tersedia — lokasi contoh",
  "lat": -0.496,
  "lng": 117.556,
  "featured": true
 },
 {
  "id": "sp2",
  "slug": "east-media-studio",
  "kind": "space",
  "title": "East Media Studio",
  "subtitle": "Studio produksi konten untuk foto, video, dan podcast",
  "category": "Studio",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "image": "/visuals/card-sp2.webp",
  "description": "Ruang produksi dengan pencahayaan fleksibel, sudut podcast, dan area editing untuk kebutuhan konten kreatif.",
  "tags": [
   "Studio",
   "Photo",
   "Video"
  ],
  "capacity": 12,
  "openingHours": "Belum tersedia — lokasi contoh",
  "lat": -0.567,
  "lng": 117.569
 },
 {
  "id": "sp3",
  "slug": "bengalon-maker-room",
  "kind": "space",
  "title": "Bengalon Maker Room",
  "subtitle": "Ruang eksperimen untuk workshop dan prototyping",
  "category": "Creative Space",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-sp3.webp",
  "description": "Ruang belajar kolaboratif untuk workshop desain, pembuatan produk, dan sesi pelatihan komunitas.",
  "tags": [
   "Workshop",
   "Learning",
   "Prototype"
  ],
  "capacity": 18,
  "openingHours": "Belum tersedia — lokasi contoh",
  "lat": 0.75,
  "lng": 117.55
 },
 {
  "id": "sp4",
  "slug": "coastal-learning-lounge",
  "kind": "space",
  "title": "Coastal Learning Lounge",
  "subtitle": "Ruang publik untuk diskusi, literasi, dan showcase kecil",
  "category": "Public Facility",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "image": "/visuals/card-sp4.webp",
  "description": "Fasilitas yang memadukan sudut baca, ruang pertemuan, dan area kecil untuk diskusi komunitas atau pameran karya.",
  "tags": [
   "Library",
   "Community",
   "Public Space"
  ],
  "capacity": 30,
  "openingHours": "Belum tersedia — lokasi contoh",
  "lat": 1,
  "lng": 118.02
 },
 {
  "id": "f1",
  "slug": "kutim-creative-mapping-2026-2030",
  "kind": "initiative",
  "title": "Creative Economy Mapping 2026–2030",
  "subtitle": "Pemetaan pelaku, produk, ruang, dan potensi per kecamatan",
  "category": "Creative Economy",
  "district": "Sangatta Utara",
  "location": "Kabupaten Kutai Timur",
  "image": "/visuals/card-f1.webp",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Arah awal untuk membangun basis data ekosistem kreatif sebagai dasar perencanaan, promosi, dan pengembangan jaringan.",
  "tags": [
   "Roadmap",
   "Data",
   "2030"
  ],
  "date": "2026-12-01",
  "statusLabel": "Konsep KTCC"
 },
 {
  "id": "f2",
  "slug": "talent-upskilling-2030",
  "kind": "initiative",
  "title": "Talent Upskilling 2030",
  "subtitle": "Program peningkatan kapasitas untuk kreator dan pelaku usaha",
  "category": "Digital Economy",
  "district": "Sangatta Utara",
  "location": "Kabupaten Kutai Timur",
  "image": "/visuals/card-f2.webp",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Fokus pada pelatihan branding, konten, coding kreatif, pemasaran digital, dan manajemen produk untuk talenta lokal.",
  "tags": [
   "Talent",
   "Training",
   "2030"
  ],
  "date": "2030-01-01",
  "statusLabel": "Konsep KTCC"
 },
 {
  "id": "f3",
  "slug": "regional-creative-hub-2035",
  "kind": "initiative",
  "title": "Regional Creative Hub 2035",
  "subtitle": "Infrastruktur kolaborasi untuk ekosistem yang lebih terhubung",
  "category": "Infrastructure",
  "district": "Sangatta Utara",
  "location": "Kabupaten Kutai Timur",
  "image": "/visuals/card-f3.webp",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Pengembangan kawasan dan fasilitas yang mendukung pertumbuhan kreator, startup, event, dan aktivitas ekonomi kreatif.",
  "tags": [
   "Hub",
   "Infrastructure",
   "2035"
  ],
  "date": "2035-01-01",
  "statusLabel": "Konsep KTCC"
 },
 {
  "id": "f4",
  "slug": "green-creative-industries-2040",
  "kind": "initiative",
  "title": "Green Creative Industries 2040",
  "subtitle": "Transformasi menuju produk dan proses yang berkelanjutan",
  "category": "Environment",
  "district": "Bengalon",
  "location": "Kabupaten Kutai Timur",
  "image": "/visuals/card-f4.webp",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Mendorong adopsi material berkelanjutan, sirkularitas produk, dan desain yang lebih bertanggung jawab.",
  "tags": [
   "Sustainability",
   "Green Economy",
   "2040"
  ],
  "date": "2040-01-01",
  "statusLabel": "Konsep KTCC"
 },
 {
  "id": "f5",
  "slug": "inclusive-creative-kutim-2045",
  "kind": "initiative",
  "title": "Inclusive Creative Kutim 2045",
  "subtitle": "Ekosistem kreatif yang tumbuh, terhubung, dan berdampak",
  "category": "Creative Economy",
  "district": "Sangatta Utara",
  "location": "Kabupaten Kutai Timur",
  "image": "/visuals/card-f5.webp",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Visi jangka panjang untuk menjadikan kreativitas, talenta, dan transformasi digital sebagai bagian penting dari ekonomi Kutai Timur.",
  "tags": [
   "Vision",
   "2045",
   "Transformation"
  ],
  "date": "2045-01-01",
  "statusLabel": "Konsep KTCC"
 },
 {
  "id": "a1",
  "slug": "local-products-need-strong-storytelling",
  "kind": "article",
  "title": "Produk lokal butuh cerita yang kuat",
  "subtitle": "Mengapa foto, desain, dan narasi menaikkan nilai brand",
  "category": "Creative Stories",
  "district": "Sangatta Utara",
  "location": "Editorial KTCC",
  "image": "/visuals/card-a1.webp",
  "description": "Ulasan tentang bagaimana visual yang baik membantu produk lokal tampil lebih meyakinkan di marketplace, pameran, dan kanal digital.",
  "story": "Brand yang baik bukan hanya soal menjual barang, tetapi juga membangun persepsi, kepercayaan, dan pengalaman.",
  "tags": [
   "Editorial",
   "Branding",
   "UMKM"
  ]
 },
 {
  "id": "a2",
  "slug": "why-creative-spaces-matter",
  "kind": "article",
  "title": "Mengapa ruang kreatif itu penting?",
  "subtitle": "Dari coworking hingga makerspace, semua punya peran",
  "category": "Creative Stories",
  "district": "Sangatta Selatan",
  "location": "Editorial KTCC",
  "image": "/visuals/card-a2.webp",
  "description": "Ruang kreatif memberi tempat bertemu, belajar, bereksperimen, dan berkolaborasi sehingga ide dapat berkembang menjadi proyek nyata.",
  "story": "Ekosistem yang sehat membutuhkan ruang fisik untuk mempercepat percakapan, kepercayaan, dan kerja bersama.",
  "tags": [
   "Spaces",
   "Community",
   "Collaboration"
  ]
 },
 {
  "id": "a3",
  "slug": "a-new-generation-of-kutim-creatives",
  "kind": "article",
  "title": "Generasi baru kreator Kutim",
  "subtitle": "Talenta muda yang bergerak di desain, konten, dan teknologi",
  "category": "Creative Stories",
  "district": "Sangatta Utara",
  "location": "Editorial KTCC",
  "image": "/visuals/card-a3.webp",
  "description": "Potret talenta muda yang mulai membangun layanan kreatif, studio kecil, komunitas, dan proyek digital dari Kutai Timur.",
  "story": "Saat talenta, akses digital, dan jejaring bertemu, ekonomi kreatif tumbuh lebih cepat dan lebih inklusif.",
  "tags": [
   "Youth",
   "Creative Economy",
   "Talent"
  ]
 },
 {
  "id": "a4",
  "slug": "from-events-to-economic-impact",
  "kind": "article",
  "title": "Dari event menuju dampak ekonomi",
  "subtitle": "Cara festival dan showcase memicu perputaran peluang baru",
  "category": "Creative Stories",
  "district": "Sangatta Utara",
  "location": "Editorial KTCC",
  "image": "/visuals/card-a4.webp",
  "description": "Event yang dirancang dengan baik bukan hanya meriah, tetapi juga membuka transaksi, kolaborasi, dan visibilitas untuk brand lokal.",
  "story": "Pengunjung datang untuk pengalaman, namun pulang membawa cerita, koneksi, dan potensi transaksi baru.",
  "tags": [
   "Events",
   "Impact",
   "Market"
  ]
 },
 {
  "id": "co1",
  "slug": "sangatta-design-circle",
  "kind": "community",
  "title": "Sangatta Design Circle",
  "subtitle": "Komunitas terbuka untuk desain, ilustrasi, dan branding",
  "category": "Design",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-co1.webp",
  "description": "Komunitas yang rutin mengadakan sharing session, bedah karya, dan kolaborasi proyek kreatif lintas bidang.",
  "tags": [
   "Design",
   "Collaboration",
   "Community"
  ],
  "lat": -0.496,
  "lng": 117.556
 },
 {
  "id": "co2",
  "slug": "bengalon-photo-club",
  "kind": "community",
  "title": "Bengalon Photo Club",
  "subtitle": "Wadah belajar visual storytelling melalui fotografi",
  "category": "Photography",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "image": "/visuals/card-co2.webp",
  "description": "Komunitas fotografi yang aktif mengeksplorasi dokumentasi ruang, alam, produk, dan aktivitas komunitas.",
  "tags": [
   "Photography",
   "Visual Storytelling",
   "Community"
  ],
  "lat": 0.75,
  "lng": 117.55
 },
 {
  "id": "o1",
  "slug": "brand-refresh-for-local-coffee",
  "kind": "opportunity",
  "title": "Brand refresh untuk usaha kopi lokal",
  "subtitle": "Mencari desainer visual dan fotografer produk",
  "category": "Creative Project",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "image": "/visuals/card-o1.webp",
  "description": "Peluang kolaborasi untuk pengembangan identitas visual, kemasan, dan materi promosi bagi brand kopi lokal.",
  "tags": [
   "Designer",
   "Photographer",
   "Project"
  ]
 },
 {
  "id": "o2",
  "slug": "festival-content-team-2027",
  "kind": "opportunity",
  "title": "Festival content team 2027",
  "subtitle": "Membuka peluang untuk tim foto, video, dan media sosial",
  "category": "Collaboration",
  "district": "Sangatta Utara",
  "location": "Sangatta, Kutai Timur",
  "image": "/visuals/card-o2.webp",
  "description": "Kolaborasi untuk mendokumentasikan festival, membuat highlight video, dan memperkuat distribusi konten digital event.",
  "tags": [
   "Content",
   "Event",
   "Collaboration"
  ]
 },
 {
  "id": "p7",
  "slug": "batik-pesisir-tote",
  "kind": "product",
  "title": "Batik Pesisir Tote",
  "subtitle": "Tas kanvas bermotif pesisir untuk kegiatan harian",
  "category": "Fashion",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "description": "Merchandise lokal dengan ilustrasi pesisir dan bahan kanvas tahan pakai. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Fashion",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 169000,
  "image": "/visuals/card-p7.webp"
 },
 {
  "id": "p8",
  "slug": "sangatta-everyday-tumbler",
  "kind": "product",
  "title": "Sangatta Everyday Tumbler",
  "subtitle": "Botol minum dengan identitas visual Kutim",
  "category": "Merchandise",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Tumbler minimalis dengan grafis yang terinspirasi lanskap hutan dan pesisir. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Merchandise",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 129000,
  "image": "/visuals/card-p8.webp"
 },
 {
  "id": "p9",
  "slug": "hampers-rimba-kaltim",
  "kind": "product",
  "title": "Hampers Rimba Kaltim",
  "subtitle": "Paket pilihan produk kreatif dalam kemasan premium",
  "category": "Gift Set",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Hampers kurasi kopi, camilan, kartu ilustrasi, dan aksesori buatan kreator. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Gift Set",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 239000,
  "image": "/visuals/card-p9.webp"
 },
 {
  "id": "p10",
  "slug": "kerajinan-kayu-rantau",
  "kind": "product",
  "title": "Kerajinan Kayu Rantau",
  "subtitle": "Dekorasi meja dengan sentuhan ukiran geometris",
  "category": "Home & Living",
  "district": "Rantau Pulung",
  "location": "Rantau Pulung, Kutai Timur",
  "description": "Kerajinan kayu kontemporer untuk dekorasi dan hadiah kreatif. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Home & Living",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 215000,
  "image": "/visuals/card-p10.webp"
 },
 {
  "id": "p11",
  "slug": "notebook-jejak-kutim",
  "kind": "product",
  "title": "Notebook Jejak Kutim",
  "subtitle": "Buku catatan ilustrasi flora dan budaya",
  "category": "Stationery",
  "district": "Muara Wahau",
  "location": "Muara Wahau, Kutai Timur",
  "description": "Seri buku catatan untuk pelajar, pekerja kreatif, dan komunitas. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Stationery",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 68000,
  "image": "/visuals/card-p11.webp"
 },
 {
  "id": "p12",
  "slug": "kutim-creative-cap",
  "kind": "product",
  "title": "Kutim Creative Cap",
  "subtitle": "Topi komunitas dengan embroidery minimalis",
  "category": "Apparel",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Topi kasual dengan warna navy dan aksen lima warna identitas KTCC. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Apparel",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 115000,
  "image": "/visuals/card-p12.webp"
 },
 {
  "id": "p13",
  "slug": "paket-kopi-lokal-pilihan",
  "kind": "product",
  "title": "Paket Kopi Lokal Pilihan",
  "subtitle": "Kurasi kopi dengan desain kemasan baru",
  "category": "Food & Beverage",
  "district": "Kaliorang",
  "location": "Kaliorang, Kutai Timur",
  "description": "Koleksi kemasan produk kopi untuk menjangkau pasar digital lebih luas. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Food & Beverage",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 159000,
  "image": "/visuals/card-p13.webp"
 },
 {
  "id": "p14",
  "slug": "koleksi-poster-rimba",
  "kind": "product",
  "title": "Koleksi Poster Rimba",
  "subtitle": "Cetak seni bertema hutan hujan Kalimantan",
  "category": "Art & Print",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "description": "Ilustrasi lanskap dan satwa hutan yang dikemas sebagai karya dinding. Harga dan produk adalah contoh visual, bukan penawaran jual aktual.",
  "tags": [
   "Art & Print",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 89000,
  "image": "/visuals/card-p14.webp"
 },
 {
  "id": "d5",
  "slug": "forest-motion-pack",
  "kind": "digital",
  "title": "Forest Motion Pack",
  "subtitle": "Animasi transisi untuk brand dan video kreatif",
  "category": "Motion Graphic",
  "district": "Sangatta Utara",
  "location": "Kutai Timur",
  "description": "Aset animasi bertema alam dan teknologi untuk konten digital.",
  "tags": [
   "Motion Graphic",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 129000,
  "image": "/visuals/card-d5.webp"
 },
 {
  "id": "d6",
  "slug": "kutim-creator-font",
  "kind": "digital",
  "title": "Kutim Creator Font",
  "subtitle": "Tipografi ekspresif untuk proyek editorial",
  "category": "Typography",
  "district": "Bengalon",
  "location": "Kutai Timur",
  "description": "Jenis huruf display konseptual untuk poster, merchandise, dan kampanye.",
  "tags": [
   "Typography",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 95000,
  "image": "/visuals/card-d6.webp"
 },
 {
  "id": "d7",
  "slug": "borneo-3d-props",
  "kind": "digital",
  "title": "Borneo 3D Props",
  "subtitle": "Objek digital untuk game dan visualisasi",
  "category": "3D Model",
  "district": "Kongbeng",
  "location": "Kutai Timur",
  "description": "Koleksi aset 3D bertema produk kreatif dan alam tropis.",
  "tags": [
   "3D Model",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 185000,
  "image": "/visuals/card-d7.webp"
 },
 {
  "id": "d8",
  "slug": "pesisir-lut-collection",
  "kind": "digital",
  "title": "Pesisir LUT Collection",
  "subtitle": "Pewarnaan video dengan atmosfer pesisir",
  "category": "Photo & Video",
  "district": "Sangkulirang",
  "location": "Kutai Timur",
  "description": "Preset warna untuk film pendek, dokumenter, dan konten wisata.",
  "tags": [
   "Photo & Video",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 79000,
  "image": "/visuals/card-d8.webp"
 },
 {
  "id": "d9",
  "slug": "kutim-ui-starter",
  "kind": "digital",
  "title": "Kutim UI Starter",
  "subtitle": "Komponen antarmuka untuk aplikasi dan website",
  "category": "UI Template",
  "district": "Sangatta Selatan",
  "location": "Kutai Timur",
  "description": "Template UI responsif dengan palet warna identitas KTCC.",
  "tags": [
   "UI Template",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 149000,
  "image": "/visuals/card-d9.webp"
 },
 {
  "id": "d10",
  "slug": "lentera-audio-loops",
  "kind": "digital",
  "title": "Lentera Audio Loops",
  "subtitle": "Paket musik latar untuk konten kreatif",
  "category": "Music Asset",
  "district": "Muara Wahau",
  "location": "Kutai Timur",
  "description": "Audio loop untuk reels, motion graphic, dan video komunitas.",
  "tags": [
   "Music Asset",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 69000,
  "image": "/visuals/card-d10.webp"
 },
 {
  "id": "d11",
  "slug": "digital-postcard-kutim",
  "kind": "digital",
  "title": "Digital Postcard Kutim",
  "subtitle": "Ilustrasi digital siap cetak dan dibagikan",
  "category": "Digital Art",
  "district": "Teluk Pandan",
  "location": "Kutai Timur",
  "description": "Seri ilustrasi destinasi, alam, dan semangat kreatif daerah.",
  "tags": [
   "Digital Art",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 49000,
  "image": "/visuals/card-d11.webp"
 },
 {
  "id": "d12",
  "slug": "brand-deck-umkm",
  "kind": "digital",
  "title": "Brand Deck UMKM",
  "subtitle": "Template pitch deck dan katalog produk",
  "category": "Presentation",
  "district": "Sangatta Utara",
  "location": "Kutai Timur",
  "description": "Aset presentasi yang memudahkan UMKM menawarkan produk ke mitra.",
  "tags": [
   "Presentation",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "price": 89000,
  "image": "/visuals/card-d12.webp"
 },
 {
  "id": "c7",
  "slug": "rani-karya-studio",
  "kind": "creator",
  "title": "Rani Karya Studio",
  "subtitle": "Desainer kemasan dan branding UMKM",
  "category": "Graphic Designer",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Portofolio identitas visual, kemasan, dan materi promosi digital.",
  "tags": [
   "Graphic Designer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c7.webp"
 },
 {
  "id": "c8",
  "slug": "kirana-visual-stories",
  "kind": "creator",
  "title": "Kirana Visual Stories",
  "subtitle": "Videografer dokumenter dan campaign",
  "category": "Videographer",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Memproduksi dokumenter pendek dan konten promosi untuk pelaku lokal.",
  "tags": [
   "Videographer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c8.webp"
 },
 {
  "id": "c9",
  "slug": "bima-product-lab",
  "kind": "creator",
  "title": "Bima Product Lab",
  "subtitle": "Fotografer produk dan lifestyle",
  "category": "Photographer",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Menghasilkan foto produk yang lebih kompetitif untuk katalog dan retail.",
  "tags": [
   "Photographer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c9.webp"
 },
 {
  "id": "c10",
  "slug": "ayu-motion-house",
  "kind": "creator",
  "title": "Ayu Motion House",
  "subtitle": "Animator 2D dan konten edukasi",
  "category": "Animator",
  "district": "Muara Wahau",
  "location": "Muara Wahau, Kutai Timur",
  "description": "Membuat explainer video, karakter, dan motion social campaign.",
  "tags": [
   "Animator",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c10.webp"
 },
 {
  "id": "c11",
  "slug": "borneo-dev-collective",
  "kind": "creator",
  "title": "Borneo Dev Collective",
  "subtitle": "Developer web dan aplikasi kreatif",
  "category": "Developer",
  "district": "Kongbeng",
  "location": "Kongbeng, Kutai Timur",
  "description": "Menciptakan website interaktif dan alat digital untuk komunitas.",
  "tags": [
   "Developer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c11.webp"
 },
 {
  "id": "c12",
  "slug": "tara-fashion-atelier",
  "kind": "creator",
  "title": "Tara Fashion Atelier",
  "subtitle": "Fashion stylist dan kreator merchandise",
  "category": "Fashion Designer",
  "district": "Kaliorang",
  "location": "Kaliorang, Kutai Timur",
  "description": "Mengembangkan koleksi apparel dengan identitas kreatif lokal.",
  "tags": [
   "Fashion Designer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c12.webp"
 },
 {
  "id": "c13",
  "slug": "nusa-sound-lab",
  "kind": "creator",
  "title": "Nusa Sound Lab",
  "subtitle": "Pencipta musik dan sound design",
  "category": "Musician",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "description": "Studio konseptual untuk sonic branding dan musik konten.",
  "tags": [
   "Musician",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c13.webp"
 },
 {
  "id": "c14",
  "slug": "arunika-photoworks",
  "kind": "creator",
  "title": "Arunika Photoworks",
  "subtitle": "Fotografi event dan foto editorial",
  "category": "Photographer",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Dokumentasi kegiatan kreatif, komunitas dan cerita manusia.",
  "tags": [
   "Photographer",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-c14.webp"
 },
 {
  "id": "e6",
  "slug": "kutim-illustration-meetup",
  "kind": "event",
  "title": "Kutim Illustration Meetup",
  "subtitle": "Berbagi proses dan portofolio ilustrasi",
  "category": "Art",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Diskusi visual, sesi kritik karya, dan jejaring antar ilustrator.",
  "tags": [
   "Art",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-07-10",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e6.webp"
 },
 {
  "id": "e7",
  "slug": "photography-walk-pesisir",
  "kind": "event",
  "title": "Photography Walk Pesisir",
  "subtitle": "Eksplorasi cerita visual alam pesisir",
  "category": "Photography",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "description": "Workshop fotografi luar ruang dan pameran foto komunitas.",
  "tags": [
   "Photography",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-08-14",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e7.webp"
 },
 {
  "id": "e8",
  "slug": "umkm-branding-clinic",
  "kind": "event",
  "title": "UMKM Branding Clinic",
  "subtitle": "Pendampingan kemasan, foto dan promosi",
  "category": "Workshop",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Sesi pendampingan branding praktis untuk pelaku usaha lokal.",
  "tags": [
   "Workshop",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-09-11",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e8.webp"
 },
 {
  "id": "e9",
  "slug": "kutim-digital-art-showcase",
  "kind": "event",
  "title": "Kutim Digital Art Showcase",
  "subtitle": "Pameran ilustrasi, 3D dan motion graphic",
  "category": "Exhibition",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Showcase kreator digital untuk membangun audiens dan kolaborasi.",
  "tags": [
   "Exhibition",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-10-02",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e9.webp"
 },
 {
  "id": "e10",
  "slug": "borneo-makers-weekend",
  "kind": "event",
  "title": "Borneo Makers Weekend",
  "subtitle": "Kegiatan kolaborasi kriya dan kreator",
  "category": "Festival",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "description": "Pasar kreatif, lokakarya kerajinan, dan sesi berbagi pengalaman.",
  "tags": [
   "Festival",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-11-20",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e10.webp"
 },
 {
  "id": "e11",
  "slug": "founders-night-kutim",
  "kind": "event",
  "title": "Founders Night Kutim",
  "subtitle": "Sesi pitching dan mentor untuk ide usaha",
  "category": "Startup",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Pertemuan founder, mentor, komunitas teknologi, dan calon mitra.",
  "tags": [
   "Startup",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2027-12-04",
  "organizer": "Contoh acara KTCC — belum ada pendaftaran resmi",
  "image": "/visuals/card-e11.webp"
 },
 {
  "id": "s5",
  "slug": "tumbuh-agri-digital",
  "kind": "startup",
  "title": "Tumbuh Agri Digital",
  "subtitle": "Solusi pemasaran digital untuk produk pangan",
  "category": "AgriTech",
  "district": "Rantau Pulung",
  "location": "Rantau Pulung, Kutai Timur",
  "description": "Inisiatif teknologi untuk katalog dan koneksi pasokan produk pertanian lokal.",
  "tags": [
   "AgriTech",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "stage": "Prototype",
  "image": "/visuals/card-s5.webp"
 },
 {
  "id": "s6",
  "slug": "kutim-eventos",
  "kind": "startup",
  "title": "Kutim EventOS",
  "subtitle": "Platform operasional event dan tiket",
  "category": "EventTech",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Gagasan layanan manajemen acara kreatif, pendaftaran, dan check-in.",
  "tags": [
   "EventTech",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "stage": "MVP",
  "image": "/visuals/card-s6.webp"
 },
 {
  "id": "s7",
  "slug": "karya-studio-cloud",
  "kind": "startup",
  "title": "Karya Studio Cloud",
  "subtitle": "Ruang kerja daring untuk tim kreatif",
  "category": "CreatorTech",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Kolaborasi tugas, portofolio, dan revisi proyek kreatif pada satu platform.",
  "tags": [
   "CreatorTech",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "stage": "Ideation",
  "image": "/visuals/card-s7.webp"
 },
 {
  "id": "s8",
  "slug": "lokalpay-commerce",
  "kind": "startup",
  "title": "LokalPay Commerce",
  "subtitle": "Pencatatan transaksi dan toko usaha mikro",
  "category": "FinTech",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Konsep alat transaksi dan laporan sederhana untuk usaha kreatif.",
  "tags": [
   "FinTech",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "stage": "Prototype",
  "image": "/visuals/card-s8.webp"
 },
 {
  "id": "s9",
  "slug": "pesisir-experience-id",
  "kind": "startup",
  "title": "Pesisir Experience ID",
  "subtitle": "Cerita wisata dan aktivitas kreatif pesisir",
  "category": "TravelTech",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "description": "Layanan eksplorasi pengalaman lokal dengan cerita visual dan komunitas.",
  "tags": [
   "TravelTech",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "stage": "Ideation",
  "image": "/visuals/card-s9.webp"
 },
 {
  "id": "sp5",
  "slug": "kutim-design-corner",
  "kind": "space",
  "title": "Kutim Design Corner",
  "subtitle": "Sudut diskusi, presentasi dan kolaborasi",
  "category": "Creative Space",
  "district": "Muara Wahau",
  "location": "Muara Wahau, Kutai Timur",
  "description": "Ruang komunitas konseptual dengan meja kerja, area sketsa, dan layar presentasi.",
  "tags": [
   "Creative Space",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "capacity": 16,
  "openingHours": "Belum tersedia — lokasi contoh",
  "image": "/visuals/card-sp5.webp"
 },
 {
  "id": "sp6",
  "slug": "ruang-ide-kaliorang",
  "kind": "space",
  "title": "Ruang Ide Kaliorang",
  "subtitle": "Workshop kreatif dan diskusi kelompok",
  "category": "Community Space",
  "district": "Kaliorang",
  "location": "Kaliorang, Kutai Timur",
  "description": "Ruang pelatihan dan berkegiatan untuk komunitas kreatif.",
  "tags": [
   "Community Space",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "capacity": 32,
  "openingHours": "Belum tersedia — lokasi contoh",
  "image": "/visuals/card-sp6.webp"
 },
 {
  "id": "sp7",
  "slug": "pesisir-podcast-studio",
  "kind": "space",
  "title": "Pesisir Podcast Studio",
  "subtitle": "Studio audio dan video untuk kreator",
  "category": "Studio",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "description": "Fasilitas studio konseptual bagi kreator podcast dan storytelling.",
  "tags": [
   "Studio",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "capacity": 7,
  "openingHours": "Belum tersedia — lokasi contoh",
  "image": "/visuals/card-sp7.webp"
 },
 {
  "id": "sp8",
  "slug": "sangatta-creative-hall",
  "kind": "space",
  "title": "Sangatta Creative Hall",
  "subtitle": "Venue kegiatan, bazar dan showcase",
  "category": "Event Space",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Venue multifungsi untuk komunitas, pameran, dan festival.",
  "tags": [
   "Event Space",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "capacity": 120,
  "openingHours": "Belum tersedia — lokasi contoh",
  "image": "/visuals/card-sp8.webp"
 },
 {
  "id": "sp9",
  "slug": "kongbeng-makers-lab",
  "kind": "space",
  "title": "Kongbeng Makers Lab",
  "subtitle": "Area percobaan desain dan prototipe",
  "category": "Makerspace",
  "district": "Kongbeng",
  "location": "Kongbeng, Kutai Timur",
  "description": "Ruang berbagi peralatan dan pelatihan produksi kreatif.",
  "tags": [
   "Makerspace",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "capacity": 20,
  "openingHours": "Belum tersedia — lokasi contoh",
  "image": "/visuals/card-sp9.webp"
 },
 {
  "id": "f6",
  "slug": "creative-market-expansion-2032",
  "kind": "initiative",
  "title": "Creative Market Expansion 2032",
  "subtitle": "Perluasan akses pasar produk kreatif digital",
  "category": "Digital Economy",
  "district": "Sangatta Utara",
  "location": "Kutai Timur",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Skenario KTCC tentang layanan kurasi dan promosi produk lokal lintas pasar.",
  "tags": [
   "KTCC Concept",
   "Perlu sumber resmi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2032-01-01",
  "statusLabel": "Konsep KTCC",
  "image": "/visuals/card-f6.webp"
 },
 {
  "id": "f7",
  "slug": "creative-tourism-network-2037",
  "kind": "initiative",
  "title": "Creative Tourism Network 2037",
  "subtitle": "Jejaring wisata, budaya dan komunitas kreatif",
  "category": "Tourism",
  "district": "Sangatta Utara",
  "location": "Kutai Timur",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Skenario pengembangan kolaborasi pelaku wisata dan kreator konten.",
  "tags": [
   "KTCC Concept",
   "Perlu sumber resmi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2037-01-01",
  "statusLabel": "Konsep KTCC",
  "image": "/visuals/card-f7.webp"
 },
 {
  "id": "f8",
  "slug": "digital-creative-talent-2042",
  "kind": "initiative",
  "title": "Digital Creative Talent 2042",
  "subtitle": "Penguatan kompetensi kreatif sepanjang hayat",
  "category": "Education",
  "district": "Sangatta Utara",
  "location": "Kutai Timur",
  "description": "SKENARIO KONSEPTUAL KTCC (belum merupakan proyek resmi pemerintah/swasta): Skenario pembelajaran talenta digital melalui pelatihan dan proyek nyata.",
  "tags": [
   "KTCC Concept",
   "Perlu sumber resmi"
  ],
  "featured": false,
  "isKutim": true,
  "date": "2042-01-01",
  "statusLabel": "Konsep KTCC",
  "image": "/visuals/card-f8.webp"
 },
 {
  "id": "a5",
  "slug": "dari-hobi-menjadi-profesi-kreatif",
  "kind": "article",
  "title": "Dari hobi menjadi profesi kreatif",
  "subtitle": "Langkah membangun portofolio yang menarik",
  "category": "Creative Stories",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Panduan editorial menyusun portofolio, promosi dan jejaring klien.",
  "tags": [
   "Creative Stories",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-a5.webp"
 },
 {
  "id": "a6",
  "slug": "merchandise-yang-membawa-cerita",
  "kind": "article",
  "title": "Merchandise yang membawa cerita",
  "subtitle": "Kreativitas dan desain untuk produk bernilai",
  "category": "Creative Stories",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Ulasan pendekatan desain merchandise yang mengangkat kisah lokal.",
  "tags": [
   "Creative Stories",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-a6.webp"
 },
 {
  "id": "a7",
  "slug": "kreator-digital-di-era-ai",
  "kind": "article",
  "title": "Kreator digital di era AI",
  "subtitle": "Kolaborasi manusia dan teknologi untuk ide baru",
  "category": "Creative Stories",
  "district": "Kongbeng",
  "location": "Kongbeng, Kutai Timur",
  "description": "Sudut pandang praktis menggunakan AI sebagai pendamping karya.",
  "tags": [
   "Creative Stories",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-a7.webp"
 },
 {
  "id": "a8",
  "slug": "saat-komunitas-bertemu-teknologi",
  "kind": "article",
  "title": "Saat komunitas bertemu teknologi",
  "subtitle": "Peluang kolaborasi untuk ekosistem kreatif",
  "category": "Creative Stories",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Inspirasi kolaborasi komunitas dan startup untuk menjawab tantangan lokal.",
  "tags": [
   "Creative Stories",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-a8.webp"
 },
 {
  "id": "co3",
  "slug": "kutim-creative-coders",
  "kind": "community",
  "title": "Kutim Creative Coders",
  "subtitle": "Belajar dan berbagi proyek coding kreatif",
  "category": "Technology",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Komunitas konseptual pengembangan web, game, dan eksperimen digital.",
  "tags": [
   "Technology",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-co3.webp"
 },
 {
  "id": "co4",
  "slug": "pesisir-makers-circle",
  "kind": "community",
  "title": "Pesisir Makers Circle",
  "subtitle": "Komunitas kriya dan usaha kreatif pesisir",
  "category": "Craft",
  "district": "Sangkulirang",
  "location": "Sangkulirang, Kutai Timur",
  "description": "Ruang ide dan karya handmade bagi pelaku usaha kecil dan kreator.",
  "tags": [
   "Craft",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-co4.webp"
 },
 {
  "id": "co5",
  "slug": "borneo-digital-illustrators",
  "kind": "community",
  "title": "Borneo Digital Illustrators",
  "subtitle": "Jejaring ilustrator dari Kutim dan Kaltim",
  "category": "Illustration",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Kolaborasi ilustrasi, pameran, dan pertukaran portofolio.",
  "tags": [
   "Illustration",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-co5.webp"
 },
 {
  "id": "co6",
  "slug": "green-design-collective",
  "kind": "community",
  "title": "Green Design Collective",
  "subtitle": "Mendorong desain yang peduli lingkungan",
  "category": "Sustainable Design",
  "district": "Kaliorang",
  "location": "Kaliorang, Kutai Timur",
  "description": "Eksplorasi bahan, kemasan, dan konsep ekonomi kreatif berkelanjutan.",
  "tags": [
   "Sustainable Design",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-co6.webp"
 },
 {
  "id": "o3",
  "slug": "desain-katalog-produk-umkm",
  "kind": "opportunity",
  "title": "Desain katalog produk UMKM",
  "subtitle": "Kolaborasi desainer untuk katalog digital",
  "category": "Creative Project",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Contoh brief untuk proyek desain katalog produk dan foto komersial.",
  "tags": [
   "Creative Project",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o3.webp"
 },
 {
  "id": "o4",
  "slug": "video-profil-komunitas",
  "kind": "opportunity",
  "title": "Video profil komunitas",
  "subtitle": "Mencari tim videografi dan editing",
  "category": "Content Production",
  "district": "Bengalon",
  "location": "Bengalon, Kutai Timur",
  "description": "Contoh peluang konten dokumenter singkat untuk komunitas.",
  "tags": [
   "Content Production",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o4.webp"
 },
 {
  "id": "o5",
  "slug": "website-portofolio-kreator",
  "kind": "opportunity",
  "title": "Website portofolio kreator",
  "subtitle": "Kolaborasi developer dan desainer UI",
  "category": "Digital Project",
  "district": "Kongbeng",
  "location": "Kongbeng, Kutai Timur",
  "description": "Contoh proyek pengembangan website portfolio kreator lokal.",
  "tags": [
   "Digital Project",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o5.webp"
 },
 {
  "id": "o6",
  "slug": "workshop-kemasan-kreatif",
  "kind": "opportunity",
  "title": "Workshop kemasan kreatif",
  "subtitle": "Mencari fasilitator branding produk",
  "category": "Workshop",
  "district": "Sangatta Selatan",
  "location": "Sangatta Selatan, Kutai Timur",
  "description": "Contoh panggilan fasilitator untuk pelatihan kemasan dan brand.",
  "tags": [
   "Workshop",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o6.webp"
 },
 {
  "id": "o7",
  "slug": "fotografi-untuk-katalog-merch",
  "kind": "opportunity",
  "title": "Fotografi untuk katalog merch",
  "subtitle": "Mencari fotografer lifestyle dan produk",
  "category": "Photography",
  "district": "Sangatta Utara",
  "location": "Sangatta Utara, Kutai Timur",
  "description": "Contoh brief foto produk untuk merchandise kreatif.",
  "tags": [
   "Photography",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o7.webp"
 },
 {
  "id": "o8",
  "slug": "ilustrasi-visual-festival",
  "kind": "opportunity",
  "title": "Ilustrasi visual festival",
  "subtitle": "Kolaborasi ilustrator untuk poster dan motion",
  "category": "Illustration",
  "district": "Teluk Pandan",
  "location": "Teluk Pandan, Kutai Timur",
  "description": "Contoh kesempatan kontribusi aset visual acara kreatif.",
  "tags": [
   "Illustration",
   "Kutim Creative",
   "Kolaborasi"
  ],
  "featured": false,
  "isKutim": true,
  "image": "/visuals/card-o8.webp"
 }
];

export const currency = (value: number) => "Rp" + new Intl.NumberFormat("id-ID").format(value);
export const prettyDate = (date: string) => new Intl.DateTimeFormat("id-ID", { day:"numeric",month:"long",year:"numeric" }).format(new Date(date + "T12:00:00"));
export const kindLabel: Record<Kind,string> = { product:"Produk", digital:"Digital Art", creator:"Kreator", event:"Event", startup:"Startup", space:"Creative Space", initiative:"Roadmap", community:"Komunitas", opportunity:"Peluang", article:"Creative Story" };
export const navLinks = [
 {label:"Discover",href:"/discover"},{label:"Market",href:"/market"},{label:"Creators",href:"/creators"},{label:"Events",href:"/events"},{label:"Startups",href:"/startups"},{label:"Spaces",href:"/spaces"},{label:"Kutim 2045",href:"/future"}
];
