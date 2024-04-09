const Section = require("../models/Section"); 
const Course = require("../models/course");
const subSection = require("../models/subSection");

exports.createSection = async(req,res) =>{
    try {
        const {sectionName , courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
        }
        
        const addSection = await Section.create({sectionName});
        const updatedCourse = await Course.findByIdAndUpdate(courseId , { $push:{courseContent:addSection._id } } , {new:true} ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        
        res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});

    } 
    catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}


exports.updateSection = async(req,res) =>{
    try {
        const {sectionName, sectionId,courseId} = req.body;
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});
        
        const course= await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();
        // console.log(course)
        res.status(200).json({
			success: true,
			message: section,
            data:course,
		});
    } 
    catch (error) {
        console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}


exports.deleteSection = async(req,res) =>{
    try {
        const{sectionId,courseId} = req.body;
        
        await Course.findOneAndUpdate({courseContent:sectionId} , { $pull:{courseContent:sectionId}},{new:true})
        
        const section= await Section.findById(sectionId)
        if (!section) {
            return res.status(404).json({
              success: false,
              message: "Section not found",
            })
        }
        
        await subSection.deleteMany({_id:{$in: section.subSection}})
        await Section.findByIdAndDelete(sectionId);
        
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()

        res.status(200).json({
			success: true,
			message: "Section deleted",
            data:course,
		});
    } 
    catch (error) {
        console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}