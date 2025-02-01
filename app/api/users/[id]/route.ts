import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) new NotFoundError("User");
  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User");
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) new NotFoundError("User");
  try {
    await dbConnect();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundError("User");
    }

    return NextResponse.json(
      { success: true, data: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) new NotFoundError("User");

  try {
    await dbConnect();
    const body = await req.json();
    const validatedData = UserSchema.partial().parse(body);
    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new NotFoundError("User");
    }
    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
