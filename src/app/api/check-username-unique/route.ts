import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import UserModel from "@/models/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    // //TODO: use this in all other routes
    // nextjs latest version handle this automatically
    // if(request.method !== 'GET') {
    //     return Response.json({
    //         success: false,
    //         message: "Invalid request method, we only handle GET requests"
    //     }, {status: 405}
    // )}
    await dbConnect();
    
    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        // console.log("console data" , result);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : "Invalid username"
                },
                {
                    status: 400
                }
            )
        }
        
        const { username } = result.data
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        
        if (existingVerifiedUser) {
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
    
        return Response.json(
            {
                success: true,
                message: "Username is available",
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.error( "Error checking username ", error);
        return Response.json( 
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
    
}