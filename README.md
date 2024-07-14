# Sistem Informasi Kepegawaian dengan Menggunakan Express JS dan MySQL

## Author

Nama:
`Wibie Mahardhika Adi`

NIM:
`2100016081`

Kelas:
`D`

## Teknologi yang Digunakan

- **Express JS**: Framework untuk Node.js yang digunakan untuk membangun aplikasi web dan API.
- **MySQL**: Database relasional yang digunakan untuk menyimpan data pegawai dan informasi kepegawaian.
- **Sequelize**: ORM (Object Relational Mapping) untuk Node.js, digunakan untuk memodelkan data dan berinteraksi dengan database.
- **JWT (JSON Web Token)**: Digunakan untuk otentikasi dan otorisasi pengguna, mengamankan komunikasi antara client dan server.
- **Nodemon**: Alat pengembangan yang secara otomatis me-restart server saat ada perubahan kode, meningkatkan produktivitas pengembangan.
- **dotenv**: Memudahkan pengelolaan variabel lingkungan dengan memuat konfigurasi dari file .env.
- **cookie-parser**: Middleware untuk mengelola cookies di Express.js, memungkinkan parsing dan manipulasi cookies dalam request.
- **Cors**: Middleware untuk mengatasi masalah CORS (Cross-Origin Resource Sharing), memungkinkan frontend dan backend berkomunikasi dengan aman.
- **bcrypt**: Library untuk hashing password dengan metode bcrypt, digunakan untuk meningkatkan keamanan penyimpanan password.

## Cara Instalasi

### 1. Clone Repository
Clone repository project dari GitHub menggunakan command berikut:
```bash
git clone https://github.com/Wibiemahardhika22/simpeg-be.git
```

### 2. Direktori Project
Masuk ke direktori project yang telah di-clone:
```bash
cd simpeg-be
```

### 3. Install Dependencies
Instal semua dependencies yang diperlukan menggunakan npm:
```bash
npm install
```

Atau menggunakan yarn:
```bash
yarn
```

### 4. Konfigurasi Environment Variables
Buat file `.env` dari template `.env.example` menggunakan perintah:
```bash
cp .env.example .env
```

Kemudian sesuaikan isi dari file .env. Contoh:
```bash
PORT=3000
DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=simpeg
JWT_SECRET=kuncirahasia
```

### 5. Menjalankan Server
Jalankan server dengan perintah berikut:
```bash
npm start
```

Anda juga bisa menggunakan nodemon untuk menjalankan server dengan perintah:
```bash
nodemon index.js 
```

### 6. Verifikasi
Buka browser/postman dan akses http://localhost:3000 untuk memastikan server berjalan dengan baik.

## Import JSON Testing dengan Postman

Setelah menyelesaikan instalasi dan konfigurasi proyek, Anda dapat menggunakan Postman untuk menguji API yang telah dibuat. File koleksi Postman yang digunakan untuk pengujian dapat ditemukan dalam repository GitHub dengan nama UAS DPSI 2100016081 postman_collection.json.

### Langkah-langkah Mengimpor Koleksi Postman:

### 1. Buka Postman
Pastikan Anda sudah mengunduh dan menginstal Postman di komputer Anda.

### 2. Import Koleksi
- Klik tombol Import di sudut kiri atas aplikasi Postman atau dengan menggunakan `CTRL+O`.
- Drag and drop file yang akan diimport atau Klik `Select Files` dan navigasikan ke file `UAS DPSI 2100016081 postman_collection.json` yang ada di dalam repository yang telah di-clone.

### 3. Konfirmasi Import
- Setelah file dipilih, klik Open untuk memulai proses impor.
- Postman akan menampilkan daftar koleksi dan lingkungan yang akan diimpor. Klik Import untuk mengonfirmasi.

### 4. Menggunakan Koleksi
- Setelah koleksi diimpor, Anda akan melihat daftar endpoint yang tersedia dalam koleksi tersebut.
- Anda bisa memilih dan menjalankan setiap request untuk menguji API. Pastikan server lokal Anda berjalan di alamat yang sesuai dengan konfigurasi environment di Postman.