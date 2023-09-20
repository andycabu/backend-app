import "@/utils/mongoose";

import { NextResponse } from "next/server";

import Patient from "@/models/Patient";

export async function GET() {
  const patients = await Patient.find();
  return NextResponse.json(patients);
}
