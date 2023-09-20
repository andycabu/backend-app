import { NextResponse } from "next/server";
import "@/utils/mongoose";
import Task from "@/models/Task";

export async function GET(req, { params }) {
  try {
    const taskFound = await Task.findById(params.id);

    if (!taskFound) {
      return NextResponse.json(
        {
          message: "No se encontro la tarea",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(taskFound);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);
    if (!taskDeleted)
      return NextResponse.json(
        { message: "No se encontro la tarea" },
        { status: 404 }
      );

    return NextResponse.json(taskDeleted);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    console.log("data", data);
    const taskUpdate = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(taskUpdate);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}
