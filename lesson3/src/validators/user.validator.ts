import Joi from "joi";

import { regexConstant } from "../constants";
import { EGenders } from "../enums";

export const userValidator = {
  create: Joi.object({
    name: Joi.string().required().min(2).max(50).trim(),
    email: Joi.string().required().regex(regexConstant.EMAIL).trim(),
    password: Joi.string().required().regex(regexConstant.PASSWORD).trim(),
    phone: Joi.string().required().regex(regexConstant.PHONE).trim(),
    gender: Joi.string()
      .valid(...Object.values(EGenders))
      .trim(),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50).trim(),
    gender: Joi.string()
      .valid(...Object.values(EGenders))
      .trim(),
  }),
};
