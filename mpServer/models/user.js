const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    accountType:{
        type:String,
        required:true,
        enum:["admin", "student" , "instructor"]
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courseProgress:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"courseprog"
    }],
    token:{
        type:String,
    },
    resetPassTokenExpire:{
        type:Date
    },
    image:{
        type:String,
        require:true,
    }
} , 
 // yeh time dega create and update ka , access- how? ans-> doc.createdAt and doc.updatedAt karke access hoga
{
    timestamps: true
}
)

module.exports = mongoose.model("User" , userSchema);