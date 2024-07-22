const express = require('express');
const { registerPegawai, loginPegawai, getAllPegawai, getPegawaiById, updatePegawai, deletePegawai } = require('../controllers/pegawai.js');
const { authenticate, authorize } = require('../middleware/auth.js');
const { verifyPegawai } = require('../middleware/verifyPegawai.js');

const router = express.Router();

/*
    Penjelasan Pembatasan Hak Akses

    1. Route Registrasi Pegawai:
       - URL: POST /register
       - Fungsi: Mendaftarkan pegawai baru ke sistem.
       - Akses: Tidak memerlukan autentikasi. Dapat diakses oleh siapa saja yang ingin mendaftar.

    2. Route Login Pegawai:
       - URL: POST /login
       - Fungsi: Memproses login pegawai dan menghasilkan token autentikasi.
       - Akses: Tidak memerlukan autentikasi sebelumnya. Dapat diakses oleh siapa saja yang ingin masuk.

    3. Route Mendapatkan Semua Pegawai:
       - URL: GET /
       - Fungsi: Mengambil daftar semua pegawai dari sistem.
       - Akses:
         - Middleware 'authenticate': Memastikan pengguna sudah terautentikasi (login) sebelum mengakses data.
         - Middleware 'authorize(['Admin'])': Memastikan bahwa hanya pengguna dengan role 'Admin' yang dapat mengakses rute ini. Hanya Admin yang diizinkan untuk melihat seluruh daftar pegawai.

        4. Route Mendapatkan Data Pegawai Berdasarkan ID:
       - URL: GET /:id
       - Fungsi: Mengambil data pegawai tertentu berdasarkan ID.
       - Akses:
         - Middleware 'authenticate': Memastikan pengguna sudah terautentikasi.
         - Middleware 'verifyPegawai': Memverifikasi bahwa pengguna memiliki hak akses untuk melihat data pegawai dengan ID tertentu. 
           - Jika pengguna adalah pegawai dan ID pegawai yang diminta bukan ID pengguna yang sedang login, maka akses akan ditolak dengan status 403 (Forbidden). Ini memastikan bahwa pegawai hanya dapat mengakses data diri mereka sendiri.

    5. Route Memperbarui Data Pegawai Berdasarkan ID:
       - URL: PUT /:id
       - Fungsi: Memperbarui data pegawai tertentu berdasarkan ID.
       - Akses:
         - Middleware 'authenticate': Memastikan pengguna sudah terautentikasi.
         - Middleware 'verifyPegawai': Memverifikasi bahwa pengguna memiliki hak untuk memperbarui data pegawai dengan ID tertentu.
           - Jika pengguna adalah pegawai dan ID pegawai yang diminta bukan ID pengguna yang sedang login, maka akses akan ditolak dengan status 403 (Forbidden). Ini memastikan bahwa pegawai hanya dapat memperbarui data diri mereka sendiri.

    6. Route Menghapus Data Pegawai Berdasarkan ID:
       - URL: DELETE /:id
       - Fungsi: Menghapus data pegawai tertentu berdasarkan ID.
       - Akses:
         - Middleware 'authenticate': Memastikan pengguna sudah terautentikasi.
         - Middleware 'verifyPegawai': Memverifikasi bahwa pengguna memiliki hak untuk menghapus data pegawai dengan ID tertentu.
           - Jika pengguna adalah pegawai dan ID pegawai yang diminta bukan ID pengguna yang sedang login, maka akses akan ditolak dengan status 403 (Forbidden). Ini memastikan bahwa pegawai hanya dapat menghapus data diri mereka sendiri.

    Pembatasan hak akses ini bertujuan untuk melindungi data pegawai dengan memastikan bahwa hanya pengguna yang sah dan berwenang yang dapat mengakses atau memodifikasi informasi sensitif. Middleware 'verifyPegawai' khusus menangani kasus di mana pegawai hanya dapat mengakses data mereka sendiri, mencegah akses yang tidak sah ke data pegawai lain.
*/

router.post('/register', registerPegawai);
router.post('/login', loginPegawai);
router.get('/', authenticate, authorize(['Admin']), getAllPegawai)
router.get('/:id', authenticate, verifyPegawai, getPegawaiById)
router.put('/:id', authenticate, verifyPegawai, updatePegawai)
router.delete('/:id', authenticate, verifyPegawai, deletePegawai);

module.exports = router;