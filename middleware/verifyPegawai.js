const verifyPegawai = (req, res, next) => {
    if (req.user.role === 'pegawai' && req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'Anda hanya dapat mengakses data diri sendiri' });
    }
    next();
};

module.exports = { verifyPegawai };
