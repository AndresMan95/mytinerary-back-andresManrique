import Joi from 'joi';

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    photoURL: Joi.string().uri().optional(),
    country: Joi.string().min(2).required(),
});

export const validateUser = (data) => userSchema.validate(data);
