const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        // yeh joh index: true kiya hai humne , yeh hume index provide karega jisse hum sort karne mein easy hoga
        index:true
    },
   
}
)

module.exports = mongoose.model("RatingAndReview" , ratingAndReviewSchema);