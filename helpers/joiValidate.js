// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');

const urlRegex = /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/;

const validateUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const validatePutLikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const validateDeleteLikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().regex(urlRegex).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,}$/),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,}$/),
  }),
});

module.exports = {
  validateUserById,
  validateUserInfo,
  validateUpdateAvatar,
  validateCreateCard,
  validateDeleteCard,
  validatePutLikeCard,
  validateDeleteLikeCard,
  validateCreateUser,
  validateLogin,
};
