const User = require("../models/user");
const OTP = require("../models/otp");
const Profile = require("../models/Profile");
const bcyrpt= require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mailTempletes/passwordUpdateTemp")

exports.signUp = async (req,res)=>{
    try {

        
        const {firstname , lastname , email,password, confirmPassword, otp, contactNumber, accountType} = req.body;
     
        if(!firstname || !lastname || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                status:false,
                message:"All Fields are required"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                status:false,
                message:"password doesnt match with confirm password"
            })
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                status:false,
                message:"this email is already registered"
            })
        }

        //here limit is used to fetch number of query like we want only one , we sorted or query on the basis of created
        //property which we had initialised in OTP model, -1 represents descending order
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		
		if (recentOtp.length === 0 || otp != recentOtp[0].otp) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} 

        const hashPassword = await bcyrpt.hash(password , 10);

        let approved="";
        approved==="Instructor" ? (approved=false) :(approved=true);

        const profileDetails = await Profile.create({gender:null , dateOfBirth:null,about:null,contactNumber:contactNumber});

        const response = await User.create({
            firstname , 
            lastname , 
            email,
            password:hashPassword,
            accountType,
            additionalDetails:profileDetails._id,
            approved:approved,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        });
        res.status(200).json({
            status:true,
            message:" user account succesfully created ",
            data:response,
        })

    } 
    catch (error) {
        res.status(400).json({
            status:false,
            message:"problem occured while created User's account",
            error:error.message
        })
    }


}

exports.login = async (req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            res.status(400).json({
                status:false,
                message:"all fields are mandatory",
            })
        }
      
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                status:false,
                message:"user is not registed, please sign up",
            })
        }
     
        if(await bcyrpt.compare(password,user.password )){

            const token = jwt.sign({email:user.email,id:user._id,accountType:user.accountType},
                process.env.JWT_SECRET,
                { expiresIn:"24h"}
            );
        
            // user= user.toObject();
          
            user.token = token;
            user.password=undefined;
           
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
            
            res.cookie("token" , token , options).status(200).json({
                status:true,
                token,
                user,
                message:"user logged in successfully"
            });

        }
        else{
            return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
        }
    } 
    catch (error) {
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
            error:error.message
		});
    }
}

exports.sendOtp = async (req,res)=>{
    try {
        
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success: false,
                message: `enter the email`,
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpSave = await OTP.create({email,otp});
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });

    } 
    catch (error) {
        console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
    }
}

exports.changePassword = async (req,res)=>{
    try {
        const {oldPassword, newPassword} = req.body;
        
        if(!oldPassword || !newPassword ){
            return res.status(401).json({
                status:false,
                message:"fill all details"
            })
        }
        
        const userDetails = await User.findById(req.user.id)
        
        
        const passMatch =await bcyrpt.compare(oldPassword,userDetails.password);
        
        if(!passMatch){
            return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" }
            );
        }

       
        const encryptPass = await bcyrpt.hash(newPassword,10);
        const response = await User.findByIdAndUpdate( req.user.id , { password:encryptPass} , {new:true});
        
        try {
            const emailResponse = await mailSender(response.email , passwordUpdated(response.email,
                `Password updated successfully for ${response.firstname} ${response.lastname}`) )
        } 
        catch (error) {
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

        return res.status(200).json({ 
            success: true,
            message: "Password updated successfully"
        });

    } 
    catch (error) {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }

}