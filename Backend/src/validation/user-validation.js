import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
});

const updateUserValidation = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().optional(),
    password: Joi.string().max(255).optional(),
    name: Joi.string().max(255).optional(),
});

export {
    registerUserValidation, loginUserValidation, updateUserValidation
}