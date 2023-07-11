const router = require('express').Router();
const Card = require('../models/cards');

const {
  validateCreateCard,
  validateDeleteCard,
  validatePutLikeCard,
  validateDeleteLikeCard,
} = require('../helpers/joiValidate');

const {
  getCards,
  createCard,
  deleteCard,
  putLikeOnCard,
  pullLikeOnCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:id', (req, res) => {
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      console.log(req.user._id === card.owner.id);
      console.log(req.user._id);
      console.log(card.owner.id);
      res.send(card);
    });
});
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:id', validateDeleteCard, deleteCard);
router.put('/cards/:id/likes', validatePutLikeCard, putLikeOnCard);
router.delete('/cards/:id/likes', validateDeleteLikeCard, pullLikeOnCard);

module.exports = router;
