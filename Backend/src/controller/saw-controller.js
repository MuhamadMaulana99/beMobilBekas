import { getRecommendations } from "../service/saw-service.js";

// Controller untuk mendapatkan rekomendasi mobil
export const getCarRecommendations = async (req, res) => {
  try {
    const { minHarga, maxHarga, tahun, jarakTempuh } = req.body;

    // Validasi input
    if (!minHarga && !maxHarga && !tahun && !jarakTempuh) {
      return res.status(400).json({
        message:
          "Harap masukkan minimal satu filter untuk mendapatkan rekomendasi.",
      });
    }

    // Siapkan filter
    const filters = { minHarga, maxHarga, tahun, jarakTempuh };

    // Panggil service dan kirim hasil
    const recommendations = await getRecommendations(filters);
    return res.status(200).json({
      success: true,
      message: "Rekomendasi mobil berhasil diambil.",
      data: recommendations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan saat mengambil rekomendasi.",
    });
  }
};
