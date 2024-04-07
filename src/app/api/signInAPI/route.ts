import { NextResponse, type NextRequest } from "next/server";
import { resendOTP, signin, signInVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { fetchUserIP } from "@/app/utils/fetchUserIP";

console.clear();

export async function POST(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { username, userpassword } = await request.json();

    const response = await signin(username, userpassword, userAgent, userIP);

    const { status, message, userName, id } = response;

    if ([400, 401, 403].includes(status)) { return NextResponse.json({ status, message }, { status: 200 }); }

    //@ts-ignore
    cookies().set('userName', userName);
    cookies().set('id', id);

    return NextResponse.json({ status, message }, { status: 200 });
}

export async function PUT(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const { username, OTP } = await request.json();

    const cookieStore = cookies()
    const id = cookieStore.get('id')
    if (!id) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const response = await signInVerify(username, OTP, id.value, userAgent);

    const { status, message, signedJWTToken } = response;

    if ([400, 401].includes(status)) { return NextResponse.json({ status, message }, { status: 200 }); }

    //@ts-ignore
    cookies().set('token', signedJWTToken);

    return NextResponse.json({ status, message }, { status: 200 });
}