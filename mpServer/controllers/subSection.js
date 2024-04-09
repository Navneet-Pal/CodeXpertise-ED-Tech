const Section = require("../models/Section");
const SubSection = require("../models/subSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createsubSection = async (req,res) =>{
    try {
        const {sectionId, title,description } = req.body;
        // console.log(sectionId, title,description)
        const video = req.files.video;
        if(!sectionId || !title || !description || !video){
            return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
        }
        const cloudUpload = await uploadImageToCloudinary(video,process.env.FOLDER);
        const newsubSection = await SubSection.create({title,timeDuration: `${cloudUpload.duration}`,description,
        videoUrl: cloudUpload.secure_url,});

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },{$push:{subSection:newsubSection._id}} , {new:true}).populate("subSection");
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
      
        const {sectionId,subSectionId,title,description} = req.body;
        
        // console.log(subSectionId)
        // console.log(sectionId)
        const subSection = await SubSection.findById(subSectionId);
        // console.log(subSection)
        
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
         
          if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
      
          await subSection.save()
          
          const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            message: "Section updated successfully",
            data:updatedSection
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
        // await SubSection.findByIdAndDelete({_id:subSectionId});
        await Section.findByIdAndUpdate({_id:sectionId} , {
            $pull:{subSection:subSectionId} } ,{new:true}
        );

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate(
          "subSection"
        )

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data:updatedSection
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