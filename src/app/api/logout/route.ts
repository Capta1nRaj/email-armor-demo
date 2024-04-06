import { NextResponse, type NextRequest } from "next/server";
import { cookies } from 'next/headers'
import { fetchUserIP } from "@/app/utils/fetchUserIP";
import { localSessionCheck } from "email-armor";

console.clear();

export async function GET(request: NextRequest) {

    const userAgent = request.headers.get('user-agent');
    if (!userAgent) { return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 200 }); }
    const userIP = await fetchUserIP();

    cookies().delete('id')
    cookies().delete('userName')
    cookies().delete('token')

    return NextResponse.json(
        {
            message: "Logout"
        },
        { status: 200 }
    );
}