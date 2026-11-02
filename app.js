require('dotenv').config();

const express = require('express');
const locationRoutes = require('./routes/location.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', locationRoutes);

// Menjalankan server
app.listen(PORT, () => {
    console.log(`GeoTrack berjalan di http://localhost:${PORT}`);
});