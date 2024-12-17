import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createMerkValidation,
  updateMerkValidation,
} from "../validation/merk-validation.js";
import { validation } from "../validation/validation.js";

const createMerk = async (data) => {
  const validate = validation(createMerkValidation, data);

  return prismaClient.merk.create({
    data: validate,
    select: {
      id: true,
      merk: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getAllMerk = async () => {
  return prismaClient.merk.findMany();
};

const getMerkById = async (id) => {
  const merk = prismaClient.merk.findUnique({
    where: { id: Number(id) },
  });

  if (!merk) {
    throw new ResponseError(404, "Merk Not Found");
  }

  return merk;
};

const updateMerk = async (id, data) => {
  const validate = validation(updateMerkValidation, data);

  const merk = prismaClient.merk.findUnique({
    where: { id: Number(id) },
  });

  if (!merk) {
    throw new ResponseError(404, "Merk Not Found");
  }

  return prismaClient.merk.update({
    where: { id: Number(id) },
    data: validate,
    select: {
      id: true,
      merk: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const deleteMerk = async (id) => {
  console.log(id, "iddddddd");
  const merk = await prismaClient.merk.findUnique({
    where: { id: Number(id) },
  });

  if (!merk) {
    throw new ResponseError(404, "Merk Not Found");
  }

  return prismaClient.merk.delete({
    where: { id: Number(id) },
  });
};

export default { createMerk, getAllMerk, getMerkById, updateMerk, deleteMerk };
