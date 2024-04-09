const User= require("../models/user");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

exports.resetPasswordToken = async (req,res)=>{
    try {
        const {email} = req.body;
        const userDetail = await User.findOne({email});
        if(!userDetail){
            return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
        }
        const token = crypto.randomUUID();
        
        const url = `http://localhost:3000/update-password/${token}`;
        const response = await User.findByIdAndUpdate(userDetail._id ,
                                                                    {token:token ,
                                                                     resetPasstokenExpire:Date.now()*5*60 }
                                                                    ,{new:true}
        );
       await mailSender(email , "Reset Password" , 
                 `Your Link for email verification is ${url}. Please click this url to reset your password.`
	    );
        res.json({
			success: true,
			message:"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
    
    } 
    catch (error) {
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
    }
}

exports.resetPassword = async (req,res)=>{
    try {
        const {password , confirmPassword,token} = req.body;
        // console.log(password , confirmPassword)
        if(password !== confirmPassword){
            return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
        }
        const user = await User.findOne({token:token});
        if(!user){
            return res.json({
				success: false,
				message: "Token is Invalid",
			});
        }
        if(user.resetPassTokenExpire < Date.now() ){
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
        }
   
        const hashPassword = await bcrypt.hash(password , 10);
 
        const response = await User.findOneAndUpdate({token} , {password:hashPassword} , {new:true});
       
        res.status(200).json({
            success:true,
            message:"password succesfully reset"
        }) 
        
    } 
    catch (error) {
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
}