const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:postId', authMiddleware.authenticated, controller.create);

module.exports = router;