/* eslint-disable @next/next/no-img-element */
'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SignUPFormData = {
    userFullName: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userReferredBy: string;
    userAgent: string;
};

const inputCSS = `block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FE1F06] sm:text-sm sm:leading-6`;

export default function Example() {

    const searchParams = useSearchParams();
    const referral = searchParams.get('referral');

    //! Initial input fields
    const [formData, setFormData] = useState<SignUPFormData>({
        userFullName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userReferredBy: referral || '',
        userAgent: ''
    });

    //! Fetching user agent at initial load
    useEffect(() => {
        setFormData((prevState: SignUPFormData) => ({
            ...prevState,
            userAgent: window.navigator.userAgent
        }));
    }, []);

    //! Detect onChange values
    const handleChange = (field: keyof SignUPFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: SignUPFormData) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    //! Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission.
        e.preventDefault();

        // Check if any required field (except 'userReferredBy') is empty or false.
        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));

        // If a required field is empty, exit the function.
        if (hasEmptyValue) { return console.warn("A required field is empty."); }

        try {
            // Send sign-up data to the server.
            const { data: { status, message } } = await axios.post(`/api/signUpAPI`, formData);

            // If the response status is 202 (Accepted), redirect the user to the dashboard.
            if (status === 202) {
                // Display a success message to inform the user of successful registration/login.
                toast.success(message);
                // Redirect the user to the dashboard page after a successful action.
                return setTimeout(() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/dashboard`;
                }, 1000);
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
            <div className="flex flex-col min-h-[80vh] items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image width={110} height={110} alt="Your Company" src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" className="mx-auto h-20 w-auto" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Create an account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="userFullName" className="block text-sm font-medium leading-6 text-white">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input id="userFullName" name="userFullName" type="text" required value={formData.userFullName} onChange={handleChange('userFullName')} className={`${inputCSS}`} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input id="userName" name="userName" type="text" required value={formData.userName} onChange={handleChange('userName')} className={`${inputCSS}`} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userEmail" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="userEmail" name="userEmail" type="email" required value={formData.userEmail} onChange={handleChange('userEmail')} className={`${inputCSS}`} />
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
                            <label htmlFor="userReferredBy" className="block text-sm font-medium leading-6 text-white">
                                Referred By (Optional)
                            </label>
                            <div className="mt-2">
                                <input id="userReferredBy" name="userReferredBy" type="text" value={formData.userReferredBy} onChange={handleChange('userReferredBy')} className={`${inputCSS}`} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-[#FE1F06]/60 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FE1F06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE1F06] uppercase defaultTransitionCSS">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center font-light text-white mt-5">
                        Already have an account? <Link href="/signin" className="font-medium text-primary-600 hover:underline text-primary-500">Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
