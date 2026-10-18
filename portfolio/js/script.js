/* ==========================================================
   script.js - Interaksi website profil Mahendra Saputra
   Membutuhkan jQuery dan Bootstrap 4.6 (dimuat sebelumnya).
   ========================================================== */

$(function () {
    "use strict";

    var EMAIL_TUJUAN = "hendrasp0126@gmail.com";
    var $window = $(window);
    var $nav = $("#menu");
    var $btnAtas = $("#btn-atas");

    /* ---------- 1. Scrollspy: indikator menu aktif ---------- */
    $("body").scrollspy({ target: "#menu", offset: 90 });

    /* ---------- 2. Tutup menu mobile setelah link diklik ---------- */
    $("#menu-utama .nav-link").on("click", function () {
        if ($("#menu-utama").hasClass("show")) {
            $("#menu-utama").collapse("hide");
        }
    });

    /* ---------- 3. Navbar berbayang & tombol ke atas saat digulir ---------- */
    function cekPosisiGulir() {
        var y = $window.scrollTop();
        $nav.toggleClass("is-scrolled", y > 10);
        $btnAtas.toggleClass("show", y > 500);
    }
    $window.on("scroll", cekPosisiGulir);
    cekPosisiGulir();

    /* ---------- 4. Animasi muncul saat bagian terlihat ---------- */
    var $targetReveal = $(".section-head, .info-card, .goal-box, .table-card, .skill-card, .soft-skills, .learning-box, .project-card, .contact-card, .contact-side");
    if ("IntersectionObserver" in window) {
        $targetReveal.addClass("reveal");
        var pengamat = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    pengamat.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        $targetReveal.each(function () {
            pengamat.observe(this);
        });
    }

    /* ---------- 5. Tahun pada footer ---------- */
    $("#tahun").text(new Date().getFullYear());

    /* ---------- 6. Formulir kontak ---------- */
    var form = document.getElementById("form-kontak");
    var $status = $("#form-status");
    var $pesan = $("#fpesan");
    var $counter = $("#pesan-counter");

    // Tanggal janji temu tidak boleh sebelum hari ini
    var hariIni = new Date();
    var tglMin = hariIni.getFullYear() + "-" +
        String(hariIni.getMonth() + 1).padStart(2, "0") + "-" +
        String(hariIni.getDate()).padStart(2, "0");
    $("#ftanggal").attr("min", tglMin);

    // Penghitung karakter pesan
    $pesan.on("input", function () {
        $counter.text($pesan.val().length + "/1000");
    });

    // Pesan error untuk grup radio "Keperluan"
    function cekKeperluan() {
        var dipilih = $("input[name='fkeperluan']:checked").length > 0;
        $("#keperluan-feedback").toggleClass("show", !dipilih);
        return dipilih;
    }
    $("input[name='fkeperluan']").on("change", function () {
        if (form.classList.contains("was-validated")) {
            cekKeperluan();
        }
    });

    function tampilkanStatus(jenis, isiHtml) {
        $status.html('<div class="alert alert-' + jenis + '">' + isiHtml + "</div>");
    }

    function escapeHtml(teks) {
        return $("<div>").text(teks).html();
    }

    $(form).on("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Rapikan spasi berlebih sebelum validasi
        $("#fnama, #femail").each(function () {
            this.value = this.value.trim();
        });

        var keperluanValid = cekKeperluan();
        var formValid = form.checkValidity();
        form.classList.add("was-validated");

        if (!formValid || !keperluanValid) {
            tampilkanStatus("danger",
                "<strong>Formulir belum lengkap.</strong> Periksa isian bertanda merah.");
            var $pertama = $(form).find(":invalid").first();
            if ($pertama.length) {
                $pertama.trigger("focus");
            }
            return;
        }

        // Kumpulkan data formulir
        var nama = $("#fnama").val();
        var email = $("#femail").val();
        var keperluan = $("input[name='fkeperluan']:checked").next("label").text();
        var topik = $("input[name='ftopik']:checked").map(function () {
            return this.value;
        }).get().join(", ") || "-";
        var asal = $("#fasal").val();
        var tanggal = $("#ftanggal").val() || "-";
        var pesan = $pesan.val().trim();

        var subjek = "[Website Profil] " + keperluan + " - " + nama;
        var isi =
            "Nama: " + nama + "\n" +
            "Email: " + email + "\n" +
            "Keperluan: " + keperluan + "\n" +
            "Topik yang diminati: " + topik + "\n" +
            "Asal: " + asal + "\n" +
            "Tanggal janji temu: " + tanggal + "\n\n" +
            "Pesan:\n" + pesan;

        var linkMailto = "mailto:" + EMAIL_TUJUAN +
            "?subject=" + encodeURIComponent(subjek) +
            "&body=" + encodeURIComponent(isi);

        // Jujur: website ini tidak punya server, jadi pesan BELUM terkirim
        tampilkanStatus("info",
            "<strong>Isian lengkap, " + escapeHtml(nama) + ".</strong> " +
            "Saya <u>belum menerima</u> pesan Anda karena website ini belum punya server. " +
            "Buka draf email lewat tombol di bawah, lalu tekan Kirim." +
            '<div class="mt-2"><a class="btn btn-primary btn-sm" id="btn-mailto" href="' + linkMailto + '">' +
            "Buka draf email</a></div>");
    });

    // Tombol "Kosongkan": hapus status validasi dan notifikasi
    $(form).on("reset", function () {
        form.classList.remove("was-validated");
        $("#keperluan-feedback").removeClass("show");
        $status.empty();
        $counter.text("0/1000");
    });
});
