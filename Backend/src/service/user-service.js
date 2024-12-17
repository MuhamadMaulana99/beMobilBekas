import bcrypt from "bcrypt";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validation } from "../validation/validation.js";
import jwt from "jsonwebtoken";

const register = async (request) => {
  const user = validation(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: { email: user.email },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exist!");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      email: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validation(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { email: loginRequest.email },
  });

  if (!user) {
    throw new ResponseError(401, "Email or Password wrong");
  }

  const validatePassword = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!validatePassword) {
    throw new ResponseError(401, "Email or Password wrong");
  }

  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return { data: user, token };
};

const update = async (request) => {
  const updateRequest = validation(updateUserValidation, request);

  const dataUser = await prismaClient.user.findUnique({
    where: { id: updateRequest.id },
  });

  if (!dataUser) {
    throw new ResponseError(404, "User not found");
  }

  const data = {};

  if (updateRequest.name) {
    data.name = updateRequest.name;
  }
  if (updateRequest.password) {
    data.password = await bcrypt.hash(updateRequest.password, 10);
  }

  return prismaClient.user.update({
    data,
    where: { id: dataUser.id },
    select: {
      email: true,
      name: true,
    },
  });
};

const getAll = async () => {
  return prismaClient.user.findMany({
    select: {
      email: true,
      name: true,
    },
  });
};

export default { register, login, update, getAll };
