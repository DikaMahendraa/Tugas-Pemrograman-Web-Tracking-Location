
-- ==========================================
-- GEOTRACK - DATABASE
-- Tugas 3 Pemrograman Web
-- ==========================================

-- Membuat database
CREATE DATABASE IF NOT EXISTS geotrack;

-- Menggunakan database
USE geotrack;

-- Menghapus tabel jika sudah ada
DROP TABLE IF EXISTS locations;

-- Membuat tabel locations
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    notes TEXT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- DATA CONTOH
-- ==========================================

INSERT INTO locations
(location_name, category, notes, latitude, longitude)
VALUES
(
    'Kampus Undiknas',
    'Pendidikan',
    'Lokasi kampus untuk kegiatan perkuliahan',
    -8.6700000,
    115.2200000
),
(
    'Pantai Kuta',
    'Wisata',
    'Salah satu destinasi wisata di Bali',
    -8.7185000,
    115.1686000
),
(
    'Lapangan Puputan',
    'Olahraga',
    'Area terbuka untuk aktivitas olahraga',
    -8.6565000,
    115.2160000
);
