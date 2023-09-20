import { NextResponse } from "next/server";
import "@/utils/mongoose";
import Task from "@/models/Task";

export async function GET() {
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newTask = new Task(data);
    const savedTask = await newTask.save();
    console.log("savedTask", savedTask);
    return NextResponse.json(savedTask);
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}
