const express = require('express');
const { addGaji, getAllGaji, getGajiById, updateGaji, deleteGaji } = require('../controllers/gaji');

const router = express.Router();

router.post('/', addGaji);
router.get('/', getAllGaji);
router.get('/:id', getGajiById);
router.put('/:id', updateGaji);
router.delete('/:id', deleteGaji);

module.exports = router;