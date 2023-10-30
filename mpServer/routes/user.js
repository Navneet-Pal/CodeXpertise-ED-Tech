const express = require("express");
const router = express.Router();

const {signUp , login, sendOtp, changePassword} = require("../controllers/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
const {auth} = require("../middleware/authRoles");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/signup" , signUp);
router.post("/login" , login);
router.post("/sendotp" , sendOtp);
router.post("/changePassword" ,auth,changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token" , resetPasswordToken);
router.post("/reset-password" , resetPassword);

module.exports = router;