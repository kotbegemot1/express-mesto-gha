const User = require("../models/users");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "На сервере произошла ошибка" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user)
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные!" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" })
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user)
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные!" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" })
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные!" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" })
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные!" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" })
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
