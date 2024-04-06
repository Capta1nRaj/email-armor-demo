import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { fetchUserIP } from "@/app/utils/fetchUserIP";
import { forgotPassword, localSessionCheck, resendOTP } from "email-armor";

console.clear();

export async function POST(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { username } = await request.json();

    const response = await forgotPassword(username, userAgent, '', '', userIP);
    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const { status, message, userName } = response;

    return NextResponse.json({ status, message, userName }, { status: 200 });
}

export async function PUT(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { username, userOTP, userNewPassword } = await request.json();

    const response = await forgotPassword(username, userAgent, userOTP, userNewPassword, userIP);

    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const { status, message } = response;

    return NextResponse.json(
        {
            status, message
        },
        { status: 200 }
    );
}

export async function PATCH(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { username, method } = await request.json();

    const response = await resendOTP(username, method, userAgent, '', userIP);
    if (!response) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const { status, message } = response;

    if ([400, 401].includes(status)) { return NextResponse.json({ status, message }, { status: 200 }); }

    return NextResponse.json({ status, message }, { status: 200 });
}