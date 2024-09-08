'use server'

import { cookies } from 'next/headers';

//! Delete cookies function
export async function DeleteCookie() {
    const cookieOptions = { path: "/", domain: `${process.env.COOKIE_DOMAIN || "localhost"}`, expires: new Date(0), 'max-age': 0 };

    cookies().set("id", "", cookieOptions);
    cookies().set("userName", "", cookieOptions);
    cookies().set("token", "", cookieOptions);
}