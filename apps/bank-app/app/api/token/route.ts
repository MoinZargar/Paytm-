import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = req.body;
    //Todo
    //1. do a zod validation here
    //2. generate a random token
    console.log(body);
    const token = Math.floor(Math.random() * 900000 + 100000).toString();
     //2. store user deatils send in request and token in bank db
    return NextResponse.json({
        token,
        message: "Token generated successfully",
    }, {
        status: 201
    })
}