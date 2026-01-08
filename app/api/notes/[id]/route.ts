import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params; // ✅ REQUIRED
  const data = await request.json();

  const note = await Note.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(note);
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params; // ✅ REQUIRED
  await Note.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
