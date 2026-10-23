import nodemailer from 'nodemailer';
import 'dotenv/config';

// 1. Create the transporter ONCE outside the handler to reuse connections
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS // Must be a 16-character Gmail App Password 
    }
});

export const sendOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"Your App Name" <${process.env.MAIL_USER}>`, // Friendly sender name
            to: email,
            subject: 'Your Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested an OTP to reset your password. Use the verification code below:</p>
                    <h1 style="color: #4A90E2; letter-spacing: 2px;">${otp}</h1>
                    <p style="color: #666; font-size: 12px;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
                </div>
            `
        };

        // 2. Await the delivery
        const info = await transporter.sendMail(mailOptions);
        return info;
        
    } catch (error) {
        // Log the error locally but throw it so the parent controller catches it
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email. Please try again later.");
    }
};
