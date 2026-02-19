module.exports.isLoggedIn=(req,res,next)=>{
     if (!req.isAuthenticated()){
      req.flash("error","Log in please!!");
     return res.redirect("/login");
   }
   next();
}