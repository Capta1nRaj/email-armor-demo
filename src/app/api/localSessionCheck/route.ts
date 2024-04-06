import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { fetchUserIP } from "@/app/utils/fetchUserIP";
import { localSessionCheck } from "email-armor";

console.clear();

export async function GET(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    const cookieStore = cookies()
    const username = cookieStore.get('userName')
    const jwtToken = cookieStore.get('token')
    if (!username || !jwtToken) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }

    const response = await localSessionCheck(username.value, jwtToken.value, userAgent);

    const { status, message, userName } = response;

    return NextResponse.json(
        {
            status, message, userName
        },
        { status: 200 }
    );
}