const Laporan = require('../models/laporan');
const Pegawai = require('../models/pegawai');
const { Op } = require('sequelize');

const createLaporan = async (req, res) => {
    const { judul, isiLaporan, jenis } = req.body;
    if (!judul || !isiLaporan || !jenis) return res.status(400).json({ message: "Judul, Isi Laporan, dan Jenis (Laporan/Saran) harus diisi" });

    try {
        const newLaporan = new Laporan({ judul, isiLaporan, jenis });
        const savedLaporan = await newLaporan.save();

        res.status(201).json({
            message: 'Laporan/saran berhasil dibuat',
            data: savedLaporan
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal membuat laporan/saran',
            error: error.message
        });
    }
};

const getAllLaporan = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;  // Halaman saat ini
        const limit = parseInt(req.query.limit) || 10;  // Jumlah data per halaman
        const search = req.query.search || '';  // Kata kunci pencarian
        const offset = page * limit;

        // Menentukan kriteria pencarian
        const searchFilter = {
            where: {
                [Op.or]: [
                    { judul: { [Op.like]: '%' + search + '%' } },
                    { isiLaporan: { [Op.like]: '%' + search + '%' } },
                    { jenis: { [Op.like]: '%' + search + '%' } }
                ]
            },
            order: [['IDLaporan', 'DESC']],  // Mengurutkan berdasarkan ID secara menurun
            offset,  // Mengatur offset untuk pagination
            limit  // Membatasi jumlah data per halaman
        };

        // Menghitung total baris data yang cocok dengan kriteria pencarian
        const { count: totalRows, rows: laporan } = await Laporan.findAndCountAll(searchFilter);

        // Menghitung total halaman
        const totalPages = Math.ceil(totalRows / limit);

        res.json({
            page,
            limit,
            totalRows,
            totalPages,
            data: laporan
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getLaporanById = async (req, res) => {
    try {
        const laporan = await Laporan.findByPk(req.params.id);
        if (!laporan) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json(laporan);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal mengambil laporan' });
    }
};

const updateLaporan = async (req, res) => {
    try {
        const [laporan] = await Laporan.update(req.body, {
            where: { IDLaporan: req.params.id }
        });

        if (laporan) {
            const laporanUpdated = await Laporan.findByPk(req.params.id);
            res.json({
                message: "Berhasil memperbarui laporan/saran",
                data: laporanUpdated
            });
        } else {
            res.status(404).json({ message: 'Laporan/saran tidak ditemukan' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLaporan = async (req, res) => {
    try {
        const laporan = await Laporan.findByPk(req.params.id);
        if (laporan) {
            await laporan.destroy();
            res.json({ message: 'Berhasil menghapus laporan/saran' });
        } else {
            res.status(404).json({ message: 'Laporan/saran tidak ditemukan' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createLaporan,
    getAllLaporan,
    getLaporanById,
    updateLaporan,
    deleteLaporan
};
