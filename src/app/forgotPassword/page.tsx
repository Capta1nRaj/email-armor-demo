'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
    username: string;
    userOTP: string;
    userNewPassword: string;
};

const labelCSS = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`;

const SignInPage = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        userOTP: '',
        userNewPassword: ''
    });

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [otpScene, setotpScene] = useState(false);
    const [message, setmessage] = useState('');

    const verifyUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data: { status, message, userName } } = await axios.post('/api/forgotPassword', { username: formData.username });

        if (status === 201) { { setotpScene(true) } };

        setmessage(message);
    }

    const verifyOTPAndUpdatePasswordFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.userOTP) { setmessage("Please enter OTP!"); return; }

        const { data: { status, message, userName } } = await axios.put('/api/forgotPassword', { username: formData.username, userOTP: formData.userOTP, userNewPassword: formData.userNewPassword });

        if (status === 200) { setTimeout(() => { router.push('/') }, 1000); }

        setmessage(message);
    }

    const resendOTP = async () => {
        const data = { username: formData.username, method: 'forgotPassword' };

        try {
            const { data: { message } } = await axios.post('/api/resendOTP', data);

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }
    }
    return (
        <>
            {!otpScene ?
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={verifyUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>SEND OTP</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don`t have an account yet? <Link href="/signUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
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
                                <form className="space-y-4 md:space-y-6" onSubmit={verifyOTPAndUpdatePasswordFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Enter OTP</label>
                                        <input className={inputCSS} type="text" placeholder="OTP" value={formData.userOTP} onChange={handleChange('userOTP')} />
                                    </div>

                                    <p onClick={resendOTP} className="text-right text-xs cursor-pointer">RESEND OTP</p>

                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Enter New Password</label>
                                        <input className={inputCSS} type="password" placeholder="••••••••" value={formData.userNewPassword} onChange={handleChange('userNewPassword')} />
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>UPDATE PASSWORD</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default SignInPage