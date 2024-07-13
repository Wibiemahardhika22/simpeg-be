const Pegawai = require('../models/pegawai');
const Jabatan = require('../models/jabatan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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

        const token = jwt.sign({ id: pegawai._id, nama: pegawai.nama, role: "Pegawai" }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
        const pegawai = await Pegawai.findAll({
            include: {
                model: Jabatan,
                attributes: ['namaJabatan'] // hanya ambil namaJabatan dari model Jabatan
            },
            attributes: { exclude: ['password'] }
        });
        res.json(pegawai);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
    const { nip, nama, password, jenisKelamin, IDJabatan, tempatLahir, tanggalLahir, alamat } = req.body;

    try {
        const updateFields = { nip, nama, jenisKelamin, IDJabatan, tempatLahir, tanggalLahir, alamat };

        if (password) {
            // Hanya hash password jika ada password yang baru
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }
        const [updated] = await Pegawai.update(updateFields, {
            where: { IDPegawai: req.params.id }
        });

        // Periksa apakah pegawai ditemukan dan diperbarui
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
