const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const {
  validateCreateUser,
  validateLogin,
} = require('./helpers/joiValidate');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', validateCreateUser, login);
app.post('/signup', validateLogin, createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => res.status(404).send({ message: 'Неправильный путь' }));

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

// eslint-disable-next-line no-undef
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
