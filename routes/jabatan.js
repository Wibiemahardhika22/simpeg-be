const express = require('express');
const { createJabatan, getAllJabatan, getJabatanById, updateJabatan, deleteJabatan } = require('../controllers/jabatan');

const router = express.Router();

router.post('/', createJabatan);
router.get('/', getAllJabatan);
router.get('/:id', getJabatanById);
router.put('/:id', updateJabatan);
router.delete('/:id', deleteJabatan);

module.exports = router;