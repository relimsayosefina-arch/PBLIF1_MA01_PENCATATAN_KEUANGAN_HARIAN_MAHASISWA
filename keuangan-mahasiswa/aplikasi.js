/* =========================================================
   APLIKASI.JS - Membuat Kategori, Transaksi, Dashboard, dan
   Laporan benar-benar berfungsi (tambah, ubah, hapus, hitung).
   Data disimpan di browser (localStorage) per akun pengguna.
   ========================================================= */

const username = localStorage.getItem("sedangLogin"); // siapa yang sedang login
const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// ---------- Fungsi bantu ----------
function el(id) { return document.getElementById(id); }

// Ambil / simpan data milik pengguna yang sedang login
function ambil(nama) { return JSON.parse(localStorage.getItem(nama + "_" + username)) || []; }
function simpan(nama, data) { localStorage.setItem(nama + "_" + username, JSON.stringify(data)); }

function idBaru() { return Date.now() + Math.floor(Math.random() * 1000); }

// 25000 -> "Rp 25.000"
function rupiah(angka) { return "Rp " + Number(angka).toLocaleString("id-ID"); }

// "2024-06-12" -> "12/06/2024"
function tanggalIndo(t) { const p = t.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }

// "2024-06" -> "Juni 2024"
function bulanTahun(t) { const p = t.split("-"); return NAMA_BULAN[Number(p[1]) - 1] + " " + p[0]; }

// Supaya teks yang diketik pengguna tidak merusak tampilan HTML
function aman(teks) {
  return String(teks).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Pesan merah (gagal) / hijau (berhasil) di bawah form
function pesan(teks, berhasil) {
  const kotak = el("pesan");
  if (!kotak) return;
  kotak.textContent = teks;
  kotak.className = berhasil ? "pesan sukses" : "pesan gagal";
}

// Hitung total pemasukan, pengeluaran, dan saldo dari daftar transaksi
function hitungTotal(daftar) {
  let masuk = 0, keluar = 0;
  daftar.forEach(function (t) {
    if (t.jenis === "Pemasukan") { masuk += t.nominal; } else { keluar += t.nominal; }
  });
  return { masuk: masuk, keluar: keluar, saldo: masuk - keluar };
}

// Urutkan transaksi: yang terbaru di atas
function urutkanTerbaru(daftar) {
  return daftar.slice().sort(function (a, b) {
    if (a.tanggal === b.tanggal) { return b.id - a.id; }
    return a.tanggal < b.tanggal ? 1 : -1;
  });
}

// Isi pilihan (dropdown) kategori, boleh disaring berdasarkan jenis
function isiPilihanKategori(pilihan, jenis, teksAwal) {
  const nilaiLama = pilihan.value;
  pilihan.innerHTML = '<option value="">' + teksAwal + "</option>";
  ambil("kategori").forEach(function (k) {
    if (jenis === "" || k.jenis === jenis) {
      pilihan.innerHTML += '<option value="' + aman(k.nama) + '">' + aman(k.nama) + "</option>";
    }
  });
  pilihan.value = nilaiLama;                         // coba pertahankan pilihan lama
  if (pilihan.selectedIndex === -1) { pilihan.selectedIndex = 0; }
}

// ---------- Data awal (contoh dari wireframe, hanya sekali per akun) ----------
function siapkanDataAwal() {
  if (localStorage.getItem("kategori_" + username) === null) {
    simpan("kategori", [
      { id: 1, nama: "Uang Saku",      jenis: "Pemasukan" },
      { id: 2, nama: "Freelance",      jenis: "Pemasukan" },
      { id: 3, nama: "Beasiswa",       jenis: "Pemasukan" },
      { id: 4, nama: "Makan & Minum",  jenis: "Pengeluaran" },
      { id: 5, nama: "Transportasi",   jenis: "Pengeluaran" },
      { id: 6, nama: "Hiburan",        jenis: "Pengeluaran" }
    ]);
  }
  if (localStorage.getItem("transaksi_" + username) === null) {
    simpan("transaksi", [
      { id: 11, tanggal: "2024-06-12", jenis: "Pengeluaran", kategori: "Makan & Minum", nominal: 25000,  keterangan: "Makan siang kantin" },
      { id: 12, tanggal: "2024-06-11", jenis: "Pemasukan",   kategori: "Uang Saku",     nominal: 300000, keterangan: "Uang saku mingguan" },
      { id: 13, tanggal: "2024-06-10", jenis: "Pengeluaran", kategori: "Transportasi",  nominal: 15000,  keterangan: "Ongkos ke kampus" },
      { id: 14, tanggal: "2024-06-09", jenis: "Pemasukan",   kategori: "Freelance",     nominal: 250000, keterangan: "Desain poster" }
    ]);
  }
}

/* =========================================================
   HALAMAN KATEGORI
   ========================================================= */
function halamanKategori() {
  let sedangEdit = null;   // null = mode tambah, berisi id = mode ubah

  function kembaliKeModeTambah() {
    sedangEdit = null;
    el("formKategori").reset();
    el("jenisKategori").disabled = false;
    el("tombolSimpan").textContent = "Tambah Kategori";
  }

  function tampilkan() {
    const filter = el("filterJenis").value;
    let isi = "";
    let nomor = 0;
    ambil("kategori").forEach(function (k) {
      if (filter !== "" && k.jenis !== filter) { return; }
      nomor++;
      isi += '<tr><td class="tengah">' + nomor + "</td><td>" + aman(k.nama) + "</td><td>" + k.jenis + "</td>" +
             '<td class="tengah"><button class="btn-kecil" data-aksi="edit" data-id="' + k.id + '">Edit</button> ' +
             '<button class="btn-kecil" data-aksi="hapus" data-id="' + k.id + '">Hapus</button></td></tr>';
    });
    if (isi === "") { isi = '<tr><td colspan="4" class="tengah">Belum ada kategori.</td></tr>'; }
    el("isiTabel").innerHTML = isi;
  }

  // Klik tombol Tambah / Simpan
  el("formKategori").addEventListener("submit", function (e) {
    e.preventDefault();
    const jenis = el("jenisKategori").value;
    const nama = el("namaKategori").value.trim();

    if (jenis === "" || nama === "") { pesan("Jenis dan nama kategori wajib diisi.", false); return; }

    const daftar = ambil("kategori");
    for (let i = 0; i < daftar.length; i++) {
      if (daftar[i].jenis === jenis && daftar[i].nama.toLowerCase() === nama.toLowerCase() && daftar[i].id !== sedangEdit) {
        pesan("Kategori itu sudah ada.", false);
        return;
      }
    }

    if (sedangEdit === null) {
      daftar.push({ id: idBaru(), nama: nama, jenis: jenis });
      pesan("Kategori berhasil ditambahkan.", true);
    } else {
      const transaksi = ambil("transaksi");
      daftar.forEach(function (k) {
        if (k.id === sedangEdit) {
          // nama kategori berubah -> ikut ubah di transaksi yang memakainya
          transaksi.forEach(function (t) {
            if (t.kategori === k.nama && t.jenis === k.jenis) { t.kategori = nama; }
          });
          k.nama = nama;
        }
      });
      simpan("transaksi", transaksi);
      pesan("Kategori berhasil diubah.", true);
    }
    simpan("kategori", daftar);
    kembaliKeModeTambah();
    tampilkan();
  });

  // Klik tombol Batal
  el("tombolBatal").addEventListener("click", function () { kembaliKeModeTambah(); pesan("", true); });

  // Filter jenis di atas tabel
  el("filterJenis").addEventListener("change", tampilkan);

  // Klik Edit / Hapus di dalam tabel
  el("isiTabel").addEventListener("click", function (e) {
    const tombol = e.target.closest("button");
    if (!tombol) { return; }
    const id = Number(tombol.getAttribute("data-id"));
    const daftar = ambil("kategori");
    const kategori = daftar.find(function (k) { return k.id === id; });

    if (tombol.getAttribute("data-aksi") === "edit") {
      sedangEdit = id;
      el("jenisKategori").value = kategori.jenis;
      el("jenisKategori").disabled = true;      // jenis tidak boleh diubah saat edit
      el("namaKategori").value = kategori.nama;
      el("tombolSimpan").textContent = "Simpan Perubahan";
      el("namaKategori").focus();
    } else {
      // Kategori yang masih dipakai transaksi tidak boleh dihapus
      const dipakai = ambil("transaksi").some(function (t) {
        return t.kategori === kategori.nama && t.jenis === kategori.jenis;
      });
      if (dipakai) { pesan("Kategori masih dipakai transaksi, tidak bisa dihapus.", false); return; }
      if (confirm('Hapus kategori "' + kategori.nama + '"?')) {
        simpan("kategori", daftar.filter(function (k) { return k.id !== id; }));
        pesan("Kategori dihapus.", true);
        tampilkan();
      }
    }
  });

  tampilkan();
}

/* =========================================================
   HALAMAN TRANSAKSI
   ========================================================= */
function halamanTransaksi() {
  let sedangEdit = null;

  function kembaliKeModeTambah() {
    sedangEdit = null;
    el("formTransaksi").reset();
    isiPilihanKategori(el("kategori"), "", "Pilih kategori");
    el("tombolSimpan").textContent = "Tambah";
  }

  function tampilkan() {
    const cari = el("cari").value.trim().toLowerCase();
    const jenis = el("filterJenis").value;
    const kategori = el("filterKategori").value;
    const mulai = el("mulai").value;
    const selesai = el("selesai").value;

    let isi = "";
    let nomor = 0;
    urutkanTerbaru(ambil("transaksi")).forEach(function (t) {
      if (cari !== "" && t.keterangan.toLowerCase().indexOf(cari) === -1) { return; }
      if (jenis !== "" && t.jenis !== jenis) { return; }
      if (kategori !== "" && t.kategori !== kategori) { return; }
      if (mulai !== "" && t.tanggal < mulai) { return; }
      if (selesai !== "" && t.tanggal > selesai) { return; }
      nomor++;
      isi += '<tr><td class="tengah">' + nomor + "</td><td>" + tanggalIndo(t.tanggal) + "</td><td>" + t.jenis + "</td><td>" +
             aman(t.kategori) + "</td><td>" + rupiah(t.nominal) + "</td><td>" + aman(t.keterangan) + "</td>" +
             '<td class="tengah"><button class="btn-kecil" data-aksi="edit" data-id="' + t.id + '">Edit</button> ' +
             '<button class="btn-kecil" data-aksi="hapus" data-id="' + t.id + '">Hapus</button></td></tr>';
    });
    if (isi === "") { isi = '<tr><td colspan="7" class="tengah">Belum ada transaksi.</td></tr>'; }
    el("isiTabel").innerHTML = isi;
  }

  // Pilihan kategori mengikuti jenis yang dipilih
  el("jenis").addEventListener("change", function () {
    isiPilihanKategori(el("kategori"), el("jenis").value, "Pilih kategori");
  });
  el("filterJenis").addEventListener("change", function () {
    isiPilihanKategori(el("filterKategori"), el("filterJenis").value, "Kategori");
  });

  // Klik tombol Tambah / Simpan
  el("formTransaksi").addEventListener("submit", function (e) {
    e.preventDefault();
    const tanggal = el("tanggal").value;
    const jenis = el("jenis").value;
    const kategori = el("kategori").value;
    const nominal = Number(el("nominal").value);
    const keterangan = el("keterangan").value.trim();

    if (tanggal === "" || jenis === "" || kategori === "") { pesan("Tanggal, jenis, dan kategori wajib diisi.", false); return; }
    if (!(nominal > 0)) { pesan("Nominal harus lebih dari 0.", false); return; }

    const daftar = ambil("transaksi");
    if (sedangEdit === null) {
      daftar.push({ id: idBaru(), tanggal: tanggal, jenis: jenis, kategori: kategori, nominal: nominal, keterangan: keterangan });
      pesan("Transaksi berhasil ditambahkan.", true);
    } else {
      daftar.forEach(function (t) {
        if (t.id === sedangEdit) {
          t.tanggal = tanggal; t.jenis = jenis; t.kategori = kategori; t.nominal = nominal; t.keterangan = keterangan;
        }
      });
      pesan("Transaksi berhasil diubah.", true);
    }
    simpan("transaksi", daftar);
    kembaliKeModeTambah();
    tampilkan();
  });

  el("tombolBatal").addEventListener("click", function () { kembaliKeModeTambah(); pesan("", true); });

  // Tombol Filter
  el("formFilter").addEventListener("submit", function (e) { e.preventDefault(); tampilkan(); });

  // Klik Edit / Hapus di dalam tabel
  el("isiTabel").addEventListener("click", function (e) {
    const tombol = e.target.closest("button");
    if (!tombol) { return; }
    const id = Number(tombol.getAttribute("data-id"));
    const daftar = ambil("transaksi");
    const t = daftar.find(function (x) { return x.id === id; });

    if (tombol.getAttribute("data-aksi") === "edit") {
      sedangEdit = id;
      el("tanggal").value = t.tanggal;
      el("jenis").value = t.jenis;
      isiPilihanKategori(el("kategori"), t.jenis, "Pilih kategori");
      el("kategori").value = t.kategori;
      el("nominal").value = t.nominal;
      el("keterangan").value = t.keterangan;
      el("tombolSimpan").textContent = "Simpan Perubahan";
      window.scrollTo(0, 0);
    } else if (confirm("Hapus transaksi ini?")) {
      simpan("transaksi", daftar.filter(function (x) { return x.id !== id; }));
      pesan("Transaksi dihapus.", true);
      tampilkan();
    }
  });

  isiPilihanKategori(el("kategori"), "", "Pilih kategori");
  isiPilihanKategori(el("filterKategori"), "", "Kategori");
  tampilkan();
}

/* =========================================================
   HALAMAN DASHBOARD
   ========================================================= */
function halamanDashboard() {
  const semua = ambil("transaksi");
  const total = hitungTotal(semua);
  el("totalMasuk").textContent = rupiah(total.masuk);
  el("totalKeluar").textContent = rupiah(total.keluar);
  el("saldo").textContent = rupiah(total.saldo);

  let isi = "";
  urutkanTerbaru(semua).slice(0, 5).forEach(function (t) {    // 5 transaksi terbaru
    isi += "<tr><td>" + tanggalIndo(t.tanggal) + "</td><td>" + t.jenis + "</td><td>" + aman(t.kategori) +
           "</td><td>" + aman(t.keterangan) + '</td><td class="kanan">' + rupiah(t.nominal) + "</td></tr>";
  });
  if (isi === "") { isi = '<tr><td colspan="5" class="tengah">Belum ada transaksi.</td></tr>'; }
  el("isiTerbaru").innerHTML = isi;
}

/* =========================================================
   HALAMAN LAPORAN
   ========================================================= */
function halamanLaporan() {
  // Kelompokkan per bulan + kategori: hitung jumlah transaksi & total nominal
  function kelompokkan(daftar) {
    const hasil = {};
    daftar.forEach(function (t) {
      const kunci = t.tanggal.slice(0, 7) + "|" + t.kategori;
      if (!hasil[kunci]) { hasil[kunci] = { bulan: t.tanggal.slice(0, 7), kategori: t.kategori, jumlah: 0, total: 0 }; }
      hasil[kunci].jumlah++;
      hasil[kunci].total += t.nominal;
    });
    return Object.keys(hasil).map(function (k) { return hasil[k]; }).sort(function (a, b) {
      if (a.bulan !== b.bulan) { return a.bulan < b.bulan ? 1 : -1; }
      return b.total - a.total;
    });
  }

  // Tulis hasil kelompok ke tabel rekap
  function isiRekap(idIsi, idJumlah, idNominal, daftar) {
    let isi = "", jumlah = 0, nominal = 0;
    kelompokkan(daftar).forEach(function (g) {
      jumlah += g.jumlah;
      nominal += g.total;
      isi += "<tr><td>" + bulanTahun(g.bulan) + "</td><td>" + aman(g.kategori) + '</td><td class="tengah">' +
             g.jumlah + '</td><td class="kanan">' + rupiah(g.total) + "</td></tr>";
    });
    if (isi === "") { isi = '<tr><td colspan="4" class="tengah">Belum ada data.</td></tr>'; }
    el(idIsi).innerHTML = isi;
    el(idJumlah).textContent = jumlah;
    el(idNominal).textContent = rupiah(nominal);
  }

  function tampilkan() {
    const mulai = el("mulai").value;
    const selesai = el("selesai").value;
    const kategori = el("filterKategori").value;
    const jenis = el("filterJenis").value;

    const hasilFilter = ambil("transaksi").filter(function (t) {
      if (mulai !== "" && t.tanggal < mulai) { return false; }
      if (selesai !== "" && t.tanggal > selesai) { return false; }
      if (kategori !== "" && t.kategori !== kategori) { return false; }
      if (jenis !== "" && t.jenis !== jenis) { return false; }
      return true;
    });

    const total = hitungTotal(hasilFilter);
    el("totalMasuk").textContent = rupiah(total.masuk);
    el("totalKeluar").textContent = rupiah(total.keluar);
    el("saldo").textContent = rupiah(total.saldo);

    isiRekap("rekapMasuk", "jumlahMasuk", "nominalMasuk",
             hasilFilter.filter(function (t) { return t.jenis === "Pemasukan"; }));
    isiRekap("rekapKeluar", "jumlahKeluar", "nominalKeluar",
             hasilFilter.filter(function (t) { return t.jenis === "Pengeluaran"; }));
  }

  el("filterJenis").addEventListener("change", function () {
    isiPilihanKategori(el("filterKategori"), el("filterJenis").value, "Semua Kategori");
  });
  el("formFilter").addEventListener("submit", function (e) { e.preventDefault(); tampilkan(); });

  isiPilihanKategori(el("filterKategori"), "", "Semua Kategori");
  tampilkan();
}

/* =========================================================
   MULAI: jalankan sesuai halaman yang sedang dibuka
   ========================================================= */
if (username) {
  siapkanDataAwal();
  if (el("formKategori")) { halamanKategori(); }
  if (el("formTransaksi")) { halamanTransaksi(); }
  if (el("isiTerbaru")) { halamanDashboard(); }
  if (el("rekapMasuk")) { halamanLaporan(); }
}
