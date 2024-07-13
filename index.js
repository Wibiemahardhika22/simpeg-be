const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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


app.get('/', (req, res) => {
    res.send('API berjalan dengan baik...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
