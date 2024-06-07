const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.post('/', quizController.createQuiz);
router.get('/active', quizController.getActiveQuiz);
router.get('/:id/result', quizController.getQuizResult);
router.get('/all', quizController.getAllQuizzes);

module.exports = router;
