import { NextResponse } from "next/server";
import "@/app/backend/utils/mongoose";
import User from "@/app/backend/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password || password.length < 6)
    return NextResponse.json(
      {
        error:
          "Please enter all fields and password must be at least 6 characters long",
      },
      {
        status: 400,
      }
    );
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    });
    return NextResponse.json(savedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
