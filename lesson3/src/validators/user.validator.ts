import Joi from "joi";

import { regexConstant } from "../constants";
import { EGenres } from "../types";

export const userValidator = {
  create: Joi.object({
    name: Joi.string().required().min(2).max(50).trim(),
    email: Joi.string().required().regex(regexConstant.EMAIL).trim(),
    password: Joi.string().required().regex(regexConstant.PASSWORD).trim(),
    gender: Joi.string()
      .valid(...Object.values(EGenres))
      .trim(),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50).trim(),
    gender: Joi.string()
      .valid(...Object.values(EGenres))
      .trim(),
  }),
};
