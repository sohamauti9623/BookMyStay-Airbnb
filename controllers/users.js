const User = require("../models/user.js");

// render signup
module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

// render login
module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

// login logic
module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust !!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// signup logic
module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// logout
module.exports.renderLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
};