const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

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
        const response = await Category.find();     
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

        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "published" },
            populate: "ratingAndReview",
            populate:"instructor",
          })
          .exec()
        
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }
        
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
            })
        }
        
        const otherCategoryDetails = await Category.find({_id: {$ne :categoryId} } )
        
        let differentCategory = await Category.findOne(
            otherCategoryDetails[getRandomInt(otherCategoryDetails.length)]
              ._id
          )
            .populate({
              path: "courses",
              match: { status: "Published" },
            })
            .exec()
            
        // const topSellingCourses = await Category.findById()
        const allCategories = await Category.find()
            .populate({
            path: "courses",
            match: { status: "Published" },
            })
            .exec()
            
        const allCourses = allCategories.flatMap((category) => category.courses)
        
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)


        res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
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