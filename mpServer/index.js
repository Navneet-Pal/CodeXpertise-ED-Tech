const express = require("express");
const app = express();

const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const paymentRoute = require("./routes/payments");
const courseRoute = require("./routes/course");
const contactUsRoute = require("./routes/contact");

require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const {DBconnect} = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
DBconnect();
// cors ek method hai joh web api ko security provide karata hai
app.use(
	cors({
		origin:"https://codexpertise.vercel.app",
		credentials:true,
	})
)

app.use( fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
cloudinaryConnect();

app.use("/api/v1/auth" , userRoute);
app.use("/api/v1/payment" , paymentRoute);
app.use("/api/v1/course" , courseRoute);
app.use("/api/v1/profile" , profileRoute);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(port , () =>{
    console.log(`server is running at ${port}`);
})
