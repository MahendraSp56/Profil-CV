# Website Profil Pribadi Mahendra Saputra

Tugas 2 Pemrograman Web. Saya merombak halaman profil statis dari Tugas 1 dengan CSS dan Bootstrap 4.6 agar tampil rapi di desktop, tablet, dan smartphone.

## Struktur folder

```text
portfolio/
├── index.html                  Halaman utama
├── README.md                   Dokumentasi ini
├── css/
│   ├── bootstrap.min.css       Bootstrap 4.6.2 (rilis resmi, lokal)
│   └── style.css               Gaya khusus website ini
├── js/
│   ├── jquery.min.js           jQuery 3.6.1 (dependensi Bootstrap 4.6)
│   ├── bootstrap.bundle.min.js Bootstrap 4.6.2 JS + Popper.js
│   └── script.js               Interaksi website ini
└── images/
    └── Foto-Profil.jpeg        Foto profil
```

## Cara menjalankan

1. Ekstrak ZIP dan buka folder `portfolio`.
2. Klik dua kali `index.html`. Chrome, Edge, atau Firefox akan membukanya.
3. Di VS Code, pasang ekstensi **Live Server**, klik kanan `index.html`, lalu pilih *Open with Live Server*.
4. Anda tidak perlu internet. Bootstrap, jQuery, dan foto ada di dalam folder. Font *Plus Jakarta Sans* butuh internet; tanpa internet, browser memakai font sistem.
5. Cek tampilan responsif: tekan F12, tekan Ctrl+Shift+M, lalu coba lebar 375, 768, dan 1366 px.

Langkah publikasi ke GitHub Pages ada di bagian 7.

---

## 1. Analisis file asli (`index.html` Tugas 1)

File Tugas 1 sudah memakai elemen semantik (header, nav, main, section, article, aside, footer), tabel data diri dan pendidikan dengan `colspan`, daftar bersarang untuk keahlian, dan form dengan `label for`.

Saya menemukan dan memperbaiki kesalahan berikut:

| Masalah | Perbaikan |
|---|---|
| Tidak ada `<!DOCTYPE html>` | Saya menambahkannya. HTML5 dan Bootstrap membutuhkannya |
| `<a href="images/Foto-Profil.jpeg"></a>` tertutup sebelum `<img>`, lalu ada `</a>` tanpa pasangan | `<a>` sekarang membungkus `<img>` (materi "Membuat image jadi link") |
| Menu "Pengalaman" mengarah ke bagian berjudul "Proyek" | Menu dan id sama-sama memakai `#proyek` |
| Atribut `fdprocessedid` dan `<span id="PING_...">` | Saya menghapusnya. Ekstensi browser menyisipkan keduanya |
| Tabel tanpa `<thead>` dan `scope` | Baris judul pindah ke `<thead>`, setiap header punya `scope` |
| Checkbox memakai nama berbeda (`ftopik1..3`) | Ketiganya memakai `name="ftopik"` sebagai satu grup |
| Form tanpa validasi dan tanpa CSS | Form memakai validasi dan gaya Bootstrap |

## 2. Pemetaan materi ke implementasi

| Materi / konsep | Sumber | Penerapan di website |
|---|---|---|
| Struktur dokumen, DOCTYPE, nesting, indentasi | Minggu 2.1 HTML 1 | DOCTYPE HTML5, `head`/`body`, indentasi 4 spasi |
| Atribut, komentar HTML | Minggu 2.1 | Komentar penanda di setiap bagian |
| Link, file path relatif | Minggu 2.1 | `css/`, `js/`, `images/`, link `#id`, `mailto:` |
| List (ul/ol) | Minggu 2.1 | Keahlian, poin proyek, menu |
| Image, ukuran image, image sebagai link | Minggu 2.2 HTML 2 | `width`/`height` mencegah flicker; foto hero menjadi link |
| Table, colspan | Minggu 2.2 | Data diri, pendidikan formal (`colspan="3"`), pelatihan |
| Form, label, jenis input, submit | Minggu 2.2 | text, email, radio, checkbox, select, date, textarea, submit, reset |
| Div, block/inline, layout semantik | Minggu 2.2 | header, nav, main, section, article, aside, footer |
| Tugas 1 | Minggu 2.2 (slide 27) | Seluruh konten asli tetap ada |
| Sintaks CSS, selektor id/class/universal, CSS eksternal, komentar | Minggu 3.1 CSS 1 | `style.css` terpisah; selektor `*`, `#prodi`, `.skill-card` |
| Tugas 2 (redesign responsif, Bootstrap) | Minggu 3.1 (slide 15) | Acuan seluruh pengembangan |
| Warna (hex/rgba), background, border, margin, padding, width/height | Minggu 3.2 CSS 2 | Variabel warna, kartu, kotak tujuan karier, tombol |
| Kombinator, pseudo-class | Minggu 4.1 CSS 3 | `tr + tr`, `li + li`, `:hover`, `:focus`, `:checked` |
| Pseudo-element, content | Minggu 4.1 | `::first-letter` di paragraf Tentang, `::before` centang soft skill, tanda kutip, bingkai foto, `::after` garis menu aktif |
| Box model, box-sizing | Minggu 4.1 | `*, *::before, *::after { box-sizing: border-box; }` |
| Overflow, display, inline-block | Minggu 4.1 | `overflow: hidden` di tabel, `display: flex` di chip |
| @media | Minggu 4.1 | Breakpoint 576, 768, 992 px; `prefers-reduced-motion`; `print` |
| Position (fixed, relative, absolute), z-index | Minggu 4.2 CSS 4 | Navbar `fixed-top`, tombol ke atas `fixed`, bingkai dan label foto `absolute` |
| Layouting header, nav, konten, footer | Minggu 4.2 | Susunan halaman |
| Bootstrap 4.6, file lokal (cara kedua), meta viewport | Minggu 5.1 Bootstrap | `css/bootstrap.min.css`, `shrink-to-fit=no` |
| Container, grid (`col-sm/md/lg`) | Minggu 5.1 | `container`, `row`, `col-lg-7/5`, `col-sm-6 col-lg-3` |
| Kelas dan tabel Bootstrap | Minggu 5.1 | `.table`, `.table-hover`, `.table-responsive`, navbar, card, badge, form, alert |

