/* ==========================================================
   script.js - Interaksi website profil Mahendra Saputra
   Tugas 3 Pemrograman Web: DOM dan Event Handling

   Pola kerja setiap fitur:
   PILIH      -> document.querySelector() mencari elemen HTML
   DENGARKAN  -> addEventListener() menunggu aksi pengguna
   UBAH       -> textContent, classList, hidden, atau atribut

   File ini dimuat di akhir <body>, jadi semua elemen HTML
   sudah tersedia ketika kode di bawah dijalankan.
   ========================================================== */


/* ==========================================================
   FITUR 1 - MODE GELAP / TERANG
   ========================================================== */

// PILIH: tombol tema, ikon, dan tulisan di dalamnya
const tombolTema = document.querySelector('#tema');
const ikonTema = document.querySelector('#tema-ikon');
const teksTema = document.querySelector('#tema-teks');

// Kunci untuk menyimpan pilihan tema di browser pengunjung
const KUNCI_TEMA = 'profil-mahendra-tema';

// UBAH: pasang atau lepas class "gelap" pada <body>, lalu
// sesuaikan tulisan tombol dengan mode yang sedang aktif.
function terapkanTema(modeGelap) {
    // toggle dengan parameter kedua (toggle bersyarat):
    // true  -> class "gelap" dipasang
    // false -> class "gelap" dilepas
    document.body.classList.toggle('gelap', modeGelap);

    // Tombol menawarkan mode yang BELUM aktif
    if (modeGelap) {
        teksTema.textContent = 'Mode Terang';
        ikonTema.textContent = '☀';
        tombolTema.setAttribute('aria-label', 'Ganti ke mode terang');
    } else {
        teksTema.textContent = 'Mode Gelap';
        ikonTema.textContent = '☾';
        tombolTema.setAttribute('aria-label', 'Ganti ke mode gelap');
    }
}

// localStorage menyimpan pilihan tema agar tetap sama saat halaman
// dibuka lagi. Dibungkus try...catch karena beberapa browser (mode
// privat) menolak akses penyimpanan; halaman tetap berjalan normal.
function bacaTemaTersimpan() {
    try {
        return localStorage.getItem(KUNCI_TEMA) === 'gelap';
    } catch (error) {
        return false;
    }
}

function simpanTema(modeGelap) {
    try {
        localStorage.setItem(KUNCI_TEMA, modeGelap ? 'gelap' : 'terang');
    } catch (error) {
        // Tidak bisa menyimpan: abaikan, tema tetap berganti di halaman ini
    }
}

// Saat halaman dibuka, pakai tema yang terakhir dipilih pengunjung
terapkanTema(bacaTemaTersimpan());

// DENGARKAN: setiap tombol tema diklik, balik modenya
tombolTema.addEventListener('click', function () {
    const modeGelap = !document.body.classList.contains('gelap');
    terapkanTema(modeGelap);
    simpanTema(modeGelap);
    console.log('Mode gelap?', document.body.classList.contains('gelap'));
});


/* ==========================================================
   FITUR 2 - FAQ / ACCORDION
   ========================================================== */

// PILIH: semua tombol pertanyaan sekaligus (querySelectorAll)
const daftarTanya = document.querySelectorAll('.faq-tanya');

// forEach menjalankan fungsi yang sama untuk setiap tombol,
// jadi tidak perlu menulis event listener satu per satu.
daftarTanya.forEach(function (tombolTanya) {
    // Atribut aria-controls berisi ID jawaban milik tombol ini
    const idJawaban = tombolTanya.getAttribute('aria-controls');
    const jawaban = document.querySelector(`#${idJawaban}`);

    // DENGARKAN: klik pada pertanyaan
    tombolTanya.addEventListener('click', function () {
        // UBAH: balik properti hidden (tersembunyi <-> tampil)
        jawaban.hidden = !jawaban.hidden;
        // UBAH: beri tahu pembaca layar apakah jawaban sedang terbuka
        tombolTanya.setAttribute('aria-expanded', String(!jawaban.hidden));
    });
});


/* ==========================================================
   FITUR 3 - VALIDASI FORMULIR KONTAK
   ========================================================== */

// PILIH: formulir, setiap isian, dan tempat pesan error
const form = document.querySelector('#form-kontak');
const inputNama = document.querySelector('#fnama');
const inputEmail = document.querySelector('#femail');
const inputAsal = document.querySelector('#fasal');
const inputTanggal = document.querySelector('#ftanggal');
const inputPesan = document.querySelector('#fpesan');
const pilihanKeperluan = document.querySelectorAll('input[name="fkeperluan"]');

const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorKeperluan = document.querySelector('#error-keperluan');
const errorAsal = document.querySelector('#error-asal');
const errorTanggal = document.querySelector('#error-tanggal');
const errorPesan = document.querySelector('#error-pesan');

const penghitung = document.querySelector('#pesan-counter');
const statusForm = document.querySelector('#form-status');

const EMAIL_TUJUAN = 'hendrasp0126@gmail.com';
const BATAS_PESAN = 1000;
// Pola sederhana: ada teks, tanda @, teks, titik, lalu teks
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tanggal hari ini dalam format YYYY-MM-DD (format nilai input date)
function tanggalHariIni() {
    const sekarang = new Date();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, '0');
    const hari = String(sekarang.getDate()).padStart(2, '0');
    return `${sekarang.getFullYear()}-${bulan}-${hari}`;
}

// UBAH: pasang atau lepas tanda merah pada satu isian.
// pesanError kosong ('') berarti isian sudah benar.
function tandaiIsian(input, elemenError, pesanError) {
    const salah = pesanError !== '';
    input.classList.toggle('is-invalid', salah);
    elemenError.textContent = pesanError;
    return !salah;   // true jika isian valid
}

// Fungsi pemeriksa: setiap fungsi mengembalikan true jika isian valid
function cekNama() {
    const nilai = inputNama.value.trim();
    let pesan = '';
    if (nilai === '') {
        pesan = 'Nama wajib diisi.';
    } else if (nilai.length < 3) {
        pesan = 'Nama minimal 3 karakter.';
    }
    return tandaiIsian(inputNama, errorNama, pesan);
}

function cekEmail() {
    const nilai = inputEmail.value.trim();
    let pesan = '';
    if (nilai === '') {
        pesan = 'Email wajib diisi.';
    } else if (!POLA_EMAIL.test(nilai)) {
        pesan = 'Format email belum benar, contoh: nama@contoh.com.';
    }
    return tandaiIsian(inputEmail, errorEmail, pesan);
}

function cekKeperluan() {
    // :checked mencari radio yang sedang dipilih; null jika belum ada
    const terpilih = document.querySelector('input[name="fkeperluan"]:checked');
    const valid = terpilih !== null;
    errorKeperluan.hidden = valid;
    pilihanKeperluan.forEach(function (radio) {
        radio.classList.toggle('is-invalid', !valid);
    });
    return valid;
}

function cekAsal() {
    const pesan = inputAsal.value === '' ? 'Pilih asal Anda.' : '';
    return tandaiIsian(inputAsal, errorAsal, pesan);
}

function cekTanggal() {
    // Tanggal boleh kosong, tetapi jika diisi tidak boleh sebelum hari ini.
    // Format YYYY-MM-DD bisa dibandingkan langsung sebagai teks.
    const nilai = inputTanggal.value;
    const pesan = nilai !== '' && nilai < tanggalHariIni()
        ? 'Tanggal tidak boleh sebelum hari ini.'
        : '';
    return tandaiIsian(inputTanggal, errorTanggal, pesan);
}

function cekPesan() {
    const panjang = inputPesan.value.trim().length;
    let pesan = '';
    if (panjang === 0) {
        pesan = 'Pesan wajib diisi.';
    } else if (panjang < 10) {
        pesan = `Pesan minimal 10 karakter (sekarang ${panjang}).`;
    }
    return tandaiIsian(inputPesan, errorPesan, pesan);
}

// UBAH: tampilkan kotak notifikasi di bawah formulir.
// Elemen dibuat dengan createElement + textContent (bukan innerHTML)
// agar teks yang diketik pengunjung tidak dibaca sebagai kode HTML.
function tampilkanStatus(jenis, judul, isi, linkEmail) {
    statusForm.textContent = '';   // hapus notifikasi sebelumnya

    const kotak = document.createElement('div');
    kotak.className = `status status-${jenis}`;

    const teksJudul = document.createElement('strong');
    teksJudul.textContent = `${judul} `;
    kotak.appendChild(teksJudul);
    kotak.appendChild(document.createTextNode(isi));

    if (linkEmail) {
        const tombolEmail = document.createElement('a');
        tombolEmail.href = linkEmail;
        tombolEmail.id = 'btn-mailto';
        tombolEmail.className = 'btn btn-primary btn-sm mt-2';
        tombolEmail.textContent = 'Buka draf email';

        const wadah = document.createElement('div');
        wadah.appendChild(tombolEmail);
        kotak.appendChild(wadah);
    }

    statusForm.appendChild(kotak);
}

// Susun link mailto: berisi data formulir
function buatLinkEmail() {
    const keperluan = document.querySelector('input[name="fkeperluan"]:checked').value;
    const topikTerpilih = document.querySelectorAll('input[name="ftopik"]:checked');
    const daftarTopik = [];
    topikTerpilih.forEach(function (kotakCentang) {
        daftarTopik.push(kotakCentang.value);
    });

    const nama = inputNama.value.trim();
    const subjek = `[Website Profil] ${keperluan} - ${nama}`;
    // Template literal (tanda backtick) boleh ditulis beberapa baris
    const isi = `Nama: ${nama}
Email: ${inputEmail.value.trim()}
Keperluan: ${keperluan}
Topik yang diminati: ${daftarTopik.join(', ') || '-'}
Asal: ${inputAsal.value}
Tanggal janji temu: ${inputTanggal.value || '-'}

Pesan:
${inputPesan.value.trim()}`;

    // encodeURIComponent mengubah spasi dan simbol agar aman di dalam link
    return `mailto:${EMAIL_TUJUAN}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isi)}`;
}

// Tanggal di kalender tidak bisa dipilih sebelum hari ini
inputTanggal.setAttribute('min', tanggalHariIni());

// DENGARKAN: setiap kali pesan diketik, perbarui penghitung karakter
inputPesan.addEventListener('input', function () {
    const panjang = inputPesan.value.length;
    penghitung.textContent = `${panjang}/${BATAS_PESAN}`;
    penghitung.classList.toggle('hampir-penuh', panjang >= BATAS_PESAN - 100);
});

// DENGARKAN: tombol "Periksa & Siapkan Email" ditekan
form.addEventListener('submit', function (event) {
    // Hentikan pengiriman bawaan browser agar isian bisa diperiksa dulu
    event.preventDefault();
    // Objek event membawa informasi kejadian: jenisnya dan elemen asalnya
    console.log(`Event: ${event.type} dari #${event.target.id}`);

    // Semua pemeriksa dijalankan dulu (disimpan di array), supaya
    // SEMUA isian yang salah langsung ditandai merah sekaligus.
    const hasilCek = [cekNama(), cekEmail(), cekKeperluan(), cekAsal(), cekTanggal(), cekPesan()];
    const semuaValid = hasilCek.every(function (valid) {
        return valid;
    });

    // Tandai bahwa formulir sudah pernah diperiksa (dipakai di bawah)
    form.classList.add('sudah-dicek');

    if (!semuaValid) {
        tampilkanStatus('gagal', 'Formulir belum lengkap.', 'Periksa isian bertanda merah.');
        // Pindahkan kursor ke isian pertama yang salah
        const isianSalah = form.querySelector('.is-invalid');
        if (isianSalah) {
            isianSalah.focus();
        }
        console.log('Validasi gagal:', hasilCek);
        return;
    }

    // Website ini belum punya server, jadi pesan TIDAK dikirim.
    // Pengunjung mendapat draf email yang dikirim sendiri.
    tampilkanStatus(
        'info',
        `Isian lengkap, ${inputNama.value.trim()}.`,
        'Saya belum menerima pesan Anda karena website ini belum punya server. ' +
        'Buka draf email lewat tombol di bawah, lalu tekan Kirim.',
        buatLinkEmail()
    );
    console.log('Validasi berhasil, draf email siap.');
});

// DENGARKAN: setelah formulir pernah diperiksa, tanda merah langsung
// diperbarui ketika pengunjung memperbaiki isian.
const pasanganCek = [
    [inputNama, cekNama],
    [inputEmail, cekEmail],
    [inputAsal, cekAsal],
    [inputTanggal, cekTanggal],
    [inputPesan, cekPesan]
];

pasanganCek.forEach(function (pasangan) {
    const input = pasangan[0];
    const fungsiCek = pasangan[1];
    input.addEventListener('input', function () {
        if (form.classList.contains('sudah-dicek')) {
            fungsiCek();
        }
    });
});

pilihanKeperluan.forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (form.classList.contains('sudah-dicek')) {
            cekKeperluan();
        }
    });
});

// DENGARKAN: tombol "Kosongkan" menghapus semua tanda dan notifikasi
form.addEventListener('reset', function () {
    form.classList.remove('sudah-dicek');
    form.querySelectorAll('.is-invalid').forEach(function (isian) {
        isian.classList.remove('is-invalid');
    });
    errorKeperluan.hidden = true;
    statusForm.textContent = '';
    penghitung.textContent = `0/${BATAS_PESAN}`;
    penghitung.classList.remove('hampir-penuh');
});


/* ==========================================================
   PENDUKUNG NAVIGASI: bayangan navbar, menu aktif, tombol ke atas
   ========================================================== */

// PILIH
const navbar = document.querySelector('#menu');
const tombolAtas = document.querySelector('#btn-atas');
const menuUtama = document.querySelector('#menu-utama');
const linkMenu = document.querySelectorAll('#menu-utama .nav-link');
const tahun = document.querySelector('#tahun');
const daftarBagian = document.querySelectorAll('main section[id]');

// UBAH: tandai link menu milik bagian yang sedang dibaca.
// Bagian "aktif" = bagian terakhir yang bagian atasnya sudah
// melewati bawah navbar.
function tandaiMenuAktif() {
    let idAktif = '';
    // Perulangan for...of membaca setiap bagian satu per satu
    for (const bagian of daftarBagian) {
        if (bagian.getBoundingClientRect().top <= 120) {
            idAktif = bagian.id;
        }
    }

    // Di dasar halaman, bagian terakhir (Kontak) dianggap aktif
    const diDasar = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (diDasar && daftarBagian.length > 0) {
        idAktif = daftarBagian[daftarBagian.length - 1].id;
    }

    linkMenu.forEach(function (link) {
        const aktif = link.getAttribute('href') === `#${idAktif}`;
        link.classList.toggle('active', aktif);
        if (aktif) {
            link.setAttribute('aria-current', 'true');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// UBAH: navbar diberi bayangan, tombol "ke atas" muncul setelah
// halaman digulir (toggle bersyarat), dan menu aktif diperbarui
function cekPosisiGulir() {
    const posisi = window.scrollY;
    navbar.classList.toggle('is-scrolled', posisi > 10);
    tombolAtas.classList.toggle('show', posisi > 500);
    tandaiMenuAktif();
}

// DENGARKAN: setiap kali halaman digulir
window.addEventListener('scroll', cekPosisiGulir);
cekPosisiGulir();

// DENGARKAN: di HP, menu tertutup otomatis setelah salah satu link diklik.
// bootstrap.Collapse adalah fitur JavaScript Bootstrap 5 untuk menu lipat.
linkMenu.forEach(function (link) {
    link.addEventListener('click', function () {
        if (menuUtama.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(menuUtama).hide();
        }
    });
});

// UBAH: tahun di footer selalu mengikuti tahun berjalan
tahun.textContent = new Date().getFullYear();
