const express = require('express');
const { getUsers, createUser, loginOrSignupUser, getUserInfo } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUserInfo);
// router.post('/', createUser);
router.post('/sign-in', loginOrSignupUser);

module.exports = router;
