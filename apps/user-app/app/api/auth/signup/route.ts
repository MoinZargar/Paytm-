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

    const {name, email, password } = result.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
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
        email,
        password: hashedPassword
      }
    });

    const balance = await db.balance.create({
      data: {
        userId: user.id,
        amount: 0,
        locked: 0
      }
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: balance.amount
    };
    
    // Return the safe user data with a 201 (Created) status code
    return NextResponse.json(userResponse, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
