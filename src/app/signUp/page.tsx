'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchUserIP from "../utils/fetchUserIP";

type FormData = {
    userFullName: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userReferredBy: string;
    userAgent: string;
    userIP: string;
};

const SignUpPage = () => {
    const [formData, setFormData] = useState<FormData>({
        userFullName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userReferredBy: '',
        userAgent: '',
        userIP: '',
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            userAgent: window.navigator.userAgent,
        }));

        fetchUserIP().then(userIP => {
            setFormData(prevState => ({
                ...prevState,
                userIP,
            }));
        });
    }, []);

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const signUpUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));
        if (hasEmptyValue) {
            console.log("is empty");
            return;
        }

        try {
            const response = await axios.post('/api/signUpAPI', formData);

            console.log(response.data);

            const statusCode = (response.data.statusCode);
            const message = (response.data.message);

        } catch (error) {
            console.error('Error signing up:', error);
        }

    };

    const labelCSS = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
    const inputCSS = `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
    const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`;

    return (
        <>
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
                                    <input className={inputCSS} type="text" placeholder="full name" value={formData.userFullName} onChange={handleChange('userFullName')} />
                                </div>
                                <div>
                                    <label htmlFor="username" className={labelCSS}>Username</label>
                                    <input className={inputCSS} type="text" placeholder="username" value={formData.userName} onChange={handleChange('userName')} />
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
                                    <input className={inputCSS} type="text" placeholder="referral code" value={formData.userReferredBy} onChange={handleChange('userReferredBy')} />
                                </div>
                                <button type="submit" className={buttonCSS}>Sign up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/signIn" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;
