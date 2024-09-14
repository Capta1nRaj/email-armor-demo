/* eslint-disable @next/next/no-img-element */
'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type SignInFormData = {
    userNameOrEmail: string;
    userPassword: string;
    OTP: string;
    OTPScene: boolean;
};

const inputCSS = `block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FE1F06] sm:text-sm sm:leading-6`;

export default function SignIn() {

    //! Initial input fields for sign-in
    const [formData, setFormData] = useState<SignInFormData>({
        userNameOrEmail: '',
        userPassword: '',
        OTP: "",
        OTPScene: false
    });

    //! Detect onChange values
    const handleChange = (field: keyof SignInFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: SignInFormData) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    //! Handle sign in
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission.
        e.preventDefault();

        // Check if 'userNameOrEmail' or 'userPassword' fields are empty
        const hasEmptyValue = !formData.userNameOrEmail.trim() || !formData.userPassword.trim();
        if (hasEmptyValue) { return toast.error("Username/Email or Password is empty."); }

        try {
            // Send sign-in data to the server.
            const { data: { status, message } } = await axios.post(`/api/signInAPI`, formData);

            // If the response status is 202 (Accepted), redirect the user to the dashboard.
            if (status === 201) {
                toast.success(message);
                return setFormData((prevData) => ({ ...prevData, OTPScene: true, }));
            } else if (status === 202) {
                // Display a success message to inform the user of successful login.
                toast.success(message);
                // Redirect the user to the dashboard page after a successful action.
                return setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
            }

            // If the response indicates an error, display the error message to the user.
            toast.error(message);

        } catch (error) {
            // Log error and set a generic error message.
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    //! Handle sign in verify
    const handleSignInVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission.
        e.preventDefault();

        // Check if 'userNameOrEmail' or 'userPassword' fields are empty
        const hasEmptyValue = !formData.OTP.trim();
        if (hasEmptyValue) { return toast.error("Please enter OTP."); }

        try {
            const { data: { status, message } } = await axios.put(`/api/signInAPI`, formData);

            // If the response status is 202, OTP resent to user
            if (status === 202) {
                toast.success(message);
                return setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
            }

            // If the response indicates an error, display the error message to the user.
            toast.error(message);
        } catch (error) {
            // Log error and set a generic error message.
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    //! Handle Resend OTP
    const handleResendOTP = async () => {
        try {
            // Send sign-in data to the server.
            const { data: { status, message } } = await axios.patch(`/api/signInAPI`, { message: "Empty" });

            // If the response status is 202, OTP resent to user
            if (status === 200) { return toast.success(message); }

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
            <div className="flex flex-col min-h-[80vh] items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image width={110} height={110} alt="Your Company" src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" className="mx-auto h-20 w-auto" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {!formData.OTPScene ? "Sign in to your account" : "Enter OTP"}
                    </h2>
                </div>

                {!formData.OTPScene ?
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSignIn} className="space-y-5">
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

                            <div className="flex items-center justify-end">
                                <Link href="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</Link>
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
                    :
                    <>
                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSignInVerify} className="space-y-5">
                                <div>
                                    <label htmlFor="OTP" className="block text-sm font-medium leading-6 text-white">
                                        Enter OTP
                                    </label>
                                    <div className="mt-2">
                                        <input id="OTP" name="OTP" type="text" required value={formData.OTP} onChange={handleChange('OTP')} className={`${inputCSS}`} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button onClick={() => { handleResendOTP(); }}> Resend OTP </button>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-[#FE1F06]/60 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FE1F06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE1F06] uppercase defaultTransitionCSS">
                                        Verify
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                }
            </div>
        </>
    )
}