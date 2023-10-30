const Category = require("../models/Category");
const Course = require("../models/course");
const User = require("../models/user");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createCourse = async (req,res) =>{
    try {
        let {courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions,} = req.body;
        const thumbnail = req.files.thumbnail;
        const userID = req.user.id;
        
        if (!courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category ||
            !instructions
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        if(!status || status === undefined){
            status = "draft";
        }

        const instructorDetail = await User.findById(userID);
  

        if(instructorDetail.accountType !== "instructor"){
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }
        const categoryDetails =  await Category.findById(category);
     
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER);
 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instruction: instructions,
        });
  
        await Category.findByIdAndUpdate({_id:category} , { $push : {courses:newCourse._id} } , {new:true} )
   
        await User.findByIdAndUpdate( userID , { $push : {courses:newCourse._id} } , {new:true} )

        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });

    } 
    catch (error) {
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    }

}

exports.getAllCourses = async(req,res)=>{
    try {
        const allCourses= await Course.find({});
        return res.status(200).json({
			success: true,
			data: allCourses,
		});
        
    } 
    catch (error) {
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }
}

exports.getCourseDetail = async(req,res)=>{
    try {
        const {courseId}= req.body;
        const details = await Course.findById({_id:courseId}).populate({
            path:"instructor", populate:{path:"additionalDetails"}
        }).populate("category").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        if(!details) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:details,
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}