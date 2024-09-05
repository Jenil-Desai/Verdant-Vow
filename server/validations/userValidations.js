import Joi from "joi";

const userValidation = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
})

export {
    userValidation
}