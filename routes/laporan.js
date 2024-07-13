const express = require('express');
const { createLaporan, getAllLaporan, getLaporanById, updateLaporan, deleteLaporan } = require('../controllers/laporan');

const router = express.Router();

router.post('/', createLaporan);
router.get('/', getAllLaporan);
router.get('/:id', getLaporanById);
router.put('/:id', updateLaporan);
router.delete('/:id', deleteLaporan);

module.exports = router;