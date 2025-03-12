// app/api/delete-message/[messageid]/route.ts
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User.model";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: NextRequest) {
  // Extract messageid from URL path instead of using params
  const url = request.url;
  const parts = url.split('/');
  const messageId = parts[parts.length - 1];
  
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user = session?.user as User;
  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Message not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}