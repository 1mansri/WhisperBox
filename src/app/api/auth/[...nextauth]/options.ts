import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials", 
            name: "credentials",
            credentials:{
                email: { label: "Email", type: "text ", placeholder: "apun@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "kunji"},
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({ 
                        $or:[
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    })
                    if (!user) {
                        throw new Error("User not found");
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login!");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordValid){
                        return user;
                    } else{
                        throw new Error("Invalid password");
                    }
                    
                } catch (err: unknown) {
                    throw new Error(err instanceof Error ? err.message : 'An error occurred')
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username;
                
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
    }},
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}