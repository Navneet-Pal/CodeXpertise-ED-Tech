const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.authe = async(req,res,next)=>{
    try {
        
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        
        // yeh payload(verify karke token ka payload mil jata hai) wahi h joh hume token mein dala tha or hum ise req.user mein daalenge for future use
        try {
            const payload = await jwt.verify(token , process.env.JWT_SECRET);
            req.user=payload;
        } 
        catch (error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        
        next();

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }

}

exports.isStudent= async(req,res,next)=>{
   try {
    
        const {accountType} = req.user;
        if(accountType !== "student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        
        next();
   } 
   catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
   }
}

exports.isAdmin= async(req,res,next)=>{
    try {
         const {accountType} = req.user;
         if(accountType !== "admin"){
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for admin only',
             });
         }
         next();
    } 
    catch (error) {
         return res.status(500).json({
             success:false,
             message:'User role cannot be verified, please try again'
         })
    }
}

exports.isInstructor= async(req,res,next)=>{
    try {
         const {accountType} = req.user;
         if(accountType !== "instructor"){
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for instructor only',
             });
         }
         next();
    } 
    catch (error) {
         return res.status(500).json({
             success:false,
             message:'User role cannot be verified, please try again'
         })
    }
 }