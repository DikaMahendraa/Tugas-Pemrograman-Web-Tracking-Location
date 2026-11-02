const Location = require('../models/location.model');

// READ: Menampilkan daftar lokasi

const index = async (req, res) => {
    try {
        // Mengambil parameter pencarian dan filter
        const search = req.query.search || '';
        const category = req.query.category || '';

        // Pengaturan pagination
        const currentPage = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = 5;
        const offset = (currentPage - 1) * limit;

        // Mengambil data lokasi sesuai halaman dan filter
        const locations = await Location.getAllLocations(
            search,
            category,
            limit,
            offset
        );

        // Menghitung total data
        const totalLocations = await Location.countLocations(
            search,
            category
        );

        // Menghitung jumlah halaman
        const totalPages = Math.ceil(totalLocations / limit);

        // Jika halaman melebihi jumlah halaman yang tersedia
        const page = totalPages > 0
            ? Math.min(currentPage, totalPages)
            : 1;

        // Jika halaman dikoreksi, ambil ulang data untuk halaman tersebut
        const finalLocations = page !== currentPage
            ? await Location.getAllLocations(
                search,
                category,
                limit,
                (page - 1) * limit
            )
            : locations;

        res.render('index', {
            locations: finalLocations,
            search,
            category,
            currentPage: page,
            totalPages,
            totalLocations,
            message: req.query.message
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data lokasi.');
    }
};


// CREATE: Menampilkan form tambah
const create = (req, res) => {
    res.render('form', {
        location: null,
        title: 'Tambah Lokasi'
    });
};

// CREATE: Menyimpan lokasi baru
const store = async (req, res) => {
    try {
        const {
            location_name,
            category,
            notes,
            latitude,
            longitude
        } = req.body;

        if (
            !location_name ||
            !category ||
            !isValidCoordinates(latitude, longitude)
        ) {
            return res.status(400).send('Data lokasi tidak valid');
        }

        await Location.saveLocation({
            location_name,
            category,
            notes,
            latitude,
            longitude
        });

        res.redirect('/?message=Lokasi berhasil ditambahkan');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal menyimpan lokasi');
    }
};

// READ: Menampilkan form edit
const edit = async (req, res) => {
    try {
        const location = await Location.getLocationById(req.params.id);

        if (!location) {
            return res.status(404).send('Data lokasi tidak ditemukan');
        }

        res.render('form', {
            location,
            title: 'Edit Lokasi'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data lokasi');
    }
};

// UPDATE: Memperbarui lokasi
const update = async (req, res) => {
    try {
        const {
            location_name,
            category,
            notes,
            latitude,
            longitude
        } = req.body;

        if (
            !location_name ||
            !category ||
            !isValidCoordinates(latitude, longitude)
        ) {
            return res.status(400).send('Data lokasi tidak valid');
        }

        const result = await Location.updateLocation(
            req.params.id,
            {
                location_name,
                category,
                notes,
                latitude,
                longitude
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Data lokasi tidak ditemukan');
        }

        res.redirect('/?message=Lokasi berhasil diperbarui');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal memperbarui lokasi');
    }
};

// DELETE: Menghapus lokasi
const destroy = async (req, res) => {
    try {
        const result = await Location.deleteLocation(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data lokasi tidak ditemukan');
        }

        res.redirect('/?message=Lokasi berhasil dihapus');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal menghapus data lokasi');
    }
};

// Validasi koordinat
function isValidCoordinates(latitude, longitude) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    return (
        latitude !== undefined &&
        longitude !== undefined &&
        String(latitude).trim() !== '' &&
        String(longitude).trim() !== '' &&
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -90 && lat <= 90 &&
        lng >= -180 && lng <= 180
    );
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
};