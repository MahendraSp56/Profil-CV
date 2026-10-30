# Website Profil Mahendra Saputra

Nama: Mahendra Saputra · NIM: A12.2025.07417 · S1 Sistem Informasi, Universitas Dian Nuswantoro

## 1. Analisis proyek awal 

| Bagian | Kondisi awal | Tindakan di Tugas 3 |
|---|---|---|
| HTML | Struktur semantik lengkap: hero, tentang, pendidikan, keahlian, proyek, kontak, footer | Saya pertahankan, lalu saya tambah tombol tema, bagian FAQ, dan kartu proyek Tugas 3 |
| CSS | Bootstrap 4.6 + `style.css`, kode warna tertulis di setiap aturan | Saya pindahkan semua warna ke variabel CSS supaya mode gelap cukup mengganti nilai variabel |
| JavaScript | Seluruhnya memakai jQuery (`$(...)`) | Saya tulis ulang dengan `querySelector` dan `addEventListener` sesuai modul |
| Library | jQuery 3.6 + Bootstrap 4.6 | Saya pakai Bootstrap 5.3.3 yang tidak butuh jQuery, lalu menghapus jQuery |
| Data profil | Nama, NIM, prodi, semester, domisili, email, pendidikan, keahlian, media sosial | Tetap sama |

## 2. Fitur yang dipilih

| Fitur | Alasan |
|---|---|
| **1. Mode gelap/terang** | Praktik utama modul (bagian F) dan slide 17. Memakai `classList.toggle()` |
| **2. FAQ / accordion** | Praktik 4 modul. Memakai properti `hidden` dan atribut `aria-expanded` |
| **3. Validasi form** | Form kontak sudah ada sejak Tugas 1, jadi saya tinggal memperbaikinya dengan event `submit` dan `preventDefault()` |

Galeri foto tidak saya buat karena foto profil yang tersedia hanya satu. Membuat galeri berarti memakai foto lain yang bukan milik saya.

### Kesesuaian dengan materi Minggu 6–7

| Materi (slide) | Penerapan di `script.js` |
|---|---|
| `const` dan `let` (6) | `const` untuk elemen dan nilai tetap; `let` untuk `pesan` dan `idAktif` yang berubah |
| Tipe data: string, number, boolean, array (7) | `KUNCI_TEMA`, `BATAS_PESAN = 1000`, `modeGelap`, array `hasilCek` dan `daftarTopik` |
| Operator `===`, `!==`, `&&`, `!` (8) | `nilai === ''`, `pesanError !== ''`, `nilai !== '' && nilai < tanggalHariIni()`, `!jawaban.hidden` |
| Kondisi `if...else` (9) | Pemeriksaan nama, email, dan pesan |
| Perulangan (10) | `for...of` di `tandaiMenuAktif()`, `forEach` untuk FAQ dan radio |
| Fungsi dengan `return` dan template literal (11) | `cekNama()` mengembalikan `true`/`false`; `` `Pesan minimal 10 karakter (sekarang ${panjang}).` `` |
| Debugging dengan `console.log` (12) | `console.log` mencetak status tema, jenis event, dan hasil validasi |
| `querySelector` dan `querySelectorAll` (17) | Saya memilih semua elemen dengan dua perintah ini |
| Mengubah konten, class, dan atribut (18) | `textContent`, `classList.toggle`, `hidden`, `setAttribute`, `href` |
| Event listener dan callback (19) | `click`, `input`, `change`, `submit`, `reset`, `scroll` |
| Objek `event` dan `preventDefault()` (20) | `event.type`, `event.target`, `event.preventDefault()` di form |
| Fitur 1, 2, dan 4 (21, 22, 24) | Mode gelap, FAQ, dan validasi form |

## 3. Struktur folder

```text
portfolio/
├── index.html                  Isi dan struktur halaman
├── README.md                   Dokumentasi ini
├── .nojekyll                   Penanda untuk GitHub Pages (file kosong, opsional)
├── css/
│   ├── bootstrap.min.css       Bootstrap 5.3.3 (lokal)
│   └── style.css               Tampilan + warna mode terang/gelap
├── js/
│   ├── bootstrap.bundle.min.js Bootstrap 5.3.3 JS (menu lipat di HP)
│   └── script.js               Semua interaksi Tugas 3
└── images/
    └── Foto-Profil.jpeg
```

## 4. Penjelasan kode

### Fitur 1: Mode gelap/terang

