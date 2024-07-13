const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Konfigurasi koneksi database

const Laporan = sequelize.define('Laporan', {
    IDLaporan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    isiLaporan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jenis: {
        type: DataTypes.ENUM('Laporan', 'Saran'),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'laporan'
});

module.exports = Laporan;
