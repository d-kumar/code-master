/**
 * Created by kumar on 25/01/16.
 */

function signIn(req,res){
    res.render('signIn')
}

function signUp(req,res){
    res.render('signUp')
}


exports.signIn = signIn;
exports.signUp = signUp;
