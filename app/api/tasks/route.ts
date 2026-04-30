import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      status,
    } = body;

    if (!title) {
      return Response.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title,
      description,
      status,
    });

    return Response.json(
      {
        message: "Task created successfully",
        task,
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

    const tasks = await Task.find();

    return Response.json(tasks);
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { id, status } = body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return Response.json(
      {
        message: "Task updated",
        updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}