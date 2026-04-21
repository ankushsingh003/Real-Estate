import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";



// Register
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: role === "seller" ? false : true,
            verificationToken,
        });

        try{
            await sendEmail({
                email,
                subject:"Verify Your Email",
                message: `<p>Please use this token to verify your email: ${verificationToken}</strong></p><p>Please enter this code on the verification page to verify your email address.</p>`,
                htmlContent:`<h1>Your Verification Token: ${verificationToken}</h1>`
            });
        }catch(error){
            console.log("Failed to send verification email:",error)
        }
        // To be continued (Email sending, etc.)
        res.status(201).json({
            message: "User registered successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                isApproved:user.isApproved,
                isVerified:user.isVerified
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if( !email ||  !password ){
            return res.status(400).json({
                message: "Please provide email and password",
            });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message: "Invalid email or password",
            });
        }

        if(!user.isVerified){
            return res.status(401).json({
                message: "Email not verified",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "There is a mismatch in email and password",
            });
        }

        if( user.isBlocked){
            return res.status(403).json({
                message: "User is Blocked by Admin",
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

        
        res.json({
            message:"Login successful",
            token,
            user,
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


 