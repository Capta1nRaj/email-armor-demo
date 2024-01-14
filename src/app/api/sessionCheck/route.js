import { NextResponse } from "next/server";
import { sessionCheck } from 'email-armor'
import { cookies } from 'next/headers'

export async function GET(request) {

    console.clear();

    const userAgent = request.headers.get('user-agent');

    const userName = cookies().get('userName').value;
    const jwtToken = cookies().get('jwtToken').value;

    const response = await sessionCheck(userName, jwtToken, userAgent);

    return NextResponse.json(
        {
            statusCode: response.status,
            message: response.message,
            userName: response.userName
        },
        { status: 200 }
    );
}
