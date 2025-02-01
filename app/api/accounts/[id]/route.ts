import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) new NotFoundError("Account");

  try {
    await dbConnect();
    const account = await Account.find();
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) new NotFoundError("Account");
  try {
    await dbConnect();
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      throw new NotFoundError("Account");
    }

    return NextResponse.json(
      { success: true, data: deletedAccount },
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
  if (!id) new NotFoundError("Account");
  try {
    await dbConnect();
    const body = await req.json();
    const validatedData = AccountSchema.partial().safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validatedData.data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedAccount) {
      throw new NotFoundError("Account");
    }
    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
