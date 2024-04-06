'use client'

import axios from "axios";
import { resendOTP } from "email-armor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
    userFullName: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userReferredBy: string;
    userAgent: string;
};

const SignUpPage = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        userFullName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userReferredBy: '',
        userAgent: ''
    });

    useEffect(() => {
        setFormData((prevState: any) => ({
            ...prevState,
            userAgent: window.navigator.userAgent,
        }));
    }, []);

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [message, setmessage] = useState('');

    const [OTP, setOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);

    const signUpUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));
        if (hasEmptyValue) {
            console.warn("is empty");
            return;
        }

        try {
            const { data: { status, message } } = await axios.post('/api/signUpAPI', formData);

            if (status === 201) {
                setotpScene(true);
            }

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }

    };

    const signUpUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) {
            setmessage("Please enter OTP!");
            return;
        }

        try {
            const { data: { status, message } } = await axios.put('/api/signUpAPI', { userName: formData.userName, OTP });

            if (status === 202) {
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }
    }

    const resendOTP = async () => {
        try {
            const { data: { message } } = await axios.patch('/api/signUpAPI', { userName: formData.userName });

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }
    }

    const labelCSS = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
    const inputCSS = `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
    const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`;

    return (
        <>
            {!otpScene ?
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create a new account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={signUpUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Name</label>
                                        <input className={inputCSS} type="text" placeholder="Fullname" value={formData.userFullName} onChange={handleChange('userFullName')} />
                                    </div>
                                    <div>
                                        <label htmlFor="username" className={labelCSS}>Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.userName} onChange={handleChange('userName')} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={labelCSS}>Your email</label>
                                        <input className={inputCSS} type="email" placeholder="your@email.com" value={formData.userEmail} onChange={handleChange('userEmail')} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className={labelCSS}>Password</label>
                                        <input className={inputCSS} type="password" placeholder="••••••••" value={formData.userPassword} onChange={handleChange('userPassword')} />
                                    </div>
                                    <div>
                                        <label htmlFor="referredBy" className={labelCSS}>Referred by</label>
                                        <input className={inputCSS} type="text" placeholder="Referral Code" value={formData.userReferredBy} onChange={handleChange('userReferredBy')} />
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>SIGN UP</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link href="/signIn" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                :

                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Enter OTP
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={signUpUserVerifyFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Enter OTP</label>
                                        <input className={inputCSS} type="text" placeholder="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                                    </div>

                                    <p onClick={resendOTP} className="text-right text-xs cursor-pointer">RESEND OTP</p>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>VERIFY</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default SignUpPage;
