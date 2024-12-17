import * as weightService from "../service/weight-service.js";

// Controller untuk menambahkan mobil
export const createWeight = async (req, res, next) => {
  try {
    const car = await weightService.createWeight(req.user.id, req.body);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan semua mobil
export const getAllWeights = async (req, res, next) => {
  try {
    const weight = await weightService.getAllWeights();
    res.status(200).json(weight);
  } catch (error) {
    next(error);
  }
};

// Controller untuk memperbarui mobil
export const updateWeight = async (req, res, next) => {
  try {
    const weight = await weightService.updateWeight(req.params.id, req.body);
    res.status(200).json(weight);
  } catch (error) {
    next(error);
  }
};

// Controller untuk menghapus mobil
export const deleteWeight = async (req, res, next) => {
  try {
    await weightService.deleteWeight(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
