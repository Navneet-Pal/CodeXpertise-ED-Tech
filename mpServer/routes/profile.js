const express= require("express");
const { isStudent,authe, isInstructor } = require("../middleware/authRoles");
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require("../controllers/profile");
const router = express.Router();

router.put("/updateProfile" ,authe, updateProfile);
router.delete("/deleteAccount" ,authe,deleteAccount);
router.get("/getUserDetails" ,authe, getAllUserDetails);
router.put("/updateProfilePicture" ,authe, updateDisplayPicture);
router.get("/getEnrolledCourses" ,authe, getEnrolledCourses);
router.get("/instructorDashboard", authe, isInstructor, instructorDashboard)

module.exports = router;
