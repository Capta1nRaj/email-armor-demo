import { NextRequest, NextResponse } from "next/server";
import { signIn, signInVerify } from 'email-armor'
import { cookies } from 'next/headers'
import { FetchUserIP } from "@/utils/FetchUserIP";

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

        // Fethcing user IP
        const userIP = await FetchUserIP();

        // Handle sign-in based on whether userNameOrEmail contains an email.
        if (userNameOrEmail.includes('@')) {
            const signInResponse = await signIn(userNameOrEmail, '', userPassword, userAgent, userIP);
            response = { id: signInResponse.id || "", userName: signInResponse.userName || "", signedJWTToken: signInResponse.signedJWTToken || "", message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await signIn('', userNameOrEmail, userPassword, userAgent, userIP);
            response = { id: signInResponse.id || "", userName: signInResponse.userName || "", signedJWTToken: signInResponse.signedJWTToken || "", message: signInResponse.message || "", status: signInResponse.status };
        }

        // Destructure response data for easy access.
        const { id, userName, signedJWTToken, status, message } = response;

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

export async function PUT(request: NextRequest) {
    try {

        // Extract userNameOrEmail and password from the request body.
        const { OTP } = await request.json();

        const cookieStore = cookies()
        const id = cookieStore.get('id')
        if (!id) { return NextResponse.json({ message: "Please refresh the page!", status: 500 }) }

        // Retrieve user-agent from request headers.
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const userIP = await FetchUserIP();

        const signInResponse = await signInVerify(id.value, OTP, userAgent, 'verify', userIP);


        // Destructure response data for easy access.
        const { signedJWTToken, status, message } = signInResponse;

        // If sign-in is unsuccessful, return the response with the message and status.
        if (status !== 202 || !signedJWTToken) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Set cookies token with a 365-day expiration.
        cookies().set("token", signedJWTToken, { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: expireIn365Days });

        // Return success response with message and status.
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        // Handle server errors.
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = await request.json();

        const cookieStore = cookies()
        const id = cookieStore.get('id')
        if (!id) { return NextResponse.json({ message: "Please refresh the page!", status: 500 }) }

        // Retrieve user-agent from request headers.
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const userIP = await FetchUserIP();

        const signInResponse = await signInVerify(id.value, '', userAgent, 'resend', userIP);

        // Destructure response data for easy access.
        const { message, status } = signInResponse;

        // If sign-in is unsuccessful, return the response with the message and status.
        if (status !== 200) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Return success response with message and status.
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        // Handle server errors.
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}