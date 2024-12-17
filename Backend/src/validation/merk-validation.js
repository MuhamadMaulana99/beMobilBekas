import Joi from "joi";

const createMerkValidation = Joi.object({
  merk: Joi.string().max(20).required(),
});

const updateMerkValidation = Joi.object({
  merk: Joi.string().max(20).optional(),
});

export { createMerkValidation, updateMerkValidation };
