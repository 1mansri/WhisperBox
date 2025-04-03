// import { resend } from "@/lib/resend";
import VerificationEmail
from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/Apiresponse";
import nodemailer from 'nodemailer';
// import { render } from '@react-email/components';

export async function sendVerificationEmail(
    email:string,
    username: string,
    verifyCode: string,
    verificationLink?: string
): Promise<ApiResponse> {
    try {
        // await resend.emails.send({
        //     from: 'amansri2023@gmail.com',
        //     to: email,
        //     subject: 'Verify Code',
        //     react: VerificationEmail({username, otp: verifyCode}),
        //   });
        verificationLink = `${process.env.DOMAIN}/verify/${username}` || `https://whisper-box-git-main-1mansris-projects.vercel.app/verify/${username}`;

        const emailHtml = (VerificationEmail({username, verificationLink, otp: verifyCode}));
        
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Email Verification",
            html: emailHtml,
        }
        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: "Verification email sent successfully",
        };
        
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
        
    }
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER2 as string,
    pass: process.env.EMAIL_PASS2 as string
  }
});

export const sender = {
  name: "WhisperBox",
  email: process.env.EMAIL_USER as string
};








