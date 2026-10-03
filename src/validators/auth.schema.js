import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string()
        .min(8)
        .required(),
    phoneNumber: Joi.string().trim().optional().allow("", null),
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().required(),
});