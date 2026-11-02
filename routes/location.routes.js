const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location.controller');

// READ: Menampilkan daftar lokasi
router.get('/', locationController.index);

// CREATE: Menampilkan formulir tambah lokasi
router.get('/new', locationController.create);

// CREATE: Menambahkan lokasi
router.post('/save', locationController.store);

// READ: Menampilkan form edit
router.get('/edit/:id', locationController.edit);

// UPDATE: Memperbarui lokasi
router.post('/update/:id', locationController.update);

// DELETE: Menghapus lokasi
router.post('/delete/:id', locationController.destroy);

module.exports = router;