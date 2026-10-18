# Kutai Timur Creative Center (KTCC)

**Kutim First — Kaltim Connected — Global Ready.**

Aplikasi Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion dan Supabase untuk publikasi ekonomi kreatif Kabupaten Kutai Timur.

## CMS admin v3

- Login khusus di `/admin/login` dengan **username `admin`** dan password yang dipasang melalui Supabase Auth.
- Backend PostgreSQL + Supabase Auth + Storage; **RLS memproteksi semua operasi tulis**.
- `/admin`: halaman, blok konten, katalog, teks beranda, Visual Editor langsung, warna, maskot Cece, pustaka media, **tampil/sembunyikan bagian beranda**, pengaturan situs, menu dan permintaan.
- Media: PNG, JPG, WebP, AVIF, GIF, MP4, WebM.
- Maskot Cece adalah **gambar PNG statis** pada beranda, dengan gambar kedua untuk bagian pengenalan maskot. Kedua visual dapat diganti lewat CMS.
- `/?ktccEdit=1` untuk penyuntingan langsung, hanya bagi administrator terverifikasi yang sudah login.
- Tampilan publik menggunakan data yang benar-benar diterbitkan, bukan contoh yang disamarkan sebagai data resmi.

**Baca [ADMIN_SETUP.md](./ADMIN_SETUP.md) untuk petunjuk lengkap** membuat backend, mengaktifkan user, menggunakan editor, dan melakukan deployment ke Vercel.

### Menjalankan project

```bash
npm install
cp .env.example .env.local
# isi kredensial Supabase dan email admin
# jalankan ketiga migrasi SQL di Supabase SQL Editor
npm run setup:admin  # satu kali dari terminal untuk membuat user admin
npm run dev
```

### Berkas penting

```text
app/admin/login/page.tsx       Halaman login admin
components/AdminLogin.tsx      Login username admin -> Supabase Auth
components/AdminPage.tsx       Dashboard Content Studio dan semua editor
components/VisualCmsRuntime.tsx Visual editor live pada frontend
components/SiteTheme.tsx       Aplikasi palet dari backend
components/HomePage.tsx        Homepage dan Cece PNG
lib/cms.ts                     Field teks, pengaturan, serta pembaca CMS
supabase/schema.sql            User profile, listing, auth RLS
supabase/cms_migration.sql     Halaman, blok, setting, media, request RLS
supabase/visual_editor_migration.sql  Override konten visual RLS
scripts/setup-admin.mjs        Bootstrap pengguna admin dengan password tersembunyi
```

### Status pengujian

Pemeriksaan sintaks TypeScript dan pemeriksaan statis CMS dilakukan di lingkungan pembuatan. Karena node_modules/npm registry tidak tersedia, instalasi paket, build Next.js penuh, serta login/database end-to-end **belum diverifikasi**. Sebelum rilis jalankan `npm install`, `npm run build`, dan tes semua alur dengan proyek Supabase khusus KTCC.

Jangan simpan admin password atau `SUPABASE_SERVICE_ROLE_KEY` ke Git; file `.env.local` sudah diabaikan melalui `.gitignore`.

## Rilis V5 — Running text KUTIM HEBAT 2045 dan Bahasa ID / EN

- Tepat sebelum seksi profil maskot Cece terdapat running text tanpa putus: empat kali tulisan **✦ KUTIM HEBAT 2045**. Setiap tulisan berwarna hijau, biru, ungu, dan merah; simbol `✦` berwarna kuning. Warna diwariskan dari palet logo dalam menu **Warna**.
- Animasi marquee berhenti ketika diarahkan kursor; untuk pengguna dengan setelan *reduced motion* animasi tidak berjalan, dan tulisan tetap dapat digulir secara horizontal.
- Header desktop dan mobile menampilkan ikon bendera SVG Indonesia / Amerika Serikat disertai **ID** dan **EN**. Bahasa standar adalah **Indonesia**, dan pilihan disimpan di browser memakai key `ktcc-language`.
- Admin `/admin` → **Teks ID / EN** dapat mengubah teks bawaan beranda dan penjelasan maskot dalam kedua bahasa secara terpisah. Database menggunakan `site_settings.copy_id` dan `site_settings.copy_en`.
- Admin → **Terjemahan Halaman** mengelola label menu, teks halaman, teks blok, dan teks katalog dalam bahasa Inggris melalui `site_settings.translations_en` tanpa mengubah skema database. Bahasa Indonesia adalah konten dasar yang diedit di Halaman/Blok/Katalog. Jika terjemahan EN belum diisi untuk konten baru, teks asli tetap muncul (tidak ada terjemahan otomatis yang dibuat-buat).
- Admin → **Maskot Cece** juga bisa mengubah teks running text dan kecepatan putaran serta mengaktifkan/menonaktifkannya. Pengaturan disimpan di `site_settings.cece_ticker`.
- Admin → **Bagian Beranda** dapat menampilkan atau menyembunyikan running text melalui **Running text KUTIM HEBAT 2045**.

### Aktivasi dan batas pengujian

Fitur CMS membutuhkan Supabase aktif, migrasi yang disertakan dan akun admin sesuai `ADMIN_SETUP.md`. Jangan menyimpan password administrator di file frontend. Semua contoh data yang belum diverifikasi tetap bersifat konten demo. Validasi sintaks TypeScript/JavaScript dan audit CMS telah dilakukan; build produksi Next.js dan login ke Supabase belum dapat divalidasi tanpa dependensi serta proyek database aktif.

## Revisi KTCC V7 (header, Cece, footer)
- Tulisan *KUTIM FIRST ↗ GLOBAL READY* di kanan baris atas header dihapus dari versi ID dan EN.
- Visual hero Cece memiliki lima bentuk geometri kecil (lingkaran hijau, belah ketupat biru, heksagon ungu, segitiga merah, bintang kuning) yang berputar pelan di belakang karakter. Animasi berhenti otomatis jika pengguna mengaktifkan pengurangan gerak (`prefers-reduced-motion`). Warna merujuk token CSS palet KTCC.
- Footer diperluas dengan deskripsi Indonesia/Inggris dan ikon YouTube, Instagram, TikTok, Threads.
- CMS: buka `/admin` → **Branding & identitas website** untuk mengubah deskripsi footer ID/EN dan mengisi tautan akun media sosial HTTPS. Ikon tetap terlihat namun tidak bisa diklik sebelum tautan disediakan; proyek tidak mengarang akun resmi KTCC.
- Pratinjau HTML adalah *standalone demo* dengan URL sosial kosong; data contoh di pratinjau bukan klaim layanan/akun resmi. Backend Supabase tetap harus dikonfigurasi sebelum CMS produksi digunakan.

## V9 — Editorial Content & Visual Refresh (99 sample entries)

This release adds 99 *conceptual, fictional* listings illustrated by unique locally stored WebP card images.
Categories: 14 physical products, 12 digital products, 14 creators, 11 events, 9 startups, 9 spaces, 8 scenario initiatives, 8 editorial stories, 6 communities and 8 collaboration opportunities.

The ten section artwork collections (Discover, Market, Digital, Creators, Events, Startups, Spaces, Future 2045, Stories and Impact) use KTCC's green/blue/purple/red/yellow color palette. The homepage preserves Cece, the five rotating geometric shapes and ID/EN switcher. The footer description now wraps across readable lines.

CMS page hero media can be replaced by the administrator, overriding the built-in visual automatically. Catalogue images are also editable in the media library/listing manager.

**Data integrity:** Names, prices, venues, event dates and future initiatives in the standalone HTML are illustrative demonstration content, not verified real-world listings or official government plans. The production Next.js app requires Supabase and intentionally does *not* expose these examples as published listings. To use them in local development only, set `NEXT_PUBLIC_KTCC_SAMPLE_CONTENT=true` in `.env.local` and run `npm run dev`; they remain disabled for production builds. Replace sample material with verified Kutai Timur data through the CMS before deploying the real site.

Run `npm install`, `npm run build`, and an end-to-end database/login test before release; only syntax and preview-route audits were performed here.
