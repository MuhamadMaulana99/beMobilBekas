import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    console.log(result, "result");
    res.status(200).json({
      data: result.data,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = req.body;
    request.id = id;

    const result = await userService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await userService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, update, getAll };
