const Laporan = require('../models/laporan');
const Pegawai = require('../models/pegawai');

const createLaporan = async (req, res) => {
    const { pegawaiId, judul, isi } = req.body;

    try {
        const pegawai = await Pegawai.findById(pegawaiId);
        if (!pegawai) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

        const newLaporan = new Laporan({ pegawaiId, judul, isi });
        const savedLaporan = await newLaporan.save();

        res.status(201).json(savedLaporan);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal membuat laporan' });
    }
};

const getAllLaporan = async (req, res) => {
    try {
        const laporans = await Laporan.find().populate('pegawaiId', 'nama');
        res.json(laporans);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal mengambil laporan' });
    }
};

const getLaporanById = async (req, res) => {
    try {
        const laporan = await Laporan.findById(req.params.id).populate('pegawaiId', 'nama');
        if (!laporan) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json(laporan);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal mengambil laporan' });
    }
};

const updateLaporan = async (req, res) => {
    try {
        const laporan = await Laporan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!laporan) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json(laporan);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal memperbarui laporan' });
    }
};

const deleteLaporan = async (req, res) => {
    try {
        const laporan = await Laporan.findByIdAndDelete(req.params.id);
        if (!laporan) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json({ message: 'Laporan berhasil dihapus' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal menghapus laporan' });
    }
};

module.exports = {
    createLaporan,
    getAllLaporan,
    getLaporanById,
    updateLaporan,
    deleteLaporan
};
