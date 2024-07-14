const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const registerAdmin = async (req, res) => {
    const { username, nama, password } = req.body;
    if (!username || !nama || !password) return res.status(400).json({ message: "Username, Nama, dan Password harus diisi" });

    const adminExisting = await Admin.findOne({ where: { username: username.toLowerCase() } });
    if (adminExisting) return res.status(400).json({ message: "Username sudah terdaftar" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await Admin.create({
            username: username.toLowerCase(),
            nama,
            password: hashedPassword
        });
        res.status(201).json({ message: "Register berhasil" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Register gagal" });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username dan Password harus diisi" });

    try {
        const admin = await Admin.findOne({ where: { username: username.toLowerCase() } });
        if (!admin) return res.status(400).json({ message: "Username atau Password salah" });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(400).json({ message: "Username atau Password salah" });

        const token = jwt.sign({ id: admin.IDAdmin, nama: admin.nama, role: "Admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login berhasil",
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Login gagal" });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });
        res.json(admin);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateAdmin = async (req, res) => {
    const { username, nama, password } = req.body;
    try {
        const updateFields = { username, nama };

        if (password) {
            // Hanya hash password jika ada password yang baru
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const [updated] = await Admin.update(updateFields, {
            where: { IDAdmin: req.params.id }
        });

        // Periksa apakah admin ditemukan dan diperbarui
        if (updated) {
            const adminUpdated = await Admin.findByPk(req.params.id, {
                attributes: { exclude: ['password'] } // hilangkan field password dari hasil query
            });
            res.status(200).json({
                message: "Update berhasil",
                data: adminUpdated
            });
        } else {
            res.status(404).json({ message: "Admin tidak ditemukan" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Update gagal" });
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            await admin.destroy();
            res.json({ message: 'Berhasil menghapus admin' });
        } else {
            res.status(404).json({ message: 'Admin tidak ditemukan' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin
};
