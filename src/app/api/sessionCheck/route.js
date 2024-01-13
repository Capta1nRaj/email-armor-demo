import { NextResponse } from "next/server";
import { sessionCheck } from 'email-armor'

export async function POST(request) {

    const userAgent = request.headers.get('user-agent');

    const { fullName, userName, userEmail, password, referredBy } = await request.json();

    const sessionCheck = await sessionCheck(fullName, userName, userEmail, password, referredBy, userAgent)

    return NextResponse.json(
        {
            statusCode: sessionCheck.status,
            message: sessionCheck.message
        },
        { status: 200 }
    );
}
