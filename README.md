# Undangan Pernikahan iPhone

**Undangan pernikahan online yang menyamar sebagai iPhone.**

Kami (Raka & Sinta) menikah dan mengirim undangan bukan sebagai kartu PDF, melainkan sebuah tautan. Tautan itu terbuka di layar kunci dengan foto dan playlist pernikahan yang siap diputar. Setelah dibuka, tamu masuk ke layar utama berisi aplikasi-aplikasi yang benar-benar bisa dibuka.

Di balik keseruannya, undangan ini tetap menjalankan tugas utamanya: memberi tahu kapan dan di mana acaranya, menampilkan foto-foto, dan mengumpulkan konfirmasi kehadiran (RSVP). Repo ini adalah undangan tersebut sebagai templat gratis dan open source. Foto serta teks asli sudah diganti dengan contoh, jadi Anda bisa memasukkan data sendiri dan undangan digital Anda bisa online di Vercel dalam beberapa menit. Seluruh antarmuka sudah berbahasa Indonesia.

[![Deploy dengan Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnguyenhuugiatri%2Fiphone-wedding-invitation&project-name=iphone-wedding-invitation&repository-name=iphone-wedding-invitation)

**Demo langsung:** [iphone-wedding-invitation.vercel.app](https://iphone-wedding-invitation.vercel.app)

<p align="center">
  <a href="docs/demo/demo.mp4">
    <img src="docs/demo/poster.png" alt="Demo undangan pernikahan iPhone: layar utama iPhone dengan widget pernikahan" width="860">
  </a>
  <br>
</p>

https://github.com/user-attachments/assets/7df48880-b32b-4f9e-b8db-c819a7d22c68

## Untuk apa undangan ini

Tamu memang hampir selalu membuka tautan undangan dari ponsel, jadi undangan ini pura-pura menjadi ponsel itu sendiri. Tidak ada instruksi yang diperlukan. Geser, ketuk, dan semuanya terbuka.

Ada tiga tugas utama:

1. **Mengumpulkan RSVP.** Google Form menanyakan apakah tamu datang, berapa orang yang dibawa, dan apakah ingin ikut shuttle bus. Formulir ini bisa diakses dari widget Daftar Bacaan, dari Safari di dock, dan dari undangan di aplikasi Catatan.
2. **Menunjukkan waktu dan tempat.** Widget Kalender berisi kedua acara, widget peta yang membuka Google Maps, dan undangan lengkap yang ditulis di Catatan.
3. **Menampilkan foto.** Album bergaya aplikasi Foto dengan grid masonry dan penampil layar penuh yang bisa digeser.

Ada juga pelengkap yang tidak kami tahan untuk tidak dibuat: obrolan antara kedua mempelai, riwayat panggilan selama masa persiapan, kode QR hadiah di Dompet, dan kalkulator yang benar-benar berfungsi.

## Tur singkat

<table>
  <tr>
    <td align="center"><img src="docs/demo/demo.gif" width="240" alt="Layar kunci, layar utama, Kalender, Catatan dan Foto"><br><sub>Layar kunci → Kalender → Catatan → Foto</sub></td>
    <td align="center"><img src="docs/demo/apps/music.gif" width="240" alt="Widget Musik di layar kunci"><br><sub>Musik</sub></td>
    <td align="center"><img src="docs/demo/apps/phone.gif" width="240" alt="Riwayat panggilan di aplikasi Telepon"><br><sub>Telepon</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/demo/apps/youtube.gif" width="240" alt="Aplikasi YouTube dengan video musik tersemat"><br><sub>YouTube</sub></td>
    <td align="center"><img src="docs/demo/apps/settings.gif" width="240" alt="Aplikasi Pengaturan"><br><sub>Pengaturan</sub></td>
    <td align="center"><img src="docs/demo/apps/calculator.gif" width="240" alt="Aplikasi Kalkulator"><br><sub>Kalkulator</sub></td>
  </tr>
</table>

### Daftar aplikasi dan fungsinya

| Aplikasi | Yang didapat tamu |
| --- | --- |
| Layar kunci | Foto, jam dan widget musik. Ketuk putar, ponsel terbuka sendiri. |
| Layar utama | Widget Kalender, Peta dan Daftar Bacaan, satu folder aplikasi dan dock. |
| Kalender | Upacara pernikahan (14.30–15.00) dan resepsi (17.30–20.30), lengkap dengan lokasi. |
| Peta | Membuka lokasi acara di Google Maps. |
| Catatan | Undangan itu sendiri, dengan tautan petunjuk arah dan tautan RSVP. |
| Safari | Formulir RSVP, langsung di dalam ponsel. |
| Foto | Album pernikahan: grid masonry dan penampil layar penuh yang bisa digeser. |
| Musik | Playlist pernikahan bebas royalti. Bisa dilewati dan digeser dari layar kunci. |
| Pesan | Obrolan singkat antara kedua mempelai. |
| Telepon | Riwayat panggilan masa persiapan: menu, busana, fotografer, mobil. |
| Dompet | Kartu hadiah dengan kode QR bank. |
| YouTube | Video musik pernikahan (embed YouTube). |
| Pengaturan, Kalkulator | Easter egg. Tombolnya benar-benar berfungsi dan hitungannya benar. |

Seluruh teks antarmuka berbahasa Indonesia dan disimpan sebagai string biasa di dalam komponen, jadi menggantinya cukup dengan cari dan ganti.

## Jadikan milik Anda

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Semua data pribadi ada di beberapa file saja:

| Apa | Di mana |
| --- | --- |
| Nama, tanggal, waktu acara | [`components/calendarData.ts`](components/calendarData.ts), [`src/NotesPage.tsx`](src/NotesPage.tsx), [`src/WalletPage.tsx`](src/WalletPage.tsx), [`index.html`](index.html) (judul, tag berbagi dan intro singkat di samping ponsel pada layar lebar) |
| Lokasi acara dan tautan peta | [`lib/maps.ts`](lib/maps.ts), [`components/calendarData.ts`](components/calendarData.ts) |
| Wallpaper | `public/wallpaper-lock.jpeg` (layar kunci), `public/wallpaper-home.jpeg` (layar utama) |
| Foto widget | `public/profile.jpeg` (widget Peta), `public/reading-list.jpeg` (widget Daftar Bacaan) |
| Foto | `public/photos/`, plus daftarnya di [`src/PhotosPage.tsx`](src/PhotosPage.tsx) |
| Playlist | `public/music/`, plus `PLAYLIST` di [`src/music/MusicProvider.tsx`](src/music/MusicProvider.tsx) |
| Formulir RSVP | [`scripts/wedding-form.gs`](scripts/wedding-form.gs), `HOME` di [`src/SafariPage.tsx`](src/SafariPage.tsx) |
| QR hadiah | `public/gift-qr.png` (contohnya hanya mengarah ke repo ini) |
| Obrolan dan riwayat panggilan | [`src/MessagesPage.tsx`](src/MessagesPage.tsx), [`src/PhonePage.tsx`](src/PhonePage.tsx) |
| Gambar berbagi dan ikon | `pnpm gen:meta` membangun ulang `og-image.jpg` dari wallpaper layar utama (menggantikan versi desain demo), juga favicon dari `public/favicon.svg` |

Jaga ukuran foto sekitar 1600 px pada sisi terpanjang. Tidak ada yang mengubah ukurannya otomatis, dan tamu membuka undangan lewat data seluler.

## Cara kerja RSVP

Formulirnya Google Forms biasa, dibuat oleh [`scripts/wedding-form.gs`](scripts/wedding-form.gs) (Google Apps Script). Tidak ada backend yang perlu dijalankan: jawaban terkumpul di Google Forms, dan Anda bisa menautkannya ke Spreadsheet bila lebih nyaman bekerja dengan tabel.

Pertanyaannya bercabang sesuai jawaban:

- Nama.
- Apakah hadir? Jika tidak, langsung ke bagian ucapan.
- Berapa orang yang hadir, termasuk anak-anak.
- Ikut shuttle bus? Jika ya: titik penjemputan, ikut berangkat dan/atau pulang, jumlah kursi masing-masing arah, plus daftar penumpang (nama dan tahun lahir).
- Catatan lain untuk mempelai, dan ucapan untuk mereka.

Tamu bisa kembali dan mengubah jawabannya. `generatePrefillUrls()` membuat tautan pribadi untuk setiap tamu dengan nama yang sudah terisi, lalu mencetak daftarnya sebagai TSV yang bisa ditempel ke Spreadsheet.

Cara menyiapkannya: tempel skrip ke [script.google.com](https://script.google.com), jalankan `createWeddingForm()`, lalu masukkan URL formulir ke `HOME` di [`src/SafariPage.tsx`](src/SafariPage.tsx).

> Undangan demo ini sudah selesai, jadi formulirnya ditutup. Safari akan menampilkan halaman "tidak lagi menerima jawaban" dari Google sampai Anda memasang formulir sendiri.

## Deploy

Ini situs Vite statis, jadi host statis apa pun bisa dipakai. Paling mudah Vercel:

- **Sekali klik:** gunakan tombol **Deploy dengan Vercel** di atas. Repo akan di-fork dan langsung di-deploy.
- **Dari fork Anda sendiri:** impor di [vercel.com/new](https://vercel.com/new). Preset Vite terdeteksi otomatis dan setiap push akan deploy ulang.

[`vercel.json`](vercel.json) hanya menambahkan cache jangka panjang untuk file ber-hash di `/assets`. Jika memakai domain sendiri, perbarui URL di `index.html`, `public/robots.txt` dan `public/sitemap.xml`.

## Dibangun dengan

React 19 dan TypeScript di Vite 8, Tailwind CSS 4, Framer Motion untuk semua animasi pegas bergaya iOS, dan GSAP untuk grid foto.

Spasi, tipografi dan gerak mengikuti Apple Human Interface Guidelines. Di desktop, aplikasi tampil di dalam bingkai iPhone 440×956; di ponsel menjadi layar penuh. SF Pro tidak dibundel (lisensinya tidak mengizinkan): perangkat Apple merendernya secara native, perangkat lain memakai font sistem.

## Merekam video demo

Semua isi `docs/demo/` direkam dari aplikasi asli. Tidak ada yang diedit manual. Rekaman ini berasal dari undangan kami yang sebenarnya, sebelum foto, obrolan dan playlist diganti dengan contoh di repo ini, jadi merekam ulang akan menghasilkan konten Anda sendiri. [`scripts/promo-video/`](scripts/promo-video) mengendalikan Chrome headless dengan jam yang dibekukan dan memajukannya tepat 1/60 detik per frame, sehingga setiap animasi tetap mulus seberapa pun lambat mesinnya.

```bash
pnpm add -D puppeteer-core    # juga butuh Google Chrome dan ffmpeg
pnpm exec vite --config scripts/promo-video/vite.config.mjs --port 5199

node scripts/promo-video/main.mjs                  # docs/demo/demo.mp4
node scripts/promo-video/apps.mjs                  # docs/demo/apps/* dan apps.mp4
node scripts/promo-video/apps.mjs --only=music     # satu klip saja (tambahkan --preview untuk render cepat 30 fps)
```

Teks caption dan skrip setiap adegan ada di [`scripts/promo-video/scenes.mjs`](scripts/promo-video/scenes.mjs).

## Lisensi

Kodenya [MIT](LICENSE). Foto contoh (Unsplash), musik (bebas royalti, atribusi di [CREDITS.md](CREDITS.md)) dan dua komponen yang diadaptasi dari React Bits memiliki lisensinya masing-masing, tercantum di [CREDITS.md](CREDITS.md). Apple, iPhone, iOS dan ikon aplikasi milik Apple, sedangkan YouTube milik Google. Proyek ini tidak berafiliasi dengan keduanya.
