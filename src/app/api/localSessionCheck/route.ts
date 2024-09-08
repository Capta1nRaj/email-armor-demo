import { NextResponse, type NextRequest } from "next/server";
import { localSessionCheck } from "email-armor";
import { DeleteCookie } from "@/utils/DeleteCookie";
import { headers } from 'next/headers'
import userAccountsModel from "@/models/userAccountsModel";
import { connect2MongoDB } from "connect2mongodb";

export async function GET(request: NextRequest) {
    try {

        //! Fetch user-agent
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        //! Fetching headers for verification
        const headersList = headers();
        const username = headersList.get('userName');
        const jwtToken = headersList.get('token');

        //! If any value is not defined, delete cookies, & session logout
        if (!username || !jwtToken) { await DeleteCookie(); return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        //! Verify the session 
        const response = await localSessionCheck(username, jwtToken, userAgent);

        //! Destructure the response
        const { status, message, userName } = response;

        //! If any error occurs, delete cookies, & session logout
        if (status === 400) { await DeleteCookie(); return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        //! Connecting to MongoDB
        await connect2MongoDB();

        // Find userRole that if he is premium member or not
        const userRole = await userAccountsModel.findOne({ userName: username }).select('userRole');

        //! Return the response to the client
        return NextResponse.json({ userRole: userRole.userRole, status, message, userName }, { status: 200 });

    } catch (error) {
        console.error(error);
        await DeleteCookie(); return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    await request.json();
    return NextResponse.json({ message: "Just A POST Call In /api/EmailArmorAPIs/localSessionCheck." }, { status: 200 });
}