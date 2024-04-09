const express = require("express");
const router = express.Router();

const { isStudent, authe } = require("../middleware/authRoles");
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/payment");

router.post("/capturePayment" , authe , isStudent ,capturePayment );
router.post("/verifyPayment" ,authe, isStudent, verifySignature );
router.post("/sendPaymentSuccessEmail", authe,isStudent, sendPaymentSuccessEmail)

module.exports = router;