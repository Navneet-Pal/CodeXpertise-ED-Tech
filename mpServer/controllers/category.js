const Category = require("../models/Category");

exports.createCategory = async(req,res)=>{
   try {
        const {name,description} = req.body;
        if(!name || !description ){
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const response = await Category.create({name:name,description:description});
        return res.status(200).json({
            success: true,
            message: "Categorys Created Successfully",
        });
   } 
   catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
   }
}

exports.showAllCategories = async (req,res)=>{
   try {
        const response = await Category.find({} ,{ name: true, description: true });     
        res.status(200).json({
			success: true,
			data: response,
		});
    } 
    catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
   }

}

exports.categoryPageDetails = async (req,res)=>{
    try {
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        const otherCategoryDetails = await Category.find({_id: {$ne :categoryId} } ).populate("courses").exec();
        if(!otherCategoryDetails){
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        // const topSellingCourses = await Category.findById()

        res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                otherCategoryDetails,
            },
        });

    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}