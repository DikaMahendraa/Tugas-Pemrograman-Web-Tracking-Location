const db = require('../config/db');

// READ: Mengambil semua data lokasi

const getAllLocations = async (search, category, limit, offset) => {
    let sql = 'SELECT * FROM locations WHERE 1=1';
    const params = [];

    // Filter berdasarkan nama lokasi
    if (search) {
        sql += ' AND location_name LIKE ?';
        params.push(`%${search}%`);
    }

    // Filter berdasarkan kategori
    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    params.push(Number(limit), Number(offset));

    const [rows] = await db.execute(sql, params);

    return rows;
};

// Menghitung jumlah data untuk pagination
const countLocations = async (search, category) => {
    let sql = 'SELECT COUNT(*) AS total FROM locations WHERE 1=1';
    const params = [];

    if (search) {
        sql += ' AND location_name LIKE ?';
        params.push(`%${search}%`);
    }

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    const [rows] = await db.execute(sql, params);

    return rows[0].total;
};


// READ: Mengambil lokasi berdasarkan ID
const getLocationById = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM locations WHERE id = ?',
        [id]
    );

    return rows[0];
};

// CREATE: Menambahkan lokasi baru
const saveLocation = async (data) => {
    const [result] = await db.execute(
        `INSERT INTO locations
        (location_name, category, notes, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)`,
        [
            data.location_name,
            data.category,
            data.notes,
            data.latitude,
            data.longitude
        ]
    );

    return result;
};

// UPDATE: Mengubah data lokasi
const updateLocation = async (id, data) => {
    const [result] = await db.execute(
        `UPDATE locations
        SET location_name = ?,
            category = ?,
            notes = ?,
            latitude = ?,
            longitude = ?
        WHERE id = ?`,
        [
            data.location_name,
            data.category,
            data.notes,
            data.latitude,
            data.longitude,
            id
        ]
    );

    return result;
};

// DELETE: Menghapus lokasi
const deleteLocation = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM locations WHERE id = ?',
        [id]
    );

    return result;
};

module.exports = {
    getAllLocations,
    countLocations,
    getLocationById,
    saveLocation,
    updateLocation,
    deleteLocation
};