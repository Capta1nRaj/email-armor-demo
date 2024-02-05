import { NextResponse } from "next/server";
import { signup } from 'email-armor'
import { cookies } from 'next/headers'

console.clear();

export async function POST(request) {

    const { userFullName, userName, userEmail, userPassword, userReferredBy, userAgent, userIP } = await request.json();

    const signUpUser = await signup(userFullName, userName, userEmail, userPassword, userReferredBy, userAgent, userIP);

    // cookies().set('id', signInUser.id);
    // cookies().set('userName', signInUser.userName);

    return NextResponse.json(
        {
            statusCode: signUpUser.status,
            message: signUpUser.message
        },
        { status: 200 }
    );
}