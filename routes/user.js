const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const{saveRedirectUrl}=require("../middleware.js");

// ================= SIGNUP =================

// signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});


router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    });
});



// signup logic
router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);

        // 🔥 auto login after signup (BEST PRACTICE)
        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to Wanderlust!!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

// ================= LOGIN =================

// login form
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// login logic
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
   async (req, res) => {
        req.flash("success", `Welcome to Wanderlust !!`);
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

module.exports = router;
