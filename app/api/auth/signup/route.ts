import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return Response.json(
      {
        message: "Signup successful",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}