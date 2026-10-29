import { verifyMail } from '../emailVerify/verifyEmail.js';
import { sendOtpEmail } from '../emailVerify/sendOtpEmail.js';

import User from '../models/userModel.js';
import Session from '../models/sessionModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// googleLogin

export const googleLogin = async (req, res) =>{
    const {idToken} = req.body; //incoming token sent from your frontend login
    if(!idToken) {
        return res.status(400).json({message:'Google ID Token is required!!!', success:false})
    }
    try {
        
        //1. verify the token directly with google verification servers
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        const {email , name} = payload; // extract account details
        //2. check if the user already exists in the database
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                username: name,
                email: email,
                isLoggedIn: true,
                isVerified:true, // automatic verification since verified by google
                lastLogin: new Date(),
            })
        } else {
            user.isLoggedIn =true;
            user.lastLogin = new Date()
            await user.save() 
        }
        //3. issue the standard app authentication token
        const accessToken = jwt.sign(
            {id:user._id , email: user.email},
            process.env.SECRET_KEY,
            {expiresIn:'7d'}
        )
        //4. send response back to the client-side interceptors
        return res.status(200).json({
            message:'Google login Successfully!!',
            success:true,
            accessToken,
            user:{
                username: user.username,
                email: user.email,
                isLoggedIn: user.isLoggedIn,
                isVerified:user.isVerified,
                lastLogin: user.lastLogin ,
                createdAt: user.createdAt
                
            }
        })

        
    } catch (error) {
        console.error('Google Auth Token Verification Error' , error)
        return res.status(500).json({message:'Google authentication failed. Stale or invalid token signature.',success:false})
        
    }
}


// register user 
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!', success: false });
        }

        // 2. Check existence
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!', success: false });
        }

        // 3. Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // 4. Create user instance without saving yet to prevent double write
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // 5. Generate Verification Token 
        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '30m' }
        );

        // 6. Assign token and save once
        newUser.token = token;
        await newUser.save();

        // 7. Send verification email
        await verifyMail(token, email);


        const userResponse = newUser.toObject();


        return res.status(200).json({
            message: 'User registered successfully!',
            success: true,
            data: userResponse,
            token: token // Include the token in the response
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false }); // Changed to 500 for server errors
    }
};

// verify user
export const verifyUser = async (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or malformed', success: false });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);

        }
        catch (err) {
            console.log(err)
            return res.status(401).json({ message: 'Invalid or expired token', success: false });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        user.token = null;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ message: 'Email verified successfully', success: true });



    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false });
    }
}

//login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required', success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const isPasswordCheck = await bcrypt.compare(password, user.password);
        if (!isPasswordCheck) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }
        // check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Email not verified', success: false });
        }
        // check for existing session and delete it
        const existingSession = await Session.findOne({ userId: user._id });
        if (existingSession) {
            await existingSession.deleteOne({ userId: user._id });
        }
        // create new session
        await Session.create({ userId: user._id });
        // generate tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '10d' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });
        user.isLoggedIn = true;
        await user.save();
        return res.status(200).json({
            message: `Login successful ${user.username}`,
            success: true,
            accessToken,
            refreshToken,
            user: user
        });

    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

//logout user

export const logoutUser = async (req, res) => {

    try {
        const userId = req.userId;
        await Session.deleteOne({ userId: userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        return res.status(200).json({ message: 'Logout successful', success: true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

//forgot password

export const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required', success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendOtpEmail(user.email, otp);
        return res.status(200).json({ message: 'OTP sent to email', success: true , user:user});

    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

//verify OTP

export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;
        if (!otp) {
            return res.status(400).json({ message: 'OTP is required!!', success: false });
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found!!', success: false });
            }
            if (!user.otp || !user.otpExpiry) {
                return res.status(400).json({ message: 'No OTP found for this user!!', success: false });
            }
            if (user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: 'OTP has expired , try again!!', success: false });
            }
            if (otp !== user.otp) {
                return res.status(400).json({ message: 'Invalid OTP!!', success: false });
            }
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            return res.status(200).json({ message: 'OTP verified successfully', success: true });
        } catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }

    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// reset password

export const changePassword = async (req, res) => {

    try {
        const { newPassword, confirmPassword } = req.body;
        const email = req.params.email;
        if (!confirmPassword || !newPassword) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match', success: false });
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found', success: false });
            }
            const hashPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashPassword;
            await user.save();
            return res.status(200).json({ message: 'Password changed successfully!!!!', success: true });
        } catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }

}

