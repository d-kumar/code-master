/**
 * Created by kumar on 23/01/16.
 */
function about(req,res){
    res.render('about')
}
function home(req,res){
    res.render('index',{title:"School Management"})
}
exports.home = home;
exports.about = about