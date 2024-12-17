import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import * as carController from "../controller/car-controller.js";
import * as weightController from "../controller/weight-controller.js";
// import {
//   deleteRecommendationsController,
//   getAllRecommendationsController,
//   getByIdRecommendationsController,
//   postRecommendationsController,
// } from "../controller/saw-controller.js";

const privateRouter = express.Router();
privateRouter.use(authMiddleware);

// users
privateRouter.get("/users", userController.getAll);
privateRouter.post("/users/update/:id", userController.update);

// Todo: add car
privateRouter.get("/cars", carController.getAllCars);
privateRouter.post("/cars", carController.createCar);
privateRouter.put("/cars/:id", carController.updateCar);
privateRouter.delete("/cars/:id", carController.deleteCar);

// weight
privateRouter.get("/weight", weightController.getAllWeights);
privateRouter.post("/weight", weightController.createWeight);
privateRouter.put("/weight/:id", weightController.updateWeight);
privateRouter.delete("/weight/:id", weightController.deleteWeight);

// privateRouter.post("/recommendations", postRecommendationsController);
// privateRouter.get("/recommendations", getAllRecommendationsController);
// privateRouter.get("/recommendations/:id", getByIdRecommendationsController);
// privateRouter.delete("/recommendations/:id", deleteRecommendationsController);

export { privateRouter };
