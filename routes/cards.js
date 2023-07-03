const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  putLikeOnCard,
  pullLikeOnCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:cardId/likes", putLikeOnCard);
router.delete("/cards/:cardId/likes", pullLikeOnCard);

module.exports = router;
