import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const {username, email, password} = await request.json()
    
    const existingUserVerifiedByUsername = await UserModel.findOne({ 
        username,
        isVerified: true 
    })
    
    if (existingUserVerifiedByUsername) {
        return Response.json(
            { 
                success: false, 
                message: "Username is already taken" 
            },
            { 
                status: 400 
            }
        )    
    }
    
    const existingUserVerifiedByEmail = await UserModel.findOne({
        email
    })
    
    const VerifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    if (existingUserVerifiedByEmail) {
        if (existingUserVerifiedByEmail.isVerified) {
            return Response.json(
                { 
                    success: false, 
                    message: "User already exist with this email" 
                },
                { 
                    status: 400 
                }
            )
        } else{
            const hashedPassword = await bcrypt.hash(password, 12)
            existingUserVerifiedByEmail.password = hashedPassword
            existingUserVerifiedByEmail.verifyCode = VerifyCode
            existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserVerifiedByEmail.save()
            
        }   
    }else {
        const hashedPassword = await bcrypt.hash(password, 12)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)
        
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode: VerifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
        })
        await newUser.save()
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(email, username, VerifyCode)

    if (!emailResponse.success) {
        return Response.json(
            { 
                success: false, 
                message: emailResponse.message 
            },
            { 
                status: 500 
            }
        )
    }
    
    return Response.json(
        { 
            success: true, 
            message: "User Registered successfully, please Verify your account" 
        },
        { 
            status: 201 
        }
    )
    
  } catch (error) {
    console.error("Error creating user", error)
    return Response.json(
        { 
            success: false, 
            message: "Failed to create user" 
            
        },
        { 
            status: 500 
        }
    );
    
  }

}