import { NextResponse, type NextRequest } from "next/server";
import { logoutOnce } from "email-armor";
import { DeleteCookie } from "@/utils/DeleteCookie";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        //! Fetching headers for verification
        const headersList = headers();
        const id = headersList.get('id');
        const username = headersList.get('userName');
        const jwtToken = headersList.get('token');

        await DeleteCookie();

        if (!id || !username || !jwtToken) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        await logoutOnce(id, username, userAgent, jwtToken);

        return NextResponse.json({ message: "Logout" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    await request.json();
    return NextResponse.json({ message: "Just A POST Call In /api/logout." }, { status: 200 });
}