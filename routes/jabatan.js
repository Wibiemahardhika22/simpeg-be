const express = require('express');
const { createJabatan, getAllJabatan, getJabatanById, updateJabatan, deleteJabatan } = require('../controllers/jabatan');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, authorize(['Admin']), createJabatan);
router.get('/', authenticate, getAllJabatan);
router.get('/:id', authenticate, getJabatanById);
router.put('/:id', authenticate, authorize(['Admin']), updateJabatan);
router.delete('/:id', authenticate, authorize(['Admin']), deleteJabatan);

module.exports = router;