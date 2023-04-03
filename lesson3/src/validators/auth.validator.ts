import Joi from "joi";

import { regexConstant } from "../constants";

export const authValidator = {
  login: Joi.object({
    email: Joi.string().required().regex(regexConstant.EMAIL).trim(),
    password: Joi.string().required().regex(regexConstant.PASSWORD).trim(),
  }),
  forgot: Joi.object({
    email: Joi.string().required().regex(regexConstant.EMAIL).trim(),
  }),
  forgotPassword: Joi.object({
    password: Joi.string().required().regex(regexConstant.PASSWORD).trim(),
  }),
};
