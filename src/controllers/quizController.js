const Quiz = require('../models/quiz');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { question, options, rightAnswer, startDate, endDate } = req.body;
        console.log(question,options,rightAnswer,startDate,endDate)

        // Basic validation
        if (!question || !options || !Array.isArray(options) || options.length < 2 || rightAnswer === undefined || !startDate || !endDate) {
            return res.status(400).json({ message: 'Invalid input. Ensure all required fields are provided and correct.' });
        }

        const newQuiz = new Quiz({ question, options, rightAnswer, startDate, endDate });
        await newQuiz.save();

        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: 'Error creating quiz', error: err });
    }
};


// Get currently active quiz
exports.getActiveQuiz = async (req, res) => {
    try {
        const now = new Date();
        const activeQuiz = await Quiz.findOne({ startDate: { $lte: now }, endDate: { $gte: now } });
        if (activeQuiz) {
            res.status(200).json(activeQuiz);
        } else {
            res.status(404).json({ message: 'No active quiz found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching active quiz', error: err });
    }
};

// Get quiz result after 5 minutes of end time
exports.getQuizResult = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        const now = new Date();
        if (now < new Date(quiz.endDate).getTime() + 5 * 60 * 1000) {
            return res.status(400).json({ message: 'Quiz result not available yet' });
        }
        res.status(200).json({ rightAnswer: quiz.rightAnswer });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quiz result', error: err });
    }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quizzes', error: err });
    }
};
