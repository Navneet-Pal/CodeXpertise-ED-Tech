const Section = require("../models/Section");
const SubSection = require("../models/subSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createsubSection = async (req,res) =>{
    try {
        const {sectionId, title,description,timeDuration } = req.body;
        console.log(sectionId, title,description)
        const video = req.files.video;
        if(!sectionId || !title || !description || !video){
            return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
        }
        const cloudUpload = uploadImageToCloudinary(video,process.env.FOLDER);
        const newsubSection = await SubSection.create({title,timeDuration: timeDuration,description,
        videoUrl: cloudUpload.secure_url,});

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newsubSection._id}} , {new:true});
        res.status(200).json({ success: true, data: updatedSection });
    } 
    catch (error) {
        console.error("Error creating new sub-section:", error)
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

exports.updatesubSection = async (req,res) =>{
    try {
        const {sectionId,title,description,timeDuration} = req.body;
        const video = req.files.video;
        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success: false, message: "All Fields are Required" 
            })
        }
        const subSection = await SubSection.findById(sectionId);
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
              })
        }
        if (title !== undefined) {
            subSection.title = title
          }
      
          if (description !== undefined) {
            subSection.description = description
          }
          if (timeDuration !== undefined) {
            subSection.timeDuration = timeDuration
          }
          if (video !== undefined) {
           
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER
            )
            subSection.videoUrl = uploadDetails.secure_url
          }
      
          await subSection.save()
        // console.log(subSection);
        // const uploadCloud = uploadImageToCloudinary(video,process.env.FOLDER);
        // const response = await SubSection.findByIdAndUpdate(sectionId , { $push:
        //     {title:title ,timeDuration:timeDuration ,description:description ,
        //     videoUrl:uploadCloud.secure_url } } , {new:true}    );

        res.json({
            success: true,
            message: "Section updated successfully",
            
        })

    } 
    catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
        error:error.message
      })
    }
}


exports.deletesubSection = async (req,res) =>{
    try {
        const {subSectionId , sectionId} = req.body;
        await SubSection.findByIdAndDelete({_id:subSectionId});
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId} , {
            $pull:{subSection:subSectionId} } ,{new:true}
        );
        return res.json({
            success: true,
            message: "SubSection deleted successfully",
          })
    } 
    catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}