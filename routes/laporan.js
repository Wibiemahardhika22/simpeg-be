const express = require('express');
const { createLaporan, getAllLaporan, getLaporanById, updateLaporan, deleteLaporan } = require('../controllers/laporan');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createLaporan);
router.get('/', authenticate, getAllLaporan);
router.get('/:id', authenticate, getLaporanById);
router.put('/:id', authenticate, authorize(['Admin']), updateLaporan);
router.delete('/:id', authenticate, authorize(['Admin']), deleteLaporan);

module.exports = router;