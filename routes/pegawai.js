const express = require('express');
const { registerPegawai, loginPegawai, getAllPegawai, getPegawaiById, updatePegawai, deletePegawai } = require('../controllers/pegawai.js');
const { authenticate, authorize } = require('../middleware/auth.js');
const { verifyPegawai } = require('../middleware/verifyPegawai.js');

const router = express.Router();

router.post('/register', registerPegawai);
router.post('/login', loginPegawai);
router.get('/', authenticate, authorize(['Admin']), getAllPegawai)
router.get('/:id', authenticate, verifyPegawai, getPegawaiById)
router.put('/:id', authenticate, verifyPegawai, updatePegawai)
router.delete('/:id', authenticate, verifyPegawai, deletePegawai);

module.exports = router;