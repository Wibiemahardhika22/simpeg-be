const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Konfigurasi koneksi database

const Admin = sequelize.define('Admin', {
    IDAdmin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { 
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
    }
}, {
    timestamps: true,
    tableName: 'admin'
});

module.exports = Admin;
