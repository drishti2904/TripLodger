const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// Show signup form
router.get("/signup",userController.renderSignupForm);

// Handle signup logic
router.post("/signup", wrapAsync(userController.signup));

// Show login form
router.get("/login", saveRedirectUrl,userController.renderLoginform );

// Handle login logic
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), userController.login
);

// Logout route
router.get("/logout", userController.logout);

module.exports = router;
