import express from "express";
import userController from "../controller/user-controller.js";
import * as carController from "../controller/car-controller.js";
import merkController from "../controller/merk-controller.js";
import * as weightController from "../controller/weight-controller.js";
import { getCarRecommendations } from "../controller/saw-controller.js";

const publicRouter = new express.Router();

// auth
publicRouter.post("/register", userController.register);
publicRouter.post("/login", userController.login);

// Todo: add car
publicRouter.get("/cars", carController.getAllCars);
publicRouter.post("/cars", carController.createCar);
publicRouter.put("/cars/:id", carController.updateCar);
publicRouter.delete("/cars/:id", carController.deleteCar);

// Todo: Merks
publicRouter.get("/merk", merkController.getAllMerkController);
publicRouter.post("/merk", merkController.createMerkController);
publicRouter.put("/merk/:id", merkController.updateMerkController);
publicRouter.delete("/merk/:id", merkController.deleteMerkController);

publicRouter.post("/recommendations", getCarRecommendations);
// // weight
// publicRouter.get("/weight", weightController.getAllWeights);
// publicRouter.post("/weight", weightController.createWeight);
// publicRouter.put("/weight/:id", weightController.updateWeight);
// publicRouter.delete("/weight/:id", weightController.deleteWeight);

export { publicRouter };
