const {instance} = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/user");
const mailSender = require("../utils/sendMail");
const {courseEnrollmentEmail} = require("../mailTempletes/courseEnrollTemp");
const { default: mongoose } = require("mongoose");

exports.capturePayment = async(req,res)=>{
    const {courseId} = req.body;
    const userId = req.user.id;

    if(!courseId){
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    }
    const courseDetails = await Course.findById(courseId);
    if(!courseDetails){
        return res.json({
            success:false,
            message:'Could not find the course',
        });
    }
    const uid = new mongoose.Types.ObjectId(userId);
    if(courseDetails.studentEnrolled.includes(uid) ){
        return res.status(200).json({
            success:false,
            message:'Student is already enrolled',
        });
    }

    const amount = courseDetails.price;
    const currency= "INR";
    const options={
        amount:amount*100,
        currency:currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId
        }
    }

    try {
        const paymentResponse = await instance.orders.order(options);

        return res.status(200).json({
            success:true,
            courseName:courseDetails.courseName,
            courseDescription:courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });

    } 
    catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
    }

}

exports.verifySignature = async (req,res)=>{
    const webhook = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        
        const {courseId , userId} = req.body.payload.payment.entity.notes;
        try{

            const updatedCourse =await Course.findByIdAndUpdate(courseId , { $push:{studentEnrolled:userId} } ,{new:true} );

            const updatedUser = await User.findByIdAndUpdate(userId , { $push:{courses:courseId} } ,{new:true} );
            
            sendMail(updatedUser.email , "Congratulations from CodeHelp",
            courseEnrollmentEmail(updatedCourse.name , updatedUser.name ));

            return res.status(200).json({
                success:true,
                message:"Signature Verified and COurse Added",
            });

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }

}