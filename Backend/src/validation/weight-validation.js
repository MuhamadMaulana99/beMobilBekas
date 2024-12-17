import Joi from "joi";

const weightValidation = Joi.object({
  harga: Joi.number().precision(2).required(),
  tahun: Joi.number().precision(2).required(),
  jarakTempuh: Joi.number().precision(2).required(),
  efisiensiBahanBakar: Joi.number().precision(2).required(),
});

const weightUpdateValidation = Joi.object({
  harga: Joi.number().precision(2).optional(),
  tahun: Joi.number().precision(2).optional(),
  jarakTempuh: Joi.number().precision(2).optional(),
  efisiensiBahanBakar: Joi.number().precision(2).optional(),
});

export { weightValidation, weightUpdateValidation };
