const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: { type: String },
    options: { type: [String], required: true },
    rightAnswer: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date},
    status: { type: String, default: 'inactive' } // Possible values: inactive, active, finished
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
