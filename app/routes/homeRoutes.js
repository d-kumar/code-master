/**
 * Created by kumar on 23/01/16.
 */
function about(req,res){
    console.log("Inside about")
    res.render('about')
}
function home(req,res){
    res.render('index')
}
exports.home = home;
exports.about = about