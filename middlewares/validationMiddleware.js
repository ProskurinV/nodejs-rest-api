const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        status: validationSchema.error.details,
      });
    }
    next();
  },
  patchContactFavoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        status: validationSchema.error.details,
      });
    }
    next();
  },
  userRegisterValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
      subscription: Joi.string(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        status: validationSchema.error.details,
      });
    }
    next();
  },
  userLoginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        status: validationSchema.error.details,
      });
    }
    next();
  },
};
