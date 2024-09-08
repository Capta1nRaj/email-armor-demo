/* eslint-disable @next/next/no-img-element */
'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Reusable input CSS classes
const inputCSS = `block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FE1F06] sm:text-sm sm:leading-6`;

export default function ForgotPassword() {

    const router = useRouter();

    //! State for toggling between Scene 1 (Request OTP) and Scene 2 (Submit OTP and reset password)
    const [scene, setScene] = useState(1);

    //! Input state that holds values for username/email, OTP, and new password
    const [formData, setFormData] = useState({ userNameOrEmail: '', otp: '', newPassword: '' });

    //! Updates the formData state when input fields are changed
    const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ ...prevState, [field]: e.target.value }));
    };

    //! Handles form submission for Scene 1: requesting OTP via username/email
    const handleSubmitScene1 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure the username/email field is not empty
        if (!formData.userNameOrEmail.trim()) {
            toast.error("Please enter your username or email.");
            return;
        }

        try {
            // Make API request to send OTP
            const { data: { status, message } } = await axios.post(`/api/forgotPasswordAPI`, { userNameOrEmail: formData.userNameOrEmail });

            // If status is 201 (OTP sent), move to Scene 2 (Submit OTP and reset password)
            if (status === 201) {
                toast.success(message);
                setScene(2);  // Move to next scene
            } else {
                // If API returns any other status, show error message
                toast.error(message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    //! Handles form submission for Scene 2: submitting OTP and new password
    const handleSubmitScene2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure OTP and new password fields are filled out
        if (!formData.otp.trim() || !formData.newPassword.trim()) {
            toast.error("Please enter both OTP and new password.");
            return;
        }

        try {
            // Make API request to reset the password
            const { data: { status, message } } = await axios.put(`/api/forgotPasswordAPI`, {
                otp: formData.otp,
                newPassword: formData.newPassword,
                userNameOrEmail: formData.userNameOrEmail
            });

            // If status is 201 (Password reset successful), redirect to the sign-in page
            if (status === 201) {
                toast.success(message);
                setTimeout(() => {
                    router.push('/signin');  // Redirect to sign-in after 1 second
                }, 1000);
            } else {
                // If API returns any other status, show error message
                toast.error(message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    //! Handles resending OTP
    const handleResendOTP = async () => {
        try {
            // Resend OTP via API
            const { data: { status, message } } = await axios.post(`/api/forgotPasswordAPI`, { userNameOrEmail: formData.userNameOrEmail });

            // If OTP resent successfully, show success message
            if (status === 201) {
                toast.success("OTP resent successfully.");
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Company Logo */}
                    <Image width={110} height={110} alt="Your Company" src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" className="mx-auto h-20 w-auto" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {scene === 1 ? "Forgot Password" : "Reset Your Password"}
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Scene 1: Ask for username/email */}
                    {scene === 1 ? (
                        <form onSubmit={handleSubmitScene1} className="space-y-5">
                            <div>
                                <label htmlFor="userNameOrEmail" className="block text-sm font-medium leading-6 text-white">
                                    Username or Email
                                </label>
                                <div className="mt-2">
                                    <input id="userNameOrEmail" name="userNameOrEmail" type="text" required value={formData.userNameOrEmail} onChange={handleChange('userNameOrEmail')} className={`${inputCSS}`} />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-[#FE1F06]/60 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FE1F06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE1F06] uppercase defaultTransitionCSS">
                                    Send OTP
                                </button>
                            </div>


                            <p className="text-sm text-center font-light text-white mt-5">
                                Remember your password? <Link href="/signin" className="font-medium text-primary-600 hover:underline text-primary-500">Sign In</Link>
                            </p>
                        </form>
                    ) : (
                        // Scene 2: Ask for OTP and new password
                        <form onSubmit={handleSubmitScene2} className="space-y-5">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-white">
                                    OTP
                                </label>
                                <div className="mt-2">
                                    <input id="otp" name="otp" type="text" required value={formData.otp} onChange={handleChange('otp')} className={`${inputCSS}`} />
                                </div>
                                {/* Resend OTP button */}
                                <button type="button" className="text-sm font-medium text-primary-600 hover:underline mt-2 text-right w-full" onClick={handleResendOTP}>
                                    Resend OTP
                                </button>
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-white">
                                    New Password
                                </label>
                                <div className="mt-2">
                                    <input id="newPassword" name="newPassword" type="password" required value={formData.newPassword} onChange={handleChange('newPassword')} className={`${inputCSS}`} />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-[#FE1F06]/60 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FE1F06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE1F06] uppercase defaultTransitionCSS">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}