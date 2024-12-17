import { prismaClient } from "../app/database.js";

// Fungsi untuk normalisasi matriks mobil
const normalize = (cars) => {
  const maxValues = {
    tahun: Math.max(...cars.map((car) => new Date(car.tahun).getFullYear())),
    harga: Math.max(...cars.map((car) => car.harga)),
    jarakTempuh: Math.max(...cars.map((car) => car.jarakTempuh)),
  };

  const minValues = {
    harga: Math.min(...cars.map((car) => car.harga)),
    jarakTempuh: Math.min(...cars.map((car) => car.jarakTempuh)),
  };

  return cars.map((car) => ({
    id: car.id,
    nama: car.nama,
    harga: car.harga, // Harga asli dari database
    jarakTempuh: car.jarakTempuh, // Jarak tempuh asli dari database
    tahun: new Date(car.tahun).getFullYear(), // Tahun asli dari database
    persentaseHarga: parseFloat(
      ((minValues.harga / car.harga) * 100).toFixed(1)
    ), // Normalisasi biaya sebagai persentase
    persentaseJarakTempuh: parseFloat(
      ((minValues.jarakTempuh / car.jarakTempuh) * 100).toFixed(1)
    ), // Normalisasi jarak tempuh sebagai persentase
    persentaseTahun: parseFloat(
      ((new Date(car.tahun).getFullYear() / maxValues.tahun) * 100).toFixed(1)
    ), // Normalisasi tahun sebagai persentase
    merkId: car.merkId,
  }));
};

// Fungsi untuk menghitung skor SAW
const calculateSAW = (cars, weights) => {
  const normalizedCars = normalize(cars);

  return normalizedCars
    .map((car) => {
      const score =
        car.persentaseHarga * weights.harga +
        car.persentaseTahun * weights.tahun +
        car.persentaseJarakTempuh * weights.jarakTempuh;

      return { ...car, score };
    })
    .sort((a, b) => b.score - a.score); // Urutkan berdasarkan skor tertinggi
};

// Fungsi utama untuk mendapatkan rekomendasi mobil
export const getRecommendations = async (filters) => {
  try {
    const { minHarga, maxHarga, tahun, jarakTempuh } = filters;

    // Validasi input: jika semua filter kosong, berikan respons kosong
    if (
      minHarga === undefined &&
      maxHarga === undefined &&
      tahun === undefined &&
      jarakTempuh === undefined
    ) {
      return [];
    }

    // Buat kondisi filter dinamis
    const whereCondition = {};
    if (minHarga !== undefined) whereCondition.harga = { gte: minHarga };
    if (maxHarga !== undefined) whereCondition.harga = { lte: maxHarga };
    if (tahun !== undefined) {
      const yearFilter = new Date(`${tahun}-12-31`); // Tahun ke bawah
      whereCondition.tahun = { lte: yearFilter };
    }
    if (jarakTempuh !== undefined)
      whereCondition.jarakTempuh = { lte: jarakTempuh }; // Jarak tempuh ke bawah

    console.log("Kondisi filter:", whereCondition);

    // Ambil data mobil berdasarkan kondisi filter
    const cars = await prismaClient.car.findMany({ where: whereCondition });
    if (cars.length === 0) {
      return []; // Kembalikan array kosong jika tidak ada data
    }

    // Hardcode bobot untuk masing-masing kriteria
    const weights = {
      harga: 0.4, // Bobot untuk harga
      tahun: 0.3, // Bobot untuk tahun
      jarakTempuh: 0.3, // Bobot untuk jarak tempuh
    };

    // Hitung rekomendasi menggunakan metode SAW
    const recommendations = calculateSAW(cars, weights);

    // Format output agar sesuai dengan yang diminta
    const formattedRecommendations = recommendations.map((car) => ({
      id: car.id,
      nama: car.nama,
      harga: car.harga, // Harga asli
      jarakTempuh: car.jarakTempuh, // Jarak tempuh asli
      tahun: car.tahun, // Tahun asli
      persentaseHarga: car.persentaseHarga, // Persentase harga
      persentaseTahun: car.persentaseTahun, // Persentase tahun
      persentaseJarakTempuh: car.persentaseJarakTempuh, // Persentase jarak tempuh
      merkId: car.merkId,
    }));

    return formattedRecommendations;
  } catch (error) {
    console.error("Error pada getRecommendations:", error.message);
    throw new Error(
      error.message || "Terjadi kesalahan saat memproses rekomendasi."
    );
  }
};