Saya tidak memakai **float, clear, dan clearfix** (Minggu 4.1) untuk layout. Grid Bootstrap dan Flexbox sudah mengatur tata letak dengan lebih stabil. Float hanya muncul di huruf awal paragraf (`::first-letter`).

## 3. Konsep desain

- **Warna:** hijau pinus `#2f5d46` sebagai warna utama, cocok dengan latar hutan pinus di foto. Cokelat tanah `#b7792f` menjadi aksen kecil. Latar krem `#f8f7f2`, teks `#1f2a24`.
- **Tipografi:** Plus Jakarta Sans dengan cadangan font sistem. Judul tebal, isi dengan line-height 1,7.
- **Urutan halaman:** Navbar, Hero, 01 Tentang, 02 Pendidikan, 03 Keahlian, 04 Proyek, 05 Kontak, Footer. Warna latar section berselang-seling supaya batas bagian terlihat.
- **Keahlian:** saya tidak memakai progress bar atau persentase. Label "Sedang dipelajari" dan "Dasar" berasal dari keterangan di file asli.

## 4. Fitur interaktif (`js/script.js`)

1. Navbar collapse di HP. Menu menutup setelah pengunjung memilih salah satu link.
2. Smooth scrolling lewat CSS `scroll-behavior`. `scroll-padding-top` menjaga judul tetap di bawah navbar.
3. Bootstrap Scrollspy menandai menu aktif.
4. Tombol kembali ke atas muncul setelah pengunjung menggulir 500 px.
5. Bagian halaman muncul dengan animasi ringan. Pengunjung yang memilih *reduce motion* tidak melihat animasi.
6. Validasi form: isian wajib, format email, nama minimal 3 karakter, pesan minimal 10 karakter, tanggal tidak boleh lampau, radio wajib dipilih, dan penghitung karakter.
7. Website ini belum punya server, jadi form tidak mengirim pesan. Setelah isian lengkap, pengunjung membaca keterangan itu dan mendapat tombol "Buka draf email" (`mailto:`) berisi pesan yang sudah tersusun. Pesan sampai ke saya setelah pengunjung menekan Kirim di aplikasi emailnya.

## 5. Hasil pengujian

Saya menguji website dengan Chromium (Playwright) pada 13 Oktober 2026.

| No. | Komponen | Kriteria pengujian | Status | Catatan |
|---|---|---|---|---|
| 1 | Struktur HTML | Setiap tag punya pasangan penutup | Berhasil diuji | Parser menemukan 0 kesalahan |
| 2 | ID | Tidak ada ID ganda | Berhasil diuji | - |
| 3 | Link internal | Setiap `href="#..."` punya target | Berhasil diuji | 0 link rusak |
| 4 | Label form | Setiap input punya `label for` | Berhasil diuji | - |
| 5 | Gambar | Foto tampil di navbar dan hero | Berhasil diuji | 375, 768, 1366 px |
| 6 | CSS & JS lokal | Bootstrap, jQuery, dan script termuat | Berhasil diuji | 0 file gagal |
| 7 | Navigasi desktop | 5 menu menggulir ke bagian yang benar dan menandai menu aktif | Berhasil diuji | Judul berhenti tepat di bawah navbar |
| 8 | Navigasi mobile | Hamburger membuka menu, menu menutup setelah diklik | Berhasil diuji | 375 px |
| 9 | Responsif | Tidak ada horizontal overflow | Berhasil diuji | 375, 768, 1366 px |
| 10 | Form kosong | Form menolak kiriman, menandai 8 isian, menampilkan error radio | Berhasil diuji | - |
| 11 | Email salah (`budi@`) | Form menolak kiriman | Berhasil diuji | - |
| 12 | Tanggal lampau | Form menolak kiriman | Berhasil diuji | - |
| 13 | Form lengkap | Keterangan "belum menerima" dan link mailto berisi data form muncul | Berhasil diuji | - |
| 14 | Tombol Kosongkan | Isian, status validasi, dan keterangan hilang | Berhasil diuji | - |
| 15 | Tombol ke atas | Muncul saat digulir, membawa halaman ke posisi 0 | Berhasil diuji | - |
| 16 | Font Google | Font termuat saat online | Perlu diuji manual | Lingkungan uji tanpa internet; font sistem berjalan |
| 17 | Link eksternal | GitHub, LinkedIn, Instagram terbuka | Perlu diuji manual | Alamat dari file asli, belum saya buka |
| 18 | `mailto:` | Aplikasi email membuka draf berisi pesan | Perlu diuji manual | Tergantung aplikasi email di perangkat |
| 19 | Browser lain | Firefox, Safari, Edge | Perlu diuji manual | Saya hanya menguji Chromium |
| 20 | Kirim pesan lewat server | - | Belum diimplementasikan | Butuh backend atau layanan form |

