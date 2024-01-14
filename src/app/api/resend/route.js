import { NextResponse } from "next/server";
import { resendOTP } from "email-armor";
import { cookies } from 'next/headers'

export async function POST(request) {

    console.clear();

    const userAgent = request.headers.get('user-agent');

    const { userName, type } = await request.json();

    if (type === 'newUserVerification') {

        const response = await resendOTP(userName, 'newUserVerification', userAgent);

        return NextResponse.json(
            {
                statusCode: response.status,
                message: response.message
            },
            { status: 200 }
        );

    } else if (type === 'oldUserVerification') {

        const id = cookies().get('id').value;

        const response = await resendOTP(userName, 'oldUserVerification', userAgent, id);

        return NextResponse.json(
            {
                statusCode: response.status,
                message: response.message
            },
            { status: 200 }
        );

    } else if (type === 'forgotPassword') {

        const response = await resendOTP(userName, 'forgotPassword', userAgent);

        return NextResponse.json(
            {
                statusCode: response.status,
                message: response.message
            },
            { status: 200 }
        );
    }
}
