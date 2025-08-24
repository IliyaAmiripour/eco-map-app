import Joi from 'joi';

export const areaSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().max(80).required(),
  polygon: Joi.array().items(Joi.array().items(Joi.number()).length(2)).min(3).required(),
  description: Joi.string().max(500).allow(''),
  createdAt: Joi.date().optional()
});

export const reportSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().max(120).required(),
  description: Joi.string().max(1000).allow(''),
  imageUrl: Joi.string().uri().allow(''),
  coords: Joi.array().items(Joi.number()).length(2).required(),
  areaId: Joi.string().allow(''),
  cleanedBy: Joi.string().allow(''),
  createdAt: Joi.date().optional()
});