## 6. Ringkasan perubahan

- **Tetap:** data diri, pendidikan formal dan pelatihan, keahlian, proyek, isian form, aside "Sedang Dipelajari" dan kutipannya, tautan media sosial, email.
- **Diperbaiki:** DOCTYPE, tag `<a>` pada foto, menu Pengalaman/Proyek, atribut sisipan ekstensi, struktur tabel, nama grup checkbox.
- **Baru:** hero section, file CSS dan JS terpisah, grid Bootstrap 4.6, kartu keahlian dan proyek, validasi form, penanda menu aktif, tombol ke atas.
- **Kartu "Redesign Profil Responsif":** kartu ini menampilkan Tugas 2 sendiri. Hapus kartu ini jika Anda tidak ingin menampilkannya.
- **Label foto:** "Domisili: Pekalongan", sesuai tabel data diri.

## 7. Publikasi ke GitHub dan GitHub Pages

File `.nojekyll` di root mencegah GitHub Pages memproses folder dengan Jekyll. Biarkan file itu ikut terunggah.

### Cara A: lewat website GitHub (tanpa Git)

1. Masuk ke github.com, klik **+** di kanan atas, pilih **New repository**.
2. Isi nama repositori, misalnya `portfolio`. Pilih **Public**. Jangan centang "Add a README". Klik **Create repository**.
3. Di halaman repositori kosong, klik **uploading an existing file**.
4. Buka folder `portfolio` di komputer, pilih **semua isinya** (`index.html`, `README.md`, `.nojekyll`, folder `css`, `js`, `images`), lalu seret ke halaman GitHub. Jangan seret folder `portfolio`-nya, karena `index.html` harus berada di root repositori. Di Windows, aktifkan *View > Hidden items* agar `.nojekyll` terlihat.
5. Tulis pesan commit, misalnya `Tugas 2: redesign responsif dengan Bootstrap 4.6`, lalu klik **Commit changes**.
6. Cek daftar file: `index.html` harus tampil di halaman utama repositori, bukan di dalam subfolder.

### Cara B: lewat Git di terminal

```bash
cd portfolio
git init
git add .
git commit -m "Tugas 2: redesign responsif dengan Bootstrap 4.6"
git branch -M main
git remote add origin https://github.com/MahendraSp56/NAMA-REPO.git
git push -u origin main
```

Ganti `NAMA-REPO` dengan nama repositori yang Anda buat.

### Mengaktifkan GitHub Pages

1. Di repositori, buka **Settings**, lalu **Pages** di menu kiri.
2. Di **Build and deployment > Source**, pilih **Deploy from a branch**.
3. Di **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
4. Tunggu 1 sampai 3 menit. Tab **Actions** menampilkan proses `pages build and deployment`; tunggu sampai tanda centang hijau.
5. Muat ulang halaman **Settings > Pages**. GitHub menampilkan alamat situs di bagian atas, dengan pola `https://mahendrasp56.github.io/NAMA-REPO/`.

### Menguji URL publik

1. Buka alamat situs di browser laptop. Pastikan foto, warna, dan menu tampil.
2. Klik setiap menu, isi form kosong, dan coba tombol kembali ke atas.
3. Buka alamat yang sama di HP, lalu coba menu hamburger.
4. Jika halaman tampil polos tanpa gaya, buka F12 > Console dan cari file yang gagal dimuat (biasanya beda huruf besar-kecil pada nama file).

## 8. Catatan versi Bootstrap

Saya tetap memakai Bootstrap **4.6.2**. Materi Minggu 5.1 mengajarkan versi 4.6, dan seluruh kelas di halaman ini (`ml-auto`, `custom-control`, `data-toggle`) mengikuti versi itu. Pindah ke Bootstrap 5 berarti mengganti nama kelas dan atribut di banyak tempat tanpa menambah fitur yang halaman ini butuhkan. Bootstrap tersimpan lokal, jadi GitHub Pages memuatnya dari repositori yang sama tanpa bergantung pada CDN.

Website ini tidak memuat data statistik. Tugas 1 berjudul "Halaman Profil Pribadi **Statis**", jadi saya tidak menambahkan grafik atau angka yang tidak ada di data asli.
