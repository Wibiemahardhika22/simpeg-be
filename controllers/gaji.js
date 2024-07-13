const Gaji = require('../models/gaji');
const Pegawai = require('../models/pegawai');

const addGaji = async (req, res) => {
    const { IDPegawai, bulan, jamKerja, gajiPokok, tunjangan, lembur, uangMakan, uangTransport, keterangan } = req.body;

    try {
        const existingGaji = await Gaji.findOne({ IDPegawai, bulan });
        if (existingGaji) return res.status(400).json({ message: 'Gaji pegawai untuk bulan ini sudah ada.' });

        const newGaji = new Gaji({
            IDPegawai,
            bulan,
            jamKerja,
            gajiPokok,
            tunjangan,
            lembur,
            uangMakan,
            uangTransport,
            keterangan
        });

        const savedGaji = await newGaji.save();

        await Pegawai.findByIdAndUpdate(IDPegawai, {
            $push: { IDGaji: savedGaji._id }
        });

        res.json(savedGaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllGaji = async (req, res) => {
    try {
        const allGaji = await Gaji.find().populate('IDPegawai', 'nip nama');
        res.json(allGaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getGajiById = async (req, res) => {
    try {
        const gaji = await Gaji.findById(req.params.id).populate('IDPegawai', 'nip nama');
        if (!gaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });
        res.json(gaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateGaji = async (req, res) => {
    try {
        const updatedGaji = await Gaji.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });

        updatedGaji.totalGaji = updatedGaji.gajiPokok + updatedGaji.tunjangan + updatedGaji.lembur + updatedGaji.uangMakan + updatedGaji.uangTransport;
        await updatedGaji.save();
        
        res.json(updatedGaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteGaji = async (req, res) => {
    try {
        const gaji = await Gaji.findByIdAndDelete(req.params.id);
        if (!gaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });
        res.json({ message: 'Gaji deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { addGaji, getAllGaji, getGajiById, updateGaji, deleteGaji };
