import { NextResponse, type NextRequest } from "next/server";
import { signIn } from 'email-armor'
import { cookies } from 'next/headers'

const expireIn365Days = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

if (!process.env.COOKIE_DOMAIN) { throw new Error("COOKIE_DOMAIN env is not defined!"); }

export async function POST(request: NextRequest) {
    try {
        // Retrieve user-agent from request headers.
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // Extract userNameOrEmail and password from the request body.
        const { userNameOrEmail, userPassword } = await request.json();

        // Initialize response object.
        let response = { id: "", userName: "", signedJWTToken: "", message: "", status: 0 };

        // Handle sign-in based on whether userNameOrEmail contains an email.
        if (userNameOrEmail.includes('@')) {
            const signInResponse = await signIn(userNameOrEmail, '', userPassword, userAgent);
            response = { id: signInResponse.id || "", userName: signInResponse.userName || "", signedJWTToken: signInResponse.signedJWTToken || "", message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await signIn('', userNameOrEmail, userPassword, userAgent);
            response = { id: signInResponse.id || "", userName: signInResponse.userName || "", signedJWTToken: signInResponse.signedJWTToken || "", message: signInResponse.message || "", status: signInResponse.status };
        }

        // Destructure response data for easy access.
        const { id, userName, signedJWTToken, status, message } = response;

        // If sign-in is unsuccessful, return the response with the message and status.
        if (status !== 202) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Set cookies (id, userName, and token) with a 365-day expiration.
        cookies().set("id", id, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("userName", userName, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });
        cookies().set("token", signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        // Return success response with message and status.
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        // Handle server errors.
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}