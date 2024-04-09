const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/show-all-category",
}


export const endpoints = {
    SENDOTP_API :BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
   
    COURSE_CATEGORIES_API: BASE_URL + "/course/show-all-category",
    CREATE_COURSE_API: BASE_URL + "/course/create-course",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_SECTION_API: BASE_URL + "/course/create-section",
    UPDATE_SECTION_API: BASE_URL + "/course/update-section",
    DELETE_SECTION_API: BASE_URL + "/course/delete-section",
    DELETE_SUBSECTION_API: BASE_URL + "/course/delete-subsection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/create-subsection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/update-subsection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
  }

  // CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/category-page-details",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}
  
// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}