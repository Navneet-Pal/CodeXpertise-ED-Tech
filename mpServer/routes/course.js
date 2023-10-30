const express = require("express");
const router = express.Router();

const { createCourse, getAllCourses, getCourseDetail } = require("../controllers/course");
const {createSection, updateSection, deleteSection} = require("../controllers/section");
const { createsubSection, updatesubSection, deletesubSection } = require("../controllers/subSection");
const { isInstructor, isStudent, isAdmin, auth } = require("../middleware/authRoles");
const { createRating, getAllRating, getAverageRating } = require("../controllers/reviewAndRating");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/category");



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/create-course" , auth,isInstructor,createCourse);
router.get("/get-all-courses" , getAllCourses);
router.post("/get-course-details" , getCourseDetail);

router.post("/create-section" , auth,isInstructor, createSection);
router.post("/update-section" ,auth ,isInstructor, updateSection);
router.post("/delete-section" , auth ,isInstructor, deleteSection);

router.post("/create-subsection" , auth,isInstructor, createsubSection);
router.post("/update-subsection" ,auth ,isInstructor, updatesubSection);
router.post("/delete-subsection" , auth ,isInstructor, deletesubSection);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/create-rating" , auth , isStudent , createRating);
router.get("/get-all-rating" , getAllRating);
router.get("/get-average-rating" , getAverageRating);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/create-category" , auth , isAdmin , createCategory);
router.get("/show-all-category" , showAllCategories);
router.post("/category-page-details" , categoryPageDetails);


module.exports = router;
