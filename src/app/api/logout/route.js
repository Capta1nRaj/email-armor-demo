import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(request) {

    console.clear();

    cookies().delete('userName');
    cookies().delete('jwtToken');
    cookies().delete('id');

    return NextResponse.json(
        {
            statusCode: 201,
            message: 'Cookied deleted successfully.',
        },
        { status: 200 }
    );
}
