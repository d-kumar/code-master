/**
 * Created by kumar on 29/01/16.
 */
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated){
        next();
    }else{
        res.redirect("/signIn");
    }
}

moudle.exports = ensureAuthenticated;