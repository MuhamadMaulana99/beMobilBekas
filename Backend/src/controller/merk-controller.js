import merkService from "../service/merk-service.js";

const createMerkController = async (req, res, next) => {
  try {
    const merk = await merkService.createMerk(req.body);
    res.status(201).json(merk);
  } catch (error) {
    next(error);
  }
};

const getAllMerkController = async (req, res, next) => {
  try {
    const merks = await merkService.getAllMerk();
    res.status(200).json(merks);
  } catch (error) {
    next(error);
  }
};

const updateMerkController = async (req, res, next) => {
  try {
    const merks = await merkService.updateMerk(req.params.id, req.body);

    res.status(201).json(merks);
  } catch (error) {
    next(error);
  }
};

const deleteMerkController = async (req, res, next) => {
  try {
    const merk = await merkService.deleteMerk(req.params.id);
    res.status(200).json(merk);
  } catch (e) {
    next(e);
  }
};

export default {
  createMerkController,
  getAllMerkController,
  updateMerkController,
  deleteMerkController,
};
