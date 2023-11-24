import { NextResponse } from "next/server";
import { signup } from 'email-armor'

export async function POST(request) {

    const data = await request.json();
    console.log(data);

    const signUpUser = await signup(data.fullName, data.userName, data.userEmail, data.password, data.referredBy)
    console.log(signUpUser);

    return NextResponse.json(
        {
            msg: "hi"
        },
        { status: 200 }
    );
}