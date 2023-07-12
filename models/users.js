const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const unauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [(url) => validator.isURL(url), 'Введите корректный адресс ссылки'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [(email) => validator.isEmail(email), 'Введите корректный email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  // eslint-disable-next-line no-unused-vars
  transform(doc, ret, options) {
    // eslint-disable-next-line no-param-reassign
    delete ret.password;
    return ret;
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // eslint-disable-next-line no-undef
  return this.findOne({ email }).select('+password')
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        // eslint-disable-next-line new-cap
        return Promise.reject(new unauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // eslint-disable-next-line new-cap
            return Promise.reject(new unauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
