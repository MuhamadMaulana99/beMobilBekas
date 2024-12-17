import * as carService from "../service/car-service.js";

// Controller untuk menambahkan mobil
export const createCar = async (req, res, next) => {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan semua mobil
export const getAllCars = async (req, res, next) => {
  try {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

// Controller untuk memperbarui mobil
export const updateCar = async (req, res, next) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

// Controller untuk menghapus mobil
export const deleteCar = async (req, res, next) => {
  try {
    await carService.deleteCar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
