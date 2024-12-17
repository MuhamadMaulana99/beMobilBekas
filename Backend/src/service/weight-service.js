import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  weightValidation,
  weightUpdateValidation,
} from "../validation/weight-validation.js";
import { validation } from "../validation/validation.js";

export const createWeight = async (userId, request) => {
  const weight = validation(weightValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ResponseError(404, "User not found!");
  }

  const totalKeseluruhan =
    weight.harga +
    weight.tahun +
    weight.jarakTempuh +
    weight.efisiensiBahanBakar;

  if (totalKeseluruhan < 0.1 || totalKeseluruhan > 1) {
    throw new ResponseError(
      400,
      "Hasil total tidak boleh lebih dari atau kurang dari 100%"
    );
  }

  weight.totalKeseluruhan = Math.round(totalKeseluruhan);

  return prismaClient.weight.create({
    data: {
      ...weight,
      userId: user.id, // Memasukkan userId yang valid
    },
    select: {
      harga: true,
      tahun: true,
      jarakTempuh: true,
      efisiensiBahanBakar: true,
      totalKeseluruhan: true,
    },
  });
};

// Service untuk mendapatkan semua mobil
export const getAllWeights = async () => {
  return prismaClient.weight.findMany();
};

// Service untuk memperbarui mobil
export const updateWeight = async (id, request) => {
  const weight = validation(weightUpdateValidation, request);

  const existingWeight = await prismaClient.weight.findUnique({
    where: { id: Number(id) },
  });

  if (!existingWeight) {
    throw new ResponseError(404, "Weight not found!");
  }

  return prismaClient.weight.update({
    where: { id: Number(id) },
    data: weight,
    select: {
      harga: true,
      tahun: true,
      jarakTempuh: true,
      efisiensiBahanBakar: true,
    },
  });
};

// Service untuk menghapus mobil
export const deleteWeight = async (id) => {
  const existingWeight = await prismaClient.weight.findUnique({
    where: { id: Number(id) },
  });

  if (!existingWeight) {
    throw new ResponseError(404, "Weight not found!");
  }

  return prismaClient.weight.delete({
    where: { id: Number(id) },
  });
};
