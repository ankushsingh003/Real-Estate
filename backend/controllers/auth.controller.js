import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";



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
};

// to get profile
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To verify user
export const verifyEmail = async (req, res) => {
    try{
        const { email, verificationCode } = req.body;
        if(!email || !verificationCode){
            return res.status(400).json({
                message: "Email and verification code are required",
            });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message: "Invalid token",
            });
        }
        if(user.isVerified){
            return res.status(400).json({
                message: "Email already verified",
            });
        }
        if(user.verificationToken !== verificationCode){
            return res.status(401).json({
                message: "Invalid verification code",
            });
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        res.json({
            message: "Email verified successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// forgot ppassword

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with that email address", success: false });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        const clientUrl = "http://localhost:5173"; // frontend url
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        const message = `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Please click on the link below to reset your password:</p>
        <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset - Real Estate Platform",
                message,
            });

            res.status(200).json({ message: "Password reset email sent", success: true });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({ message: "Could not send email", success: false });
        }

    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};
 
// reset password 
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({ message: "Password reset successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

