# Uraian Kebutuhan Fungsional
Aplikasi Pencatatan Keuangan Harian Mahasiswa

Aktor: **Mahasiswa (Pengguna)**

---

## FR-01 Registrasi
**Deskripsi:** Pengguna baru membuat akun agar dapat memakai aplikasi.
**Input:** nama, email/username, kata sandi, konfirmasi kata sandi.
**Validasi:** semua kolom wajib diisi; email/username belum terdaftar; kata sandi dan konfirmasi sama.

**Langkah:**
1. Pengguna membuka halaman Registrasi.
2. Pengguna mengisi nama, email/username, kata sandi, dan konfirmasi kata sandi.
3. Pengguna menekan tombol **Daftar**.
4. Sistem memvalidasi data.
5. Jika tidak valid, sistem menampilkan pesan kesalahan dan kembali ke langkah 2.
6. Jika valid, sistem menyimpan akun baru.
7. Sistem menampilkan pesan berhasil dan mengarahkan ke halaman Login.

**Output:** akun baru tersimpan.

---

## FR-02 Login
**Deskripsi:** Pengguna masuk ke aplikasi dengan akun yang sudah terdaftar.
**Input:** email/username dan kata sandi.
**Validasi:** akun terdaftar dan kata sandi cocok.

**Langkah:**
1. Pengguna membuka halaman Login.
2. Pengguna mengisi email/username dan kata sandi.
3. Pengguna menekan tombol **Masuk**.
4. Sistem memeriksa kecocokan data dengan data akun.
5. Jika tidak cocok, sistem menampilkan pesan "Email/username atau kata sandi salah" dan kembali ke langkah 2.
6. Jika cocok, sistem membuat sesi login.
7. Sistem menampilkan halaman utama (dashboard).

**Output:** pengguna masuk ke dashboard.

---

## FR-03 CRUD Kategori Pemasukan
**Deskripsi:** Pengguna mengelola kategori pemasukan (misalnya uang saku, beasiswa, gaji kerja sambilan).
**Prasyarat:** pengguna sudah login.

### Tambah
1. Pengguna membuka menu **Kategori Pemasukan**.
2. Pengguna menekan **Tambah Kategori**.
3. Pengguna mengisi nama kategori.
4. Pengguna menekan **Simpan**.
5. Sistem memeriksa nama tidak kosong dan belum ada.
6. Sistem menyimpan kategori dan menampilkannya di daftar.

### Lihat
1. Pengguna membuka menu **Kategori Pemasukan**.
2. Sistem mengambil data kategori milik pengguna.
3. Sistem menampilkan daftar kategori.

### Ubah
1. Pengguna memilih kategori dari daftar lalu menekan **Ubah**.
2. Sistem menampilkan formulir berisi data kategori.
3. Pengguna mengubah nama kategori lalu menekan **Simpan**.
4. Sistem memvalidasi dan memperbarui data.
5. Sistem menampilkan daftar kategori yang sudah diperbarui.

### Hapus
1. Pengguna memilih kategori lalu menekan **Hapus**.
2. Sistem menampilkan konfirmasi penghapusan.
3. Jika pengguna memilih **Batal**, proses dihentikan.
4. Jika pengguna memilih **Ya**, sistem menghapus kategori.
5. Sistem menampilkan daftar kategori terbaru.

---

## FR-04 CRUD Kategori Pengeluaran
**Deskripsi:** Pengguna mengelola kategori pengeluaran (misalnya makan, transportasi, buku, pulsa).
**Prasyarat:** pengguna sudah login.

### Tambah
1. Pengguna membuka menu **Kategori Pengeluaran**.
2. Pengguna menekan **Tambah Kategori**.
3. Pengguna mengisi nama kategori lalu menekan **Simpan**.
4. Sistem memvalidasi nama kategori.
5. Sistem menyimpan data dan menampilkannya di daftar.

### Lihat
1. Pengguna membuka menu **Kategori Pengeluaran**.
2. Sistem mengambil data kategori milik pengguna.
3. Sistem menampilkan daftar kategori.

### Ubah
1. Pengguna memilih kategori lalu menekan **Ubah**.
2. Sistem menampilkan formulir berisi data kategori.
3. Pengguna mengubah nama lalu menekan **Simpan**.
4. Sistem memvalidasi dan memperbarui data.

### Hapus
1. Pengguna memilih kategori lalu menekan **Hapus**.
2. Sistem menampilkan konfirmasi penghapusan.
3. Jika pengguna memilih **Ya**, sistem menghapus kategori; jika **Batal**, proses dihentikan.
4. Sistem menampilkan daftar kategori terbaru.

---

## FR-05 CRUD Transaksi Pemasukan
**Deskripsi:** Pengguna mencatat dan mengelola transaksi uang masuk.
**Input:** tanggal, kategori pemasukan, nominal, keterangan.
**Validasi:** tanggal, kategori, dan nominal wajib diisi; nominal berupa angka lebih dari 0.

### Tambah
1. Pengguna membuka menu **Transaksi Pemasukan**.
2. Pengguna menekan **Tambah Transaksi**.
3. Pengguna mengisi tanggal, memilih kategori, mengisi nominal, dan keterangan.
4. Pengguna menekan **Simpan**.
5. Sistem memvalidasi data.
6. Jika tidak valid, sistem menampilkan pesan kesalahan.
7. Jika valid, sistem menyimpan transaksi dan menambah saldo.

### Lihat
1. Pengguna membuka menu **Transaksi Pemasukan**.
2. Sistem mengambil data transaksi milik pengguna.
3. Sistem menampilkan daftar transaksi (tanggal, kategori, nominal, keterangan).

### Ubah
1. Pengguna memilih transaksi lalu menekan **Ubah**.
2. Sistem menampilkan formulir berisi data transaksi.
3. Pengguna mengubah data lalu menekan **Simpan**.
4. Sistem memvalidasi, memperbarui data, dan menghitung ulang saldo.

### Hapus
1. Pengguna memilih transaksi lalu menekan **Hapus**.
2. Sistem menampilkan konfirmasi penghapusan.
3. Jika pengguna memilih **Ya**, sistem menghapus transaksi dan menghitung ulang saldo.
4. Sistem menampilkan daftar transaksi terbaru.

---

## FR-06 CRUD Transaksi Pengeluaran
**Deskripsi:** Pengguna mencatat dan mengelola transaksi uang keluar.
**Input:** tanggal, kategori pengeluaran, nominal, keterangan.
**Validasi:** tanggal, kategori, dan nominal wajib diisi; nominal berupa angka lebih dari 0.

### Tambah
1. Pengguna membuka menu **Transaksi Pengeluaran**.
2. Pengguna menekan **Tambah Transaksi**.
3. Pengguna mengisi tanggal, memilih kategori, mengisi nominal, dan keterangan.
4. Pengguna menekan **Simpan**.
5. Sistem memvalidasi data.
6. Jika valid, sistem menyimpan transaksi dan mengurangi saldo.

### Lihat
1. Pengguna membuka menu **Transaksi Pengeluaran**.
2. Sistem mengambil data transaksi milik pengguna.
3. Sistem menampilkan daftar transaksi.

### Ubah
1. Pengguna memilih transaksi lalu menekan **Ubah**.
2. Sistem menampilkan formulir berisi data transaksi.
3. Pengguna mengubah data lalu menekan **Simpan**.
4. Sistem memvalidasi, memperbarui data, dan menghitung ulang saldo.

### Hapus
1. Pengguna memilih transaksi lalu menekan **Hapus**.
2. Sistem menampilkan konfirmasi penghapusan.
3. Jika pengguna memilih **Ya**, sistem menghapus transaksi dan menghitung ulang saldo.
4. Sistem menampilkan daftar transaksi terbaru.

---

## FR-07 Cari/Filter Pemasukan
**Deskripsi:** Pengguna mencari transaksi pemasukan berdasarkan kriteria tertentu.
**Input:** kata kunci, rentang tanggal, dan/atau kategori.

**Langkah:**
1. Pengguna membuka menu **Transaksi Pemasukan**.
2. Pengguna mengisi kata kunci dan/atau memilih rentang tanggal dan kategori.
3. Pengguna menekan **Cari/Terapkan Filter**.
4. Sistem mencocokkan kriteria dengan data transaksi pemasukan.
5. Jika ada hasil, sistem menampilkan daftar transaksi yang sesuai.
6. Jika tidak ada hasil, sistem menampilkan pesan "Data tidak ditemukan".

**Output:** daftar pemasukan yang sesuai filter.

---

## FR-08 Cari/Filter Pengeluaran
**Deskripsi:** Pengguna mencari transaksi pengeluaran berdasarkan kriteria tertentu.
**Input:** kata kunci, rentang tanggal, dan/atau kategori.

**Langkah:**
1. Pengguna membuka menu **Transaksi Pengeluaran**.
2. Pengguna mengisi kata kunci dan/atau memilih rentang tanggal dan kategori.
3. Pengguna menekan **Cari/Terapkan Filter**.
4. Sistem mencocokkan kriteria dengan data transaksi pengeluaran.
5. Jika ada hasil, sistem menampilkan daftar transaksi yang sesuai.
6. Jika tidak ada hasil, sistem menampilkan pesan "Data tidak ditemukan".

**Output:** daftar pengeluaran yang sesuai filter.

---

## FR-09 Rekap Pemasukan
**Deskripsi:** Pengguna melihat ringkasan pemasukan pada periode tertentu.
**Input:** periode (harian/mingguan/bulanan atau rentang tanggal).

**Langkah:**
1. Pengguna membuka menu **Laporan**.
2. Pengguna memilih periode.
3. Pengguna menekan **Tampilkan**.
4. Sistem mengambil transaksi pemasukan pada periode tersebut.
5. Sistem mengelompokkan dan menjumlahkan nominal per kategori.
6. Sistem menampilkan tabel rekap pemasukan beserta totalnya.

**Output:** tabel rekap pemasukan per kategori.

---

## FR-10 Rekap Pengeluaran
**Deskripsi:** Pengguna melihat ringkasan pengeluaran pada periode tertentu.
**Input:** periode (harian/mingguan/bulanan atau rentang tanggal).

**Langkah:**
1. Pengguna membuka menu **Laporan**.
2. Pengguna memilih periode.
3. Pengguna menekan **Tampilkan**.
4. Sistem mengambil transaksi pengeluaran pada periode tersebut.
5. Sistem mengelompokkan dan menjumlahkan nominal per kategori.
6. Sistem menampilkan tabel rekap pengeluaran beserta totalnya.

**Output:** tabel rekap pengeluaran per kategori.

---

## FR-11 Total Pemasukan/Pengeluaran/Saldo
**Deskripsi:** Sistem menampilkan total pemasukan, total pengeluaran, dan saldo.
**Rumus:** Saldo = Total Pemasukan − Total Pengeluaran.

**Langkah:**
1. Pengguna membuka dashboard atau halaman Laporan.
2. Sistem mengambil seluruh transaksi pemasukan dan pengeluaran (sesuai periode jika ada filter).
3. Sistem menjumlahkan semua pemasukan.
4. Sistem menjumlahkan semua pengeluaran.
5. Sistem menghitung saldo dengan mengurangi total pemasukan dengan total pengeluaran.
6. Sistem menampilkan ketiga nilai tersebut dalam bentuk kartu ringkasan.

**Output:** total pemasukan, total pengeluaran, dan saldo.