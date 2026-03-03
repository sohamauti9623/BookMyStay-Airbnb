const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// ================= SIGNUP =================
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signUp));

router.get("/logout", userController.renderLogout);

// signup logic


// ================= LOGIN =================

// login form
router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logIn,
  );



module.exports = router;