| Langkah | Kode | Penjelasan |
|---|---|---|
| PILIH | `document.querySelector('#tema')` | Mencari tombol dengan `id="tema"` di navbar |
| DENGARKAN | `tombolTema.addEventListener('click', ...)` | Browser menjalankan fungsi setiap kali pengunjung mengklik tombol |
| UBAH | `document.body.classList.toggle('gelap', modeGelap)` | Memasang class `gelap` jika `modeGelap` bernilai `true`, melepasnya jika `false` (toggle bersyarat, slide 16) |
| UBAH | `teksTema.textContent = 'Mode Terang'` | Tulisan tombol berganti sesuai mode (Latihan 5 modul) |

Semua warna di `style.css` memakai variabel, misalnya `background-color: var(--latar)`. Aturan `body.gelap { --latar: #121a16; ... }` mengganti nilai variabel itu. Jadi JavaScript cukup memasang satu class, dan CSS mengganti warna seluruh halaman.

Saya menyimpan pilihan tema di `localStorage` supaya tema tetap sama saat pengunjung membuka halaman lagi. Kode penyimpanan saya bungkus dengan `try...catch` karena browser mode privat bisa menolak akses `localStorage`. Dengan `try...catch`, Console tetap bersih dan tombol tema tetap berfungsi.

### Fitur 2: FAQ / accordion

| Langkah | Kode | Penjelasan |
|---|---|---|
| PILIH | `document.querySelectorAll('.faq-tanya')` | Mengambil **semua** tombol pertanyaan sekaligus (slide 19) |
| | `tombolTanya.getAttribute('aria-controls')` | Membaca ID jawaban milik tombol, misalnya `faq-jawab-1` |
| DENGARKAN | `daftarTanya.forEach(...)` + `addEventListener('click', ...)` | Memasang pendengar klik di setiap tombol tanpa menulis kode berulang |
| UBAH | `jawaban.hidden = !jawaban.hidden` | Tanda `!` membalik nilai: tersembunyi menjadi tampil, dan sebaliknya |
| UBAH | `setAttribute('aria-expanded', String(!jawaban.hidden))` | Memberi tahu pembaca layar apakah jawaban terbuka |

CSS memakai selector atribut `.faq-tanya[aria-expanded="true"] .faq-ikon` untuk memutar ikon `+` menjadi `×` saat jawaban terbuka.

### Fitur 3: Validasi form

| Langkah | Kode | Penjelasan |
|---|---|---|
| PILIH | `document.querySelector('#form-kontak')`, `#fnama`, `#error-nama`, dst. | Mengambil form, setiap isian, dan tempat pesan error |
| DENGARKAN | `form.addEventListener('submit', function (event) {...})` | Browser menjalankan fungsi saat pengunjung menekan "Periksa & Siapkan Email" |
| | `event.preventDefault()` | Menghentikan pengiriman bawaan browser supaya script bisa memeriksa isian dulu (slide 22) |
| UBAH | `input.classList.toggle('is-invalid', salah)` | Memberi bingkai merah hanya pada isian yang salah |
| UBAH | `elemenError.textContent = pesanError` | Menulis pesan error yang sesuai, misalnya "Nama minimal 3 karakter." |
| UBAH | `errorKeperluan.hidden = valid` | Menampilkan pesan "Pilih salah satu keperluan." jika pengunjung belum memilih radio |

Aturan pemeriksaan:

- Nama wajib, minimal 3 karakter.
- Email wajib dan harus berformat `nama@contoh.com`.
- Keperluan dan Asal wajib dipilih.
- Tanggal boleh kosong, tetapi tidak boleh sebelum hari ini.
- Pesan wajib, minimal 10 karakter.

Beberapa detail:

- Script menjalankan keenam fungsi pemeriksa lebih dulu dan menyimpan hasilnya di array. Hasilnya, semua isian yang salah bertanda merah dalam satu klik.
- Setelah klik pertama, tanda merah hilang begitu pengunjung memperbaiki isiannya (event `input`).
- Penghitung karakter pesan berubah merah saat mendekati 1000 karakter.
- Script membuat notifikasi dengan `createElement` + `textContent`. Teks ketikan pengunjung tampil sebagai teks biasa, jadi orang tidak bisa menyisipkan kode HTML lewat form.
- **Website ini tidak punya server, jadi form tidak mengirim pesan.** Setelah isian lengkap, pengunjung mendapat tombol "Buka draf email" (`mailto:`) dan mengirim email sendiri.

### Pelengkap navigasi

- **Bayangan navbar dan tombol ke atas:** `classList.toggle('is-scrolled', posisi > 10)` dan `classList.toggle('show', posisi > 500)` di event `scroll`.
- **Menu aktif:** fungsi `tandaiMenuAktif()` memeriksa bagian mana yang sedang dibaca, lalu memasang class `active` pada link menu yang cocok.
- **Menu HP:** menu lipat menutup sendiri setelah link diklik.
- **Footer:** tahun mengikuti tahun berjalan (`new Date().getFullYear()`).

## 5. Cara menjalankan

**Lewat browser:**

1. Ekstrak ZIP, buka folder `portfolio`.
2. Klik dua kali `index.html`.
3. Tekan **F12** dan buka tab **Console**. Pastikan tidak ada tulisan merah.
4. Klik tombol **Mode Gelap** dan amati class `gelap` pada `<body>` di tab **Elements**. Console mencetak `Mode gelap? true`.

**Lewat Visual Studio Code:**

1. **File → Open Folder**, pilih folder `portfolio`.
2. Pasang ekstensi **Live Server**, klik kanan `index.html`, pilih **Open with Live Server**.
3. Browser memuat ulang halaman sendiri setiap kali Anda menyimpan file.

Anda tidak butuh internet karena Bootstrap ada di dalam folder. Hanya font Plus Jakarta Sans yang butuh internet; tanpa internet, browser memakai font sistem.

## 6. Checklist pengujian

Saya menguji website dengan Chromium (Playwright) pada 26 Oktober 2026.

| No | Fitur | Langkah uji | Hasil yang diharapkan | Status |
|---|---|---|---|---|
| 1 | Mode gelap | Klik tombol tema | `body` mendapat class `gelap`, latar jadi gelap, tombol bertuliskan "Mode Terang" | Berhasil |
| 2 | Mode gelap | Klik lagi | Class `gelap` hilang, tombol kembali "Mode Gelap" | Berhasil |
| 3 | Mode gelap | Pilih gelap, lalu muat ulang halaman | Halaman tetap gelap | Berhasil |
| 4 | Mode gelap | Cek di HP (375 px) | Tombol tampil sebagai ikon, tema berganti | Berhasil |
| 5 | FAQ | Klik setiap pertanyaan (4 buah) | Jawaban tampil, `aria-expanded="true"`, ikon jadi × | Berhasil |
| 6 | FAQ | Klik pertanyaan yang terbuka | Jawaban tertutup, `aria-expanded="false"` | Berhasil |
| 7 | Form | Klik kirim saat semua kosong | 5 isian wajib bertanda merah (Nama, Email, Keperluan, Asal, Pesan), kursor pindah ke Nama, notifikasi "Formulir belum lengkap" | Berhasil |
| 8 | Form | Isi nama "Bu" | Pesan "Nama minimal 3 karakter." | Berhasil |
| 9 | Form | Isi email "budi@" | Pesan format email belum benar | Berhasil |
| 10 | Form | Isi tanggal 2020-01-01 | Pesan "Tanggal tidak boleh sebelum hari ini." | Berhasil |
| 11 | Form | Isi pesan "Halo" | Pesan "minimal 10 karakter (sekarang 4)" | Berhasil |
| 12 | Form | Isi semua dengan benar | Tanda merah hilang, notifikasi "belum menerima", tombol draf email berisi data form | Berhasil |
| 13 | Form | Isi nama `<img src=x onerror=alert(1)>` | Teks tampil apa adanya, tidak menjadi gambar | Berhasil |
| 14 | Form | Klik Kosongkan | Isian, tanda merah, notifikasi, dan penghitung kembali awal | Berhasil |
| 15 | Navigasi | Klik 6 menu, naik dan turun | Halaman menggulir ke bagian yang benar, menu aktif ikut berpindah | Berhasil |
| 16 | Navigasi | Buka menu di HP, klik FAQ | Menu menutup, halaman ke bagian FAQ | Berhasil |
| 17 | Console | Buka semua fitur | Tidak ada error JavaScript | Berhasil |
| 18 | Responsif | 375, 768, 1024, 1440 px, mode terang dan gelap | Tidak ada halaman melebar ke samping | Berhasil |
| 19 | Browser lain | Firefox, Edge, Safari | Fitur berjalan sama | Perlu diuji manual |
| 20 | Hosting | Buka URL GitHub Pages | Halaman dan ketiga fitur berjalan | Perlu diuji setelah publikasi |

## 7. Panduan GitHub

Jika repositori Tugas 2 sudah ada, cukup perbarui repositori itu.

**Lewat website GitHub:**

1. Buka repositori, klik **Add file → Upload files**.
2. Seret **isi** folder `portfolio` (bukan foldernya): `index.html`, `README.md`, `css`, `js`, `images`.
3. Tulis pesan commit, misalnya `Tugas 3: dark mode, FAQ, dan validasi form`, lalu klik **Commit changes**.
4. Website tidak lagi memakai `js/jquery.min.js`. Jika file itu masih ada di repositori, buka file tersebut lalu hapus lewat ikon titik tiga **→ Delete file**.
