# KTCC Content Studio — Panduan Administrator

## 1. Apa yang sudah tersedia?

Proyek Next.js ini mencakup **login `/admin/login`**, **Content Studio `/admin`**, Supabase Auth, PostgreSQL + RLS, pengelola media (foto/GIF/video), editor teks, katalog, halaman, blok konten, navigasi, warna, maskot Cece, dan **Editor Visual langsung pada halaman publik**.

Nama pengguna (`username`) yang tersedia di antarmuka: **`admin`**. Password **tidak pernah ditanam** di HTML, JavaScript frontend, kode ZIP, atau SQL. Password yang Anda pilih harus diberikan **sekali melalui terminal setup** dan disimpan oleh Supabase Auth; frontend hanya mengirimnya ke endpoint autentikasi yang aman.

**Tidak ada login aktif sampai proyek Supabase dikonfigurasi, migrasi SQL dijalankan, dan akun admin dibuat.**

## 2. Instalasi proyek

Persyaratan: Node.js 20.9+ (disarankan 22), npm.

```bash
npm install
cp .env.example .env.local
```

Pada Windows, salin `.env.example` menjadi `.env.local` lewat Explorer jika tidak menggunakan terminal Git Bash.

## 3. Membuat database KTCC

Buat proyek Supabase khusus KTCC dengan memilih organisasi yang Anda miliki. Jangan memakai project aplikasi lain untuk menyimpan data KTCC.

Di Supabase **SQL Editor**, jalankan file dalam urutan:

1. `supabase/schema.sql`
2. `supabase/cms_migration.sql`
3. `supabase/visual_editor_migration.sql`

Ketiganya wajib; migrasi ketiga mengaktifkan editor visual lintas frontend.

## 4. Environment variable

Isi `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-KTCC-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_SUPABASE_PUBLISHABLE_OR_ANON_KEY
NEXT_PUBLIC_KTCC_ADMIN_EMAIL=alamat-email-admin-yang-anda-kuasai@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_KTCC_SAMPLE_CONTENT=false
```

Email administrator tersebut adalah identitas teknis di Supabase Auth, sementara **username yang diketik pengguna tetap `admin`**.

Untuk **setup admin satu kali** tambahkan di `.env.local`:

```dotenv
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY_YANG_RAHASIA
```

`SUPABASE_SERVICE_ROLE_KEY` adalah kunci rahasia berhak akses tinggi. **Jangan commit, kirim via chat, atau menambahkan `NEXT_PUBLIC_` pada nama variabelnya.** Setelah akun admin dibuat, sebaiknya hapus baris tersebut dari `.env.local`. Kunci ini tidak diperlukan oleh website Vercel untuk operasi CMS rutin.

## 5. Aktifkan username admin dan kata sandinya

```bash
npm run setup:admin
```

CLI akan meminta **password secara tersembunyi**. Ketik password yang telah Anda pilih (tidak akan dicetak/ditampilkan), lalu konfirmasi `YA`. Proses ini membuat/memperbarui user Supabase Auth dan memberikan `role='admin'` melalui service role di sisi CLI.

> Karena kata sandi sempat ditulis pada percakapan, disarankan menggantinya dengan sandi unik yang kuat sebelum website diluncurkan ke publik. Kode tidak mengandung sandi bawaan.

## 6. Jalankan dan login

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Dashboard admin: `http://localhost:3000/admin`
- Username: `admin`
- Password: yang Anda masukkan saat `npm run setup:admin`

**Akun pengguna biasa tidak dapat menerbitkan konten** berkat pemeriksaan role `admin` dan Supabase Row Level Security.

## 7. Mengelola semua konten

| Menu admin | Yang dapat dikelola |
| --- | --- |
| Halaman | Heading/hero, SEO, deskripsi, media per halaman |
| Blok Konten | Teks, foto, GIF, video MP4/WebM, galeri, CTA, kutipan, embed, urutan, publish |
| Katalog | Produk fisik, karya digital, kreator, event, startup, coworking, komunitas, artikel, inisiatif 2045, video dan galeri |
| Teks Situs | Semua teks editorial beranda dan deskripsi karakter Cece |
| Bagian Beranda | Tampilkan/sembunyikan hero, pengantar, profil Cece, statistik, katalog, event, kreator, roadmap dan bagian lain |
| **Editor Visual** | **Klik langsung** teks, gambar, media, URL tombol, dan placeholder pada halaman publik kemudian Simpan & Terbitkan |
| Warna | Palet hijau, biru, ungu, merah, kuning + navy/putih |
| Maskot Cece | Gambar hero, gambar profil, label dan sublabel maskot |
| Media | Unggah JPG/PNG/WebP/AVIF/GIF/MP4/WebM hingga 50 MB; URL dari Supabase Storage |
| Pengaturan | Logo, nama dan tagline KTCC, footer, kontak, akun sosial, menu navigasi |
| Permintaan | Menangani kontak, pengajuan event, ruang, kolaborasi |

