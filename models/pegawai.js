const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Konfigurasi koneksi database
const Jabatan = require('./jabatan'); // Import model Jabatan untuk relasi

const Pegawai = sequelize.define('Pegawai', {
    IDPegawai: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jenisKelamin: {
        type: DataTypes.ENUM('L', 'P'),
        allowNull: false
    },
    IDJabatan: {
        type: DataTypes.INTEGER,
        references: {
            model: Jabatan,
            key: 'IDJabatan'
        }
    },
    tempatLahir: {
        type: DataTypes.STRING
    },
    tanggalLahir: {
        type: DataTypes.DATE
    },
    alamat: {
        type: DataTypes.STRING
    },
    profilePicture: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'pegawai'
});

Pegawai.belongsTo(Jabatan, { foreignKey: 'IDJabatan' });
Jabatan.hasMany(Pegawai, { foreignKey: 'IDJabatan' });

module.exports = Pegawai;
