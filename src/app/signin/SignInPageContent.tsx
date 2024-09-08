/* eslint-disable @next/next/no-img-element */
'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type SignInFormData = {
    userNameOrEmail: string;
    userPassword: string;
};

const inputCSS = `block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FE1F06] sm:text-sm sm:leading-6`;

export default function SignIn() {

    const router = useRouter();

    //! Initial input fields for sign-in
    const [formData, setFormData] = useState<SignInFormData>({
        userNameOrEmail: '',
        userPassword: ''
    });

    //! Detect onChange values
    const handleChange = (field: keyof SignInFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: SignInFormData) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    //! Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission.
        e.preventDefault();

        // Check if any required field is empty.
        const hasEmptyValue = Object.values(formData).some(value => !value.trim());

        // If a required field is empty, exit the function.
        if (hasEmptyValue) { console.warn("A required field is empty."); return; }

        try {
            // Send sign-in data to the server.
            const { data: { status, message } } = await axios.post(`/api/signInAPI`, formData);

            // If the response status is 202 (Accepted), redirect the user to the dashboard.
            if (status === 202) {
                // Display a success message to inform the user of successful login.
                toast.success(message);
                // Redirect the user to the dashboard page after a successful action.
                return setTimeout(() => { router.push('/dashboard'); }, 1000);

            }

            // If the response indicates an error, display the error message to the user.
            toast.error(message);

        } catch (error) {
            // Log error and set a generic error message.
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image width={110} height={110} alt="Your Company" src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" className="mx-auto h-20 w-auto" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="userNameOrEmail" className="block text-sm font-medium leading-6 text-white">
                                Username or Email
                            </label>
                            <div className="mt-2">
                                <input id="userNameOrEmail" name="userNameOrEmail" type="text" required value={formData.userNameOrEmail} onChange={handleChange('userNameOrEmail')} className={`${inputCSS}`} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userPassword" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            <div className="mt-2">
                                <input id="userPassword" name="userPassword" type="password" required value={formData.userPassword} onChange={handleChange('userPassword')} className={`${inputCSS}`} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-[#FE1F06]/60 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FE1F06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE1F06] uppercase defaultTransitionCSS">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center font-light text-white mt-5">
                        Don&#39;t have an account? <Link href="/signup" className="font-medium text-primary-600 hover:underline text-primary-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}