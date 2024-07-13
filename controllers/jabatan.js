const Jabatan = require('../models/jabatan');
const { Op } = require('sequelize');

const createJabatan = async (req, res) => {
    const { namaJabatan, tugas, wewenang } = req.body;
    if (!namaJabatan || !tugas || !wewenang) return res.status(400).json({ message: "Nama Jabatan, Tugas, dan Wewenang harus diisi" });

    const jabatanExist = await Jabatan.findOne({ where: { namaJabatan: req.body.namaJabatan } });
    if (jabatanExist) return res.status(400).json({ message: "Jabatan sudah ada" });

    try {
        const newJabatan = new Jabatan({ namaJabatan, tugas, wewenang });
        const savedJabatan = await newJabatan.save();
        res.status(201).json(savedJabatan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllJabatan = async (req, res) => {
    try {
        const search = req.query.search || '';

        // Menentukan kriteria pencarian
        const searchFilter = {
            namaJabatan: {
                [Op.like]: '%' + search + '%'
            }
        };

        const jabatan = await Jabatan.findAll({
            where: searchFilter,
            order: [['IDJabatan', 'ASC']]
        });

        if (jabatan.length < 1) return res.status(404).json({ message: "Jabatan tidak ditemukan" });

        res.status(200).json(jabatan);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getJabatanById = async (req, res) => {
    try {
        const jabatan = await Jabatan.findByPk(req.params.id);
        if (!jabatan) return res.status(404).json({ message: "Jabatan tidak ditemukan" });
        res.json(jabatan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateJabatan = async (req, res) => {
    try {
        const [jabatan] = await Jabatan.update(req.body, {
            where: { IDJabatan: req.params.id }
        });

        if (jabatan) {
            const jabatanUpdated = await Jabatan.findByPk(req.params.id);
            res.json({
                message: "Berhasil memperbarui jabatan",
                jabatanUpdated
            });
        } else {
            res.status(404).json({ message: 'Jabatan tidak ditemukan' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteJabatan = async (req, res) => {
    try {
        const jabatan = await Jabatan.findByPk(req.params.id);
        if (jabatan) {
            await jabatan.destroy();
            res.json({ message: 'Berhasil menghapus jabatan' });
        } else {
            res.status(404).json({ message: 'Jabatan tidak ditemukan' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createJabatan,
    getAllJabatan,
    getJabatanById,
    updateJabatan,
    deleteJabatan
};
