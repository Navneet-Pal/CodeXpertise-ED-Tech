const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReview:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type: Number,
    },
    thumbnail:{
        type: String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    status:{
        type:String,
        enum:["draft","published"]
    },
    instruction:{
        type:[String],
    },
    tag:{
        type:[String],
        required:true
    },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Course" , courseSchema);