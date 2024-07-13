const express = require('express');
const { addGaji, getAllGaji, getGajiById, updateGaji, deleteGaji } = require('../controllers/gaji');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, authorize(['Admin']), addGaji);
router.get('/', authenticate, getAllGaji);
router.get('/:id', authenticate, getGajiById);
router.put('/:id', authenticate, authorize(['Admin']), updateGaji);
router.delete('/:id', authenticate, authorize(['Admin']), deleteGaji);

module.exports = router;