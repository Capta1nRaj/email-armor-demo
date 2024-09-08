import { NextResponse, type NextRequest } from "next/server";
import { signUp } from 'email-armor'
import { cookies } from 'next/headers'

const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export async function POST(request: NextRequest) {
    try {
        // Get user-agent header to verify the request origin
        const userAgent = request.headers.get('user-agent');
        // Return error if user-agent is missing
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // Extract user details from the request body
        const { userFullName, userName, userEmail, userPassword, userReferredBy } = await request.json();

        // Call signUp function with user details and a default role of 'Free Forever'
        const response = await signUp(userFullName, userName, userEmail, userPassword, userReferredBy || "", userAgent, 'Free Forever');

        // Destructure response for message and status
        const { message, status } = response;

        // If sign-up fails (status not 202), return the response message and status
        if (status !== 202) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Set cookies for user data: userName, id, and JWT token (expires in 365 days)
        cookies().set("userName", userName, { path: "/", domain: process.env.COOKIE_DOMAIN || "localhost", expires: expireIn365Days });
        cookies().set("id", response.id, { path: "/", domain: process.env.COOKIE_DOMAIN || "localhost", expires: expireIn365Days });
        //@ts-expect-error: Ignore TypeScript error for setting signedJWTToken cookie
        cookies().set("token", response.signedJWTToken, { path: "/", domain: process.env.COOKIE_DOMAIN || "localhost", expires: expireIn365Days });

        // Return a successful response with message and status
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        // Return a generic error message in case of failure
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}