import { NextResponse, type NextRequest } from "next/server";
import { forgotPassword, updatePassword } from "email-armor";
import { FetchUserIP } from "@/utils/FetchUserIP";

// POST: Handles forgot password requests
export async function POST(request: NextRequest) {
    try {
        // Get the user-agent from the request headers
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // Fetch user's IP address
        const userIP = await FetchUserIP();

        // Parse request body to get username or email
        const { userNameOrEmail } = await request.json();

        let response = { message: "", status: 0 };

        // Handle forgot password based on whether it's an email or username
        if (userNameOrEmail.includes('@')) {
            const signInResponse = await forgotPassword(userNameOrEmail, '', userAgent, userIP);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await forgotPassword('', userNameOrEmail, userAgent, userIP);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        }

        // If no response, return internal server error
        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { status, message } = response;

        // If status is not 201 (success), return the error message
        if (status !== 201) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Return successful response
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

// PUT: Handles password update requests
export async function PUT(request: NextRequest) {
    try {
        // Get the user-agent from the request headers
        const userAgent = request.headers.get('user-agent');
        if (!userAgent) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        // Parse request body to get username/email, OTP, and new password
        const { userNameOrEmail, otp, newPassword } = await request.json();

        let response = { message: "", status: 0 };

        // Handle password update based on whether it's an email or username
        if (userNameOrEmail.includes('@')) {
            const signInResponse = await updatePassword(userNameOrEmail, '', userAgent, otp, newPassword);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        } else {
            const signInResponse = await updatePassword('', userNameOrEmail, userAgent, otp, newPassword);
            response = { message: signInResponse.message || "", status: signInResponse.status };
        }

        // If no response, return internal server error
        if (!response) { return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 }); }

        const { status, message } = response;

        // If status is not 201 (success), return the error message
        if (status !== 201) { return NextResponse.json({ message, status }, { status: 200 }); }

        // Return successful response
        return NextResponse.json({ message, status }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}