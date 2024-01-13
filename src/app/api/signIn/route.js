import { NextResponse } from "next/server";
import { signInVerify, signin } from 'email-armor'
import { cookies } from 'next/headers'

console.clear();

export async function POST(request) {

    const userAgent = request.headers.get('user-agent');

    const { userName, password } = await request.json();

    const signInUser = await signin(userName, password, userAgent);

    cookies().set('id', signInUser.id);
    cookies().set('userName', signInUser.userName);

    return NextResponse.json(
        {
            statusCode: signInUser.status,
            message: signInUser.message
        },
        { status: 200 }
    );
}

export async function PUT(request) {

    const { userName, otp } = await request.json();

    const userAgent = request.headers.get('user-agent');

    const id = cookies().get('id').value;

    const signInUser = await signInVerify(userName, otp, id, userAgent);

    if (signInUser.status === 202) {
        cookies().set('jwtToken', signInUser.signedJWTToken);
    }

    return NextResponse.json(
        {
            statusCode: signInUser.status,
            message: signInUser.message
        },
        { status: 200 }
    );
}