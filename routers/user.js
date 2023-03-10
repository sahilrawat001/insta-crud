const express = require("express");
const {  signUp ,signIn} = require("../controller/UserFunctions");
const { signinValidate, signupValidate } = require("../middleware/middlewares");
const router = express.Router(); 

//user signup 
router.route("/signup").post(signupValidate, signUp);

//user signin
router.route("/signin").post(signinValidate, signIn);

module.exports = router;