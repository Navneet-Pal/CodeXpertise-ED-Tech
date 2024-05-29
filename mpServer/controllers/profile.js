const Profile = require("../models/Profile");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const schedule = require("node-schedule");
const { convertSecondsToDuration } = require("../utils/secToDuration");

const Course = require("../models/course");
const courseprog = require("../models/courseprog");

exports.updateProfile = async (req, res) => {
	try {
		const { gender ,dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		
		const profile = await Profile.findById(userDetails.additionalDetails);
	
		// Update the profile fields
		profile.gender = gender;
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		const updatedUserDetails = await User.findById(id)
		.populate("additionalDetails")
		.exec()

		return res.json({
			success: true,
			message: "Profile updated successfully",
			updatedUserDetails,
		});

	} 
    catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		const date = new Date(Date.now() + 5*60);
		schedule.scheduleJob('* * * * *', async ()=>{
			await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
		})
		
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		// console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER,
        1000,
        1000
      )
    //   console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
	
    try {
		
      const userId = req.user.id
	
      let userDetails = await User.findOne({
        _id: userId,
      })
		.populate({
			path: "courses",
			populate: {
			path: "courseContent",
			populate: {
				path: "subSection",
			},
			},
		})
        .exec()

		// console.log(userDetails);
		
		userDetails = userDetails.toObject()
		var SubsectionLength = 0
		for (var i = 0; i < userDetails.courses.length; i++) {
			
		  let totalDurationInSeconds = 0
		  SubsectionLength = 0
		  for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
			
			totalDurationInSeconds += userDetails.courses[i].courseContent[
			  j
			].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
			userDetails.courses[i].totalDuration = convertSecondsToDuration(
			  totalDurationInSeconds
			)
			SubsectionLength +=
			  userDetails.courses[i].courseContent[j].subSection.length
		  }
		  
		  let courseProgressCount = await courseprog.findOne({
			courseID: userDetails.courses[i]._id,
			userId: userId,
		  })
		  
		
		  courseProgressCount = courseProgressCount?.completedVideos.length
		  if (SubsectionLength === 0) {
			userDetails.courses[i].progressPercentage = 100
		  } else {
			// To make it up to 2 decimal point
			const multiplier = Math.pow(10, 2)
			userDetails.courses[i].progressPercentage =
			  Math.round(
				(courseProgressCount / SubsectionLength) * 100 * multiplier
			  ) / multiplier
		  }
		}
		
	
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
		
      })
    }
};

exports.instructorDashboard = async (req, res) => {
	try {
	  const courseDetails = await Course.find({ instructor: req.user.id })
  
	  const courseData = courseDetails.map((course) => {
		const totalStudentsEnrolled = course.studentEnrolled.length
		const totalAmountGenerated = totalStudentsEnrolled * course.price
  
		// Create a new object with the additional fields
		const courseDataWithStats = {
		  _id: course._id,
		  courseName: course.courseName,
		  courseDescription: course.courseDescription,
		  // Include other course properties as needed
		  totalStudentsEnrolled,
		  totalAmountGenerated,
		}
  
		return courseDataWithStats
	  })
  
	  res.status(200).json({ courses: courseData })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({ message: "Server Error" })
	}
  }
