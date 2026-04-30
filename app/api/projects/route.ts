import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { title, description } = body;

    if (!title) {
      return Response.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title,
      description,
    });

    return Response.json(
      {
        message: "Project created successfully",
        project,
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

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find();

    return Response.json(projects);
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}