const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Konfigurasi CORS agar bisa diakses oleh frontend yang berbeda domain dan port
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(cookieParser());
const sequelize = require('./models/index');

//  Routes
const adminRoutes = require('./routes/admin');
const pegawaiRoutes = require('./routes/pegawai');
const jabatanRoutes = require('./routes/jabatan');
const laporanRoutes = require('./routes/laporan');
const gajiRoutes = require('./routes/gaji');
const { authenticate, authorize } = require('./middleware/auth.js');

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

app.get('/', (req, res) => {
    res.send('API berjalan dengan baik...');
});

app.use('/admin', adminRoutes);
app.use('/pegawai', pegawaiRoutes);
app.use('/jabatan', jabatanRoutes);
app.use('/laporan', laporanRoutes);
app.use('/gaji', gajiRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
