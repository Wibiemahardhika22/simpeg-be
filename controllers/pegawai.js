const Pegawai = require('../models/pegawai');
const Jabatan = require('../models/jabatan');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const upload = require('../middleware/upload');

const registerPegawai = async (req, res) => {
    const { nip, nama, password, jenisKelamin, IDJabatan, tempatLahir, tanggalLahir, alamat } = req.body;

    if (!nip || !nama || !password || !jenisKelamin) return res.status(400).json({ message: "NIP, Nama, Password, dan Jenis Kelamin harus diisi" });

    try {
        const pegawaiExist = await Pegawai.findOne({ where: { nip: nip } });
        if (pegawaiExist) return res.status(400).json({ message: "NIP sudah terdaftar" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const pegawai = new Pegawai({
            nip,
            nama,
            password: hashedPassword,
            jenisKelamin,
            IDJabatan,
            tempatLahir,
            tanggalLahir,
            alamat
        });

        await pegawai.save();
        res.status(201).json({ message: "Registrasi berhasil" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginPegawai = async (req, res) => {
    const { nip, password } = req.body;

    try {
        const pegawai = await Pegawai.findOne({ where: { nip: nip } });
        if (!pegawai) return res.status(400).json({ message: "NIP atau Password salah" });

        const validPassword = await bcrypt.compare(password, pegawai.password);
        if (!validPassword) return res.status(400).json({ message: "NIP atau Password salah" });

        const token = jwt.sign({ id: pegawai.IDPegawai, nama: pegawai.nama, role: "Pegawai" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login berhasil",
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllPegawai = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;  // Halaman saat ini
        const limit = parseInt(req.query.limit) || 10;  // Jumlah data per halaman
        const search = req.query.search || '';  // Kata kunci pencarian
        const offset = page * limit;

        // Menentukan kriteria pencarian
        const searchFilter = {
            where: {
                [Op.or]: [
                    { nama: { [Op.like]: '%' + search + '%' } },
                    { nip: { [Op.like]: '%' + search + '%' } }
                ]
            },
            include: [
                {
                    model: Jabatan,
                    attributes: ['namaJabatan']  // hanya ambil atribut yang diperlukan dari Jabatan
                }
            ],
            attributes: { exclude: ['password'] },  // Menghilangkan password dari response
            order: [['IDPegawai', 'DESC']],  // Mengurutkan berdasarkan ID secara menurun
            offset,  // Mengatur offset untuk pagination
            limit  // Membatasi jumlah data per halaman
        };

        // Menghitung total baris data yang cocok dengan kriteria pencarian
        const { count: totalRows, rows: pegawai } = await Pegawai.findAndCountAll(searchFilter);

        // Menghitung total halaman
        const totalPages = Math.ceil(totalRows / limit);

        res.json({
            page,
            limit,
            totalRows,
            totalPages,
            data: pegawai
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getPegawaiById = async (req, res) => {
    try {
        const pegawai = await Pegawai.findByPk(req.params.id, {
            include: {
                model: Jabatan,
                attributes: ['namaJabatan'] // hanya ambil namaJabatan dari model Jabatan
            },
            attributes: { exclude: ['password'] } // hilangkan field password dari hasil query
        });

        if (!pegawai) return res.status(404).json({ message: "Pegawai tidak ditemukan" });
        res.json(pegawai);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePegawai = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            const { nip, nama, password, jenisKelamin, IDJabatan, tempatLahir, tanggalLahir, alamat } = req.body;
            const profilePicture = req.file ? req.file.path : null;

            try {
                const updateFields = { nip, nama, jenisKelamin, IDJabatan, tempatLahir, tanggalLahir, alamat };
                if (profilePicture) updateFields.profilePicture = profilePicture;

                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    updateFields.password = hashedPassword;
                }

                const [updated] = await Pegawai.update(updateFields, {
                    where: { IDPegawai: req.params.id }
                });

                if (updated) {
                    const pegawaiUpdated = await Pegawai.findByPk(req.params.id, {
                        attributes: { exclude: ['password'] } // hilangkan field password dari hasil query
                    });
                    res.status(200).json({
                        message: "Update berhasil",
                        data: pegawaiUpdated
                    });
                } else {
                    res.status(404).json({ message: "Pegawai tidak ditemukan" });
                }
            } catch (error) {
                console.error(error.message);
                res.status(500).json({ message: "Update gagal" });
            }
        }
    });
};

const deletePegawai = async (req, res) => {
    try {
        const pegawai = await Pegawai.findByPk(req.params.id);
        if (pegawai) {
            await pegawai.destroy();
            res.json({ message: 'Berhasil menghapus pegawai' });
        } else {
            res.status(404).json({ message: 'Pegawai tidak ditemukan' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerPegawai,
    loginPegawai,
    getAllPegawai,
    getPegawaiById,
    updatePegawai,
    deletePegawai
};
