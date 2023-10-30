const express= require("express");
const { isStudent, auth } = require("../middleware/authRoles");
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses } = require("../controllers/profile");
const router = express.Router();

router.put("/updateProfile" ,auth, updateProfile);
router.delete("/deleteAccount" ,auth,deleteAccount);
router.get("/getUserDetails" ,auth, getAllUserDetails);
router.put("/updateProfilePicture" ,auth, updateDisplayPicture);
router.get("/getEnrolledCourses" ,auth, getEnrolledCourses);

module.exports = router;
