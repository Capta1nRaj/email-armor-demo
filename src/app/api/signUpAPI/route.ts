import { NextResponse, type NextRequest } from "next/server";
import { resendOTP, signup, signUpVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { fetchUserIP } from "@/app/utils/fetchUserIP";

console.clear();

export async function POST(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { userFullName, userName, userEmail, userPassword, userReferredBy } = await request.json();

    const response = await signup(userFullName, userName, userEmail, userPassword, userReferredBy, userAgent, userIP);

    const { message, status } = response;

    if ([400, 500, 401, 206].includes(status)) {
        return NextResponse.json(
            { status, message },
            { status: 200 }
        );
    }

    //@ts-ignore
    cookies().set('userName', response.userName);

    return NextResponse.json(
        { status, message },
        { status: 200 }
    );
}

export async function PUT(request: NextRequest) {

    const { userName, OTP } = await request.json();

    const response = await signUpVerify(userName, OTP);
    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const { message, status } = response;

    if ([400, 500].includes(status)) {
        return NextResponse.json(
            { status, message },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { status, message },
        { status: 200 }
    );
}