const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Konfigurasi koneksi database

const Jabatan = sequelize.define('Jabatan', {
    IDJabatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaJabatan: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tugas: {
        type: DataTypes.STRING
    },
    wewenang: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'jabatan'
});

module.exports = Jabatan;
