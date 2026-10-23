/* =========================================================
   SCRIPT.JS - Membuat registrasi & login benar-benar jalan
   Data akun disimpan di browser (localStorage), jadi tidak
   perlu server. Cocok untuk tugas kuliah.
   ========================================================= */

// ---------- Fungsi bantu ----------

// Ambil daftar akun yang sudah terdaftar (kalau belum ada, hasilnya kosong)
function ambilPengguna() {
  return JSON.parse(localStorage.getItem("pengguna")) || [];
}

// Tampilkan pesan di bawah form (warna merah = salah, hijau = berhasil)
function tampilkanPesan(teks, berhasil) {
  var kotakPesan = document.getElementById("pesan");
  kotakPesan.textContent = teks;
  kotakPesan.className = berhasil ? "pesan sukses" : "pesan gagal";
}

// ---------- REGISTRASI ----------
var formRegistrasi = document.getElementById("formRegistrasi");
if (formRegistrasi) {
  formRegistrasi.addEventListener("submit", function (e) {
    e.preventDefault(); // cegah halaman reload

    var nama = document.getElementById("namaLengkap").value.trim();
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var konfirmasi = document.getElementById("konfirmasi").value;

    // 1. Semua kolom harus diisi
    if (nama === "" || username === "" || password === "" || konfirmasi === "") {
      tampilkanPesan("Semua kolom wajib diisi.", false);
      return;
    }
    // 2. Password dan konfirmasi harus sama
    if (password !== konfirmasi) {
      tampilkanPesan("Konfirmasi password tidak sama.", false);
      return;
    }
    // 3. Username tidak boleh sudah dipakai
    var daftar = ambilPengguna();
    for (var i = 0; i < daftar.length; i++) {
      if (daftar[i].username === username) {
        tampilkanPesan("Username sudah dipakai, coba yang lain.", false);
        return;
      }
    }

    // Simpan akun baru
    daftar.push({ nama: nama, username: username, password: password });
    localStorage.setItem("pengguna", JSON.stringify(daftar));

    tampilkanPesan("Registrasi berhasil! Mengarahkan ke halaman login...", true);
    setTimeout(function () { window.location.href = "login.html"; }, 1200);
  });
}

// ---------- LOGIN ----------
var formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;

    // Cari akun yang username dan password-nya cocok
    var daftar = ambilPengguna();
    var cocok = null;
    for (var i = 0; i < daftar.length; i++) {
      if (daftar[i].username === username && daftar[i].password === password) {
        cocok = daftar[i];
      }
    }

    if (cocok === null) {
      tampilkanPesan("Username atau password salah.", false);
      return;
    }

    // Simpan siapa yang sedang login, lalu buka dashboard
    localStorage.setItem("sedangLogin", cocok.username);
    window.location.href = "dashboard.html";
  });
}

// ---------- HALAMAN DALAM (Dashboard, Kategori, Transaksi, Laporan) ----------
if (document.body.getAttribute("data-halaman") === "app") {
  var usernameLogin = localStorage.getItem("sedangLogin");
  var akun = null;
  var semua = ambilPengguna();
  for (var j = 0; j < semua.length; j++) {
    if (semua[j].username === usernameLogin) { akun = semua[j]; }
  }

  // Belum login? Kembalikan ke halaman login
  if (akun === null) {
    window.location.href = "login.html";
  } else {
    // Tampilkan nama pengguna di pojok kanan atas
    document.getElementById("namaPengguna").textContent = akun.nama;
  }

  // Tombol Logout: hapus status login, lalu ke halaman login
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("sedangLogin");
  });
}
