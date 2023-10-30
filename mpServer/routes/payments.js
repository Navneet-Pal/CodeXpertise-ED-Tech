const express = require("express");
const router = express.Router();

const { isStudent, auth } = require("../middleware/authRoles");
const { capturePayment, verifySignature } = require("../controllers/payment");

router.post("/capturePayment" , auth , isStudent ,capturePayment );
router.post("/capturePayment" ,verifySignature );


module.exports = router;