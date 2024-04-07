'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
    username: string;
    userpassword: string;
};

const labelCSS = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`;

const SignInPage = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        userpassword: '',
    });

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [OTP, setOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);
    const [statusCode, setstatusCode] = useState();
    const [message, setmessage] = useState('');

    const signInUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            const { data: { status, message } } = await axios.post('/api/signInAPI', formData);

            if (status === 201 || status === 401) { setstatusCode(status); setotpScene(true); }

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }

    };

    const signInUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) {
            setmessage("Please enter OTP!");
            return;
        }

        try {
            const { data: { status, message } } = await axios.put('/api/signInAPI', { username: formData.username, OTP });

            if (status === 202) {
                setTimeout(() => { router.push('/'); }, 1000);
            }

            setmessage(message);

        } catch (error) {
            setmessage(error as string);
        }
    }

    const signUpUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) { setmessage("Please enter OTP!"); return; }

        try {
            const { data: { status, message } } = await axios.put('/api/signUpAPI', { userName: formData.username, OTP });

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
        const data = { userName: formData.username, method: statusCode === 201 ? 'oldUserVerification' : 'newUserVerification' };

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
                                <form className="space-y-4 md:space-y-6" onSubmit={signInUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Password</label>
                                        <input className={inputCSS} type="text" placeholder="••••••••" value={formData.userpassword} onChange={handleChange('userpassword')} />
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link href="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>SIGN IN</button>
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
                                <form className="space-y-4 md:space-y-6" onSubmit={statusCode === 201 ? signInUserVerifyFunction : signUpUserVerifyFunction}>
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
    )
}

export default SignInPage