import { NextResponse } from "next/server";
import { forgotPassword } from "email-armor";

export async function POST(request) {

    console.clear();

    const { userName, otp, newPassword } = await request.json();

    const userAgent = request.headers.get('user-agent');

    if (!otp) {

        const response = await forgotPassword(userName, userAgent);
        return NextResponse.json(
            {
                statusCode: response.status,
                message: response.message,
            },
            { status: 200 }
        );

    } else {

        const response = await forgotPassword(userName, userAgent, otp, newPassword);
        return NextResponse.json(
            {
                statusCode: response.status,
                message: response.message,
            },
            { status: 200 }
        );

    }
}
