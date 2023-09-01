import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db.js";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  try {
    await connectToDatabase();
    const token = await getToken({ req });
    const email = token?.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
