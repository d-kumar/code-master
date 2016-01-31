/**
 * Created by kumar on 28/01/16.
 */

var Activation = App.model('activation');
var User = App.model('user');
function create(req,res,next){
    var d = new Date;
    d.setHours(d.getHours()+6);
    var v = new Activation({email:req.body.email,activeTill: d.getTime() });
    v.save(function(err){
        if(err){
            res.status(422).send("Problem: "+err.message);
        }else{
            res.redirect("/portal");
        }
    });
}

function activate(req,res,next){
    var d = new Date();
    Activation.findByUrl(req.query.url.trim(), function (err,activation) {
     if(err){
         res.status(422).send("Problem: "+err.message)
     } else if(!activation || (d.getTime()<=new Date(activation.activeTill).getTime())){
         res.status(422).send("That url is not valid, try resending the activation link");
     }else{
         User.findByEmail(activation.email,function(err,user){
         if(err){
             res.status(422).send("Problem: "+err.message)
         }else if(!user){
             res.status(422).send("Sorry we could not validate that email");
         }else {
             if(user.isActivated){
                 res.status(302).send("Looks like your account is already activated");
             }else {
                 user.isActivated=true;
                 user.save();
                 res.status(200).send("Your account is successfully activated");
             }
         }
         });

     }
  });
}
exports.create = create;
exports.activate = activate;