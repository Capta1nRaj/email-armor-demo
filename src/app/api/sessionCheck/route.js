import { NextResponse } from "next/server";
import { sessionCheck } from 'email-armor'
import { cookies } from 'next/headers'

export async function GET(request) {

    console.clear();

    const userAgent = request.headers.get('user-agent');

    const userName = cookies().get('userName');
    const jwtToken = cookies().get('jwtToken');

    if (!userName || !jwtToken) {
        return NextResponse.json(
            {
                status: 404,
                message: "Session doesn't exist.",
            },
            { status: 200 }
        );
    }

    const response = await sessionCheck(userName.value, jwtToken.value, userAgent);

    return NextResponse.json(
        {
            statusCode: response.status,
            message: response.message,
            userName: response.userName
        },
        { status: 200 }
    );
}
