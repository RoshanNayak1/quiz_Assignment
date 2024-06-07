const cron = require('cron');
const Quiz = require('../models/quiz');

const updateQuizStatus = async () => {
    const now = new Date();
    await Quiz.updateMany({ startDate: { $lte: now }, endDate: { $gte: now }, status: 'inactive' }, { status: 'active' });
    await Quiz.updateMany({ endDate: { $lte: now }, status: { $ne: 'finished' } }, { status: 'finished' });
};

const job = new cron.CronJob('*/1 * * * *', updateQuizStatus, null, true, 'UTC');

module.exports = job;
