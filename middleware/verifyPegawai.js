const verifyPegawai = (req, res, next) => {
    if (req.user.role === 'Pegawai' && req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'Anda hanya dapat mengakses data diri sendiri' });
    }
    next();
};

module.exports = { verifyPegawai };
