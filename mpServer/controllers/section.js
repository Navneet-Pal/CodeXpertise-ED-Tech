const Section = require("../models/Section"); 
const Course = require("../models/course");

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
        const updatedCourse = await Course.findByIdAndUpdate(courseId , { $push:{courseContent:addSection._id } } , {new:true} );
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
        const {sectionName, sectionId} = req.body;
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});
        res.status(200).json({
			success: true,
			message: section,
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
        const{sectionId} = req.body;
        await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findOneAndUpdate({courseContent:sectionId} , { $pull:{courseContent:sectionId}},{new:true})
        res.status(200).json({
			success: true,
			message: "Section deleted",
            data:updatedCourse,
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