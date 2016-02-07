/**
 * Created by kumar on 04/02/16.
 */
var quizRoutes = App.route('quizRoutes'),
    express = require('express');

function quizesRoutes(app){
    var quizRouter = express.Router();
    quizRouter.route('/').get(quizRoutes.home);
    quizRouter.route('/createQuiz').get(quizRoutes.createQuiz).post(quizRoutes.saveQuiz);
    quizRouter.route('/:quizName/questions').get(quizRoutes.listQuestions);
    quizRouter.route('/:quizName/questions/addQuestion').post(quizRoutes.addQuestiontoQuiz).get(quizRoutes.renderQuestionAdditionForm);
    app.use('/quiz',quizRouter);
}

module.exports = quizesRoutes;
