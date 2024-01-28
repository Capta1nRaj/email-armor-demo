'use client'
import React from 'react'

import axios from "axios"
import { useState } from "react"
import Link from 'next/link'

const SignInpage = () => {
    const [userName, setuserName] = useState('priyalcoc2')
    const [password, setpassword] = useState('priyalcoc2')
    const [otp, setotp] = useState('');

    const [signInScene, setsignInScene] = useState(false);
    const [signUpVerifyScene, setsignUpVerifyScene] = useState(false);

    const [errorMessage, seterrorMessage] = useState('');

    async function signIn() {
        const data = { userName, password }
        const response = await axios.post('/api/signIn', data)

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 201) {
            setsignInScene(true);
        } else if (statusCode === 401) {
            setsignUpVerifyScene(true);
        }
        seterrorMessage(message);
    }

    async function signInVerify() {
        const data = { userName, otp }
        const response = await axios.put('/api/signIn', data)

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 202) {
            window.location.href = '/';
            return;
        } else {
            seterrorMessage(message);
        }
    }

    async function signUpVerify() {
        const data = { userName, otp }
        const response = await axios.put('/api/signUp', data)

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 202) {
            window.location.href = '/';
            return;
        } else {
            seterrorMessage(message);
        }
    }

    async function resendOTP() {
        const response = await axios.post('/api/resend', { userName, type: 'oldUserVerification' });

        const message = response.data.message;

        seterrorMessage(message);
    }

    return (
        <>
            {(!signInScene && !signUpVerifyScene) ?
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign IN</p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" /></p>
                    <p><input value={password} onChange={(e) => setpassword(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='password' type="password" /></p>
                    {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                    <button onClick={signIn} className="text-left cursor-pointer">submit</button>
                    <Link href={'/forgotPassword'} className="text-left cursor-pointer">forgot password</Link>
                    <Link href="/signUp">Sign UP</Link>
                </div>
                :
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign {signUpVerifyScene ? "UP" : "IN"} Verify</p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" readOnly={true} /></p>
                    <p><input value={otp} onChange={(e) => setotp(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='otp' type="otp" /></p>
                    {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                    <button onClick={resendOTP} className="text-left cursor-pointer">resend OTP</button>
                    {signUpVerifyScene ?
                        <button onClick={signUpVerify} className="text-left cursor-pointer">submit</button>
                        :
                        <button onClick={signInVerify} className="text-left cursor-pointer">submit</button>
                    }
                </div>
            }
        </>
    )
}

export default SignInpage