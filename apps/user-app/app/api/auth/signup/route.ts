import { NextResponse } from 'next/server';
import { SignupSchema } from '@repo/validation/schemas';
import db from '@repo/db/client';
import bcrypt from 'bcrypt';
import { SignupType } from '@repo/validation/types';

export async function POST(request: Request) {
  try {
    const body:SignupType = await request.json();
    
    // Validate input
    const result = SignupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const {name, mobileNumber, password } = result.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { mobileNumber }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        mobileNumber,
        password: hashedPassword
      }
    });

    const balance = await db.balance.create({
      data: {
        userId: user.id,
        amount: 0,
      }
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      mobileNumber: user.mobileNumber,
      balance: balance.amount
    };
    
    
    return NextResponse.json(userResponse, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
