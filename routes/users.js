const router = require('express').Router();
const {
  validateUserById,
  validateUserInfo,
  validateUpdateAvatar,
} = require('../helpers/joiValidate');

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:id', validateUserById, getUserById);
router.patch('/users/me', validateUserInfo, updateUserInfo);
router.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = router;
