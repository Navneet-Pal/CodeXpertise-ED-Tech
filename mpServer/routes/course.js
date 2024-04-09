const express = require("express");
const router = express.Router();

const { createCourse, getAllCourses, getCourseDetail,editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/course");
const {createSection, updateSection, deleteSection} = require("../controllers/section");
const { createsubSection, updatesubSection, deletesubSection } = require("../controllers/subSection");
const { isInstructor, isStudent, isAdmin, authe } = require("../middleware/authRoles");
const { createRating, getAllRating, getAverageRating } = require("../controllers/reviewAndRating");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/category");
const { updateCourseProgress } = require("../controllers/courseProgress");



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/create-course" ,authe,isInstructor,createCourse);
router.get("/get-all-courses" , getAllCourses);
router.post("/getCourseDetails" , getCourseDetail);
router.post("/editCourse", authe, isInstructor, editCourse)
router.get("/getInstructorCourses", authe, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
router.post("/getFullCourseDetails", authe, getFullCourseDetails)
router.post("/updateCourseProgress", authe, isStudent, updateCourseProgress)

router.post("/create-section" , authe,isInstructor, createSection);
router.post("/update-section" ,authe ,isInstructor, updateSection);
router.post("/delete-section" , authe ,isInstructor, deleteSection);

router.post("/create-subsection" , authe,isInstructor, createsubSection);
router.post("/update-subsection" ,authe ,isInstructor, updatesubSection);
router.post("/delete-subsection" , authe ,isInstructor, deletesubSection);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating" , authe , isStudent , createRating);
router.get("/getReviews" , getAllRating);
router.get("/getAverageRating" , getAverageRating);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/create-category" , authe , isAdmin , createCategory);
router.get("/show-all-category" , showAllCategories);
router.post("/category-page-details" , categoryPageDetails);


module.exports = router;
