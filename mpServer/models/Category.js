const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        trim:true
    }],
   
} 
)

module.exports = mongoose.model("Category" , categorySchema);