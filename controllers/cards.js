const Card = require("../models/cards");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные!" });
      } else {
        res.status(500).send({ message: "Произошла ошибка!" })
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const putLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const pullLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
    };

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikeOnCard,
  pullLikeOnCard,
};