### Bagaimana memakai Visual Editor?

1. Login di `/admin/login`.
2. Buka tab **Editor Visual**.
3. Klik halaman yang ingin diedit (misalnya Beranda). Halaman terbuka di tab baru dengan `?ktccEdit=1`.
4. Klik teks atau gambar/tautan yang ingin diganti.
5. Isi konten baru, atau pilih gambar dari Media Library.
6. Tekan **Simpan & Terbitkan**. Muat ulang laman pengunjung untuk melihat hasil.

Penting: Editor Visual memetakan elemen berdasarkan struktur DOM. Saat layout website diubah secara besar-besaran oleh developer, override visual tertentu mungkin harus dibuat ulang. Untuk konten strategis tetap utamakan field bernama di **Halaman**, **Teks Situs**, **Maskot Cece**, dan **Blok Konten**. Mengubah logika aplikasi, database, komponen React, atau perilaku interaktif tetap memerlukan pekerjaan developer—CMS berfokus pada konten dan identitas desain.

### Publikasi yang akurat

Jangan masukkan angka transaksi yang belum terverifikasi atau mengaku proyek pemerintah/swasta telah disahkan bila belum ada sumber. Inisiatif Kutim 2045 harus mempunyai sumber HTTPS yang bisa diverifikasi. Event/pemesanan yang diajukan pengunjung adalah permintaan, bukan konfirmasi otomatis.

## 8. Vercel production

Push repo ke GitHub dan import di Vercel. Atur variabel lingkungan **hanya**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_KTCC_ADMIN_EMAIL`
- `NEXT_PUBLIC_SITE_URL` (domain final)

**Jangan masukkan service role key ke `NEXT_PUBLIC_` atau aplikasi frontend.** Pastikan production domain di Supabase Auth URL configuration, dan lakukan pengujian login dengan browser incognito serta uji RLS sebagai user biasa.

## 9. Pengujian sebelum launching

- Admin berhasil login, logout, dan tidak bisa login dengan kredensial salah.
- Pengunjung biasa ditolak ketika mencoba mutasi database/storage atau masuk Content Studio.
- Perubahan heading, tombol, Cece, gambar dan warna tersimpan dan terlihat dari browser lain.
- Konten draft tidak muncul di publik; konten publik tampil setelah `published`.
- Upload GIF, MP4/WebM, penghapusan media dan galeri diuji dengan file nyata.
- Build produksi (`npm run build`) berhasil sebelum deployment.
- Kebijakan privasi, izin karya/foto, sumber proyek pemerintah, dan kontak publik sudah diverifikasi.

## Catatan keamanan

Admin mempunyai kemampuan mengubah konten publik. Buat akun hanya untuk operator tepercaya. Disarankan password unik dan kuat, proses recovery akun yang aman, dan perlindungan tingkat platform terhadap percobaan login berulang. Tidak ada kredensial login demo yang ditanam di repositori.

## 10. Mengatur bagian beranda

Pada `/admin` buka tab **Bagian Beranda**. Pilih bagian yang ingin ditampilkan/disembunyikan, lalu klik **Simpan tampilan beranda**. Pengaturan tersimpan di `site_settings.home_layout` dan dibaca oleh halaman publik. Menyembunyikan bagian tidak menghapus isinya. Bagian tambahan juga dapat dibuat melalui **Blok Konten**.

**Batasan penting:** CMS mengelola konten, branding, warna, media, dan visibilitas bagian tetap. Untuk mengubah logika aplikasi, mengganti desain layout dari awal, atau menyusun ulang komponen interaktif yang diprogram secara khusus, tetap diperlukan pengembangan Next.js. Editor Visual berbasis posisi DOM dapat perlu dipetakan ulang ketika struktur kode berubah.
