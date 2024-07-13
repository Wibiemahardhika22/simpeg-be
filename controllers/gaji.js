const Gaji = require('../models/gaji');
const Pegawai = require('../models/pegawai');

const addGaji = async (req, res) => {
    const { IDPegawai, bulan, jamKerja, gajiPokok, tunjangan, lembur, uangMakan, uangTransport, keterangan } = req.body;

    try {
        const existingGaji = await Gaji.findOne({ where: { IDPegawai, bulan } });
        if (existingGaji) return res.status(400).json({ message: 'Gaji pegawai untuk bulan ini sudah ada.' });

        const newGaji = await Gaji.create({
            IDPegawai,
            bulan,
            jamKerja: parseFloat(jamKerja),
            gajiPokok: parseFloat(gajiPokok),
            tunjangan: parseFloat(tunjangan),
            lembur: parseFloat(lembur),
            uangMakan: parseFloat(uangMakan),
            uangTransport: parseFloat(uangTransport),
            keterangan
        });

        res.json({
            message: "Gaji berhasil ditambahkan",
            newGaji
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllGaji = async (req, res) => {
    try {
        const allGaji = await Gaji.findAll({
            include: {
                model: Pegawai,
                attributes: ['nip', 'nama']
            }
        });
        res.json(allGaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getGajiById = async (req, res) => {
    try {
        const gaji = await Gaji.findByPk(req.params.id, {
            include: {
                model: Pegawai,
                attributes: ['nip', 'nama']
            }
        });
        if (!gaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });
        res.json(gaji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateGaji = async (req, res) => {
    try {
        const gaji = await Gaji.findByPk(req.params.id);
        if (!gaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });

        const {
            IDPegawai = gaji.IDPegawai,
            bulan = gaji.bulan,
            jamKerja = gaji.jamKerja,
            gajiPokok = gaji.gajiPokok,
            tunjangan = gaji.tunjangan,
            lembur = gaji.lembur,
            uangMakan = gaji.uangMakan,
            uangTransport = gaji.uangTransport,
            keterangan = gaji.keterangan
        } = req.body;

        // Konversi menjadi angka
        const gajiPokokNum = parseFloat(gajiPokok) || 0;
        const tunjanganNum = parseFloat(tunjangan) || 0;
        const lemburNum = parseFloat(lembur) || 0;
        const uangMakanNum = parseFloat(uangMakan) || 0;
        const uangTransportNum = parseFloat(uangTransport) || 0;

        const updatedGaji = await gaji.update({
            IDPegawai,
            bulan,
            jamKerja,
            gajiPokok: gajiPokokNum,
            tunjangan: tunjanganNum,
            lembur: lemburNum,
            uangMakan: uangMakanNum,
            uangTransport: uangTransportNum,
            keterangan,
            totalGaji: gajiPokokNum + tunjanganNum + lemburNum + uangMakanNum + uangTransportNum
        });

        res.json({
            message: "Berhasil memperbarui gaji",
            data: updatedGaji
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteGaji = async (req, res) => {
    try {
        const gaji = await Gaji.findByPk(req.params.id);
        if (!gaji) return res.status(404).json({ message: "Gaji tidak ditemukan" });

        await gaji.destroy();
        res.json({ message: 'Berhasil menghapus gaji' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { addGaji, getAllGaji, getGajiById, updateGaji, deleteGaji };
