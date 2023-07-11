const router = require('express').Router();

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
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:id', validateDeleteCard, deleteCard);
router.put('/cards/:id/likes', validatePutLikeCard, putLikeOnCard);
router.delete('/cards/:id/likes', validateDeleteLikeCard, pullLikeOnCard);

module.exports = router;
