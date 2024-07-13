const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        timezone: '+07:00', // Set timezone to WIB (Waktu Indonesia Barat)
        dialectOptions: {
            useUTC: false, // Disable UTC mode
        },
    });

// Uji koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;