/**
 * Created by kumar on 04/02/16.
 */
var quiz = App.model('quiz');
var question = App.model('question');
function home(req,res){
    quiz.listAllQuizes(function(err,quizes){
        res.render('quiz',{quizList:quizes});
    });
}

function createQuiz(req,res){
  res.render('createQuiz');
}

function saveQuiz(req,res){
    var u = new quiz({quizName:req.body.quizName});
    u.save(function (err) {
        if(err){
            res.status(422).send("Problem: "+err.message);
        }else{
            res.redirect('/quiz/'+req.body.quizName+'/questions');
        }
    })
}

function listQuestions(req, res){
    console.log(req.params.quizName);
    quiz.findQuizByName(req.params.quizName,function(err,quiz){
        if(err){
            res.status(422).send("Problem: "+err.message);
        }else if(!quiz){
            res.status(422).send("The above Quiz is not found in our database");
        }else{
            res.render('quizQuestions',{quizName:req.params.quizName,questions:quiz.questions});
        }
    });

}
function addQuestiontoQuiz(req,res,next){
    var q = new question({questionBody:req.body.questionBody,
        options:[req.body.option1,req.body.option2,req.body.option3,req.body.option4],
        answer:req.body.answer
    });
    q.save(function(err,question){
        if(err){
            res.status(422).send("Problem :"+err.message);
        }else {
            quiz.findOneAndUpdate({quizName:req.params.quizName},{$push:{questions:question}},{upsert:true},function(err){
                if(err){
                    res.status(422).send("Problem: "+err.message);
                } else
                {
                    res.redirect('/quiz/'+req.params.quizName+'/questions');
                }
            });
        }
    });

}



exports.home = home;
exports.createQuiz = createQuiz;
exports.saveQuiz = saveQuiz;
exports.listQuestions = listQuestions;
exports.addQuestiontoQuiz = addQuestiontoQuiz;