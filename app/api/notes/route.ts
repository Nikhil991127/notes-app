import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  await connectDB();

  const data = await request.json();
  const note = await Note.create(data);

  return NextResponse.json(note, { status: 201 });
}
