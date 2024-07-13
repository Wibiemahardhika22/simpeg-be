const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Konfigurasi koneksi database
const Pegawai = require('./pegawai'); // Import model Pegawai untuk relasi

const Gaji = sequelize.define('Gaji', {
    IDGaji: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDPegawai: {
        type: DataTypes.INTEGER,
        references: {
            model: Pegawai,
            key: 'IDPegawai'
        },
        allowNull: false
    },
    bulan: {
        type: DataTypes.STRING
    },
    jamKerja: {
        type: DataTypes.INTEGER
    },
    gajiPokok: {
        type: DataTypes.FLOAT
    },
    tunjangan: {
        type: DataTypes.FLOAT
    },
    lembur: {
        type: DataTypes.FLOAT
    },
    uangMakan: {
        type: DataTypes.FLOAT
    },
    uangTransport: {
        type: DataTypes.FLOAT
    },
    keterangan: {
        type: DataTypes.STRING
    },
    totalGaji: {
        type: DataTypes.FLOAT
    }
}, {
    timestamps: true,
    tableName: 'gaji',
    hooks: {
        beforeSave: (gaji, options) => {
            gaji.totalGaji = gaji.gajiPokok + gaji.tunjangan + gaji.lembur + gaji.uangMakan + gaji.uangTransport;
        }
    }
});

Gaji.belongsTo(Pegawai, { foreignKey: 'IDPegawai' });
Pegawai.hasMany(Gaji, { foreignKey: 'IDPegawai' });

module.exports = Gaji;
