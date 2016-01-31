/* GET users listing. */
var User = App.model('user');


function allUsers(req, res) {
    res.send('respond with a resource');
}

function create(req,res,next){
    var u = new User({email:req.body.email,passwordHash:req.body.password,isActivated:false});
    u.save(function(err){
               if(err) {
                   res.status(422).send("Problem: " + err.message);
               }else{
                   req.login(u, function (err) {
                       if(err){
                           return next(err);
                       }
                       return next();
                   })
               }
    });

}


exports.allUsers = allUsers;
exports.create = create;