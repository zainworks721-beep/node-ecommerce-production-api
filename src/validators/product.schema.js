import Joi from 'joi';
export const productJoiSchema = Joi.object({
    title: Joi.string().trim().min(3).max(150).required(),
    description: Joi.string().trim().min(10).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().trim().required(),
    stock: Joi.number().integer().min(0).default(0),
    image: Joi.string().trim().uri().required(),
});

export const productPatchJoiSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().min(10).optional(),
  price: Joi.number().positive().optional(),
  category: Joi.string().trim().optional(),
  stock: Joi.number().integer().min(0).optional(),
})
  .min(1) 
  .messages({
    'object.min': 'Please provide at least one field to update',
  });