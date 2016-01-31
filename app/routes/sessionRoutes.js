/**
 * Created by kumar on 25/01/16.
 */
function newSession(req,res){
    res.render('new');
}

var User = App.model('user');

function create(req,res){
    User.findByEmailAndPassword(req.body.email,req.body.password, function (err,user) {
        if(err){
            res.status(422).send('Problem: '+err.message);
        }else if(!user){
            res.status(401).send('That email and password did not match our records');
        }else{
            res.status(200).send('Welcome Back, '+user.email);
        }
    })
}

function destroy(req,res){
    req.logout();
    res.redirect('/');
}

exports.newSession = newSession;
exports.create = create;
exports.destroy = destroy;