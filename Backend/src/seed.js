import { prismaClient } from "./app/database.js";

const carsData = [
  {
    nama: "Honda HRV",
    harga: 175000000,
    tahun: 2020, // Tahun yang perlu dikonversi
    jarakTempuh: 25000,

    merkId: 1,
  },
  {
    nama: "Honda Brio",
    harga: 145000000,
    tahun: 2018, // Tahun yang perlu dikonversi
    jarakTempuh: 30000,

    merkId: 1,
  },
  {
    nama: "Honda CRV",
    harga: 190000000,
    tahun: 2019, // Tahun yang perlu dikonversi
    jarakTempuh: 35000,
    merkId: 1,
  },
  {
    nama: "Honda BRV",
    harga: 130000000,
    tahun: 2017, // Tahun yang perlu dikonversi
    jarakTempuh: 50000,
    merkId: 1,
  },
  {
    nama: "Honda Beat",
    harga: 110000000,
    tahun: 2021, // Tahun yang perlu dikonversi
    jarakTempuh: 20000,
    merkId: 1,
  },
];

// Fungsi untuk menambahkan data mobil ke dalam database menggunakan Prisma Client
const seedCars = async () => {
  for (const car of carsData) {
    // Mengonversi tahun menjadi DateTime (misalnya 2020 menjadi '2020-01-01')
    const yearAsDate = new Date(car.tahun, 0, 1); // Membuat tanggal pertama di tahun tersebut, seperti '2020-01-01'

    // Menyimpan data mobil dengan tahun yang sudah dikonversi
    await prismaClient.car.create({
      data: {
        ...car,
        tahun: yearAsDate, // Menggunakan tanggal yang sudah dikonversi
      },
    });
  }

  console.log("Data mobil berhasil ditambahkan!");
};

// Jalankan fungsi untuk mengisi database
seedCars()
  .catch((e) => {
    console.error("Terjadi kesalahan saat menambahkan data: ", e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
