import { NextResponse } from "next/server";
import { signUpVerify, signup } from 'email-armor'

export async function POST(request) {

    const userAgent = request.headers.get('user-agent');

    const { fullName, userName, userEmail, password, referredBy } = await request.json();

    const signUpUser = await signup(fullName, userName, userEmail, password, referredBy, userAgent)

    return NextResponse.json(
        {
            statusCode: signUpUser.status,
            message: signUpUser.message
        },
        { status: 200 }
    );
}

export async function PUT(request) {

    const { userName, otp } = await request.json();

    const signUpUser = await signUpVerify(userName, otp);

    return NextResponse.json(
        {
            statusCode: signUpUser.status,
            message: signUpUser.message
        },
        { status: 200 }
    );
}