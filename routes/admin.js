const express = require('express');
const { registerAdmin, loginAdmin, getAllAdmin, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/admin.js');
const { authenticate, authorize } = require('../middleware/auth.js');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/', authenticate, authorize(['Admin']), getAllAdmin)
router.get('/:id', authenticate, authorize(['Admin']), getAdminById)
router.put('/:id', authenticate, authorize(['Admin']), updateAdmin)
router.delete('/:id', authenticate, authorize(['Admin']), deleteAdmin);

module.exports = router;