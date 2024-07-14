const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ambil IDPegawai dari parameter route
        const idPegawai = req.params.id;
        const uploadPath = path.join('./uploads', idPegawai);

        // Buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // batasan file 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profilePicture'); // nama field yang digunakan untuk upload

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;
