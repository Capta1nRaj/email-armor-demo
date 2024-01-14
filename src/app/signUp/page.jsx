'use client'
import React from 'react'

import axios from "axios"
import { useState } from "react"

const SignUpPage = () => {
    const [fullName, setfullName] = useState('Priyal Raj')
    const [userName, setuserName] = useState('priyalcoc2')
    const [userEmail, setuserEmail] = useState('priyalcoc2@gmail.com')
    const [password, setpassword] = useState('priyalcoc2')
    const [referredBy, setreferredBy] = useState('')
    const [otp, setotp] = useState('');

    const [signUpScene, setsignUpScene] = useState(true);

    const [errorMessage, seterrorMessage] = useState('');

    async function signUP() {
        const data = { fullName, userName, userEmail, password, referredBy }
        const response = await axios.post('/api/signUp', data)

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 201) {
            setsignUpScene(false);
            return;
        } else {
            seterrorMessage(message);
        }
    }

    async function signUPVerify() {
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
        const response = await axios.post('/api/resend', { userName, type: 'newUserVerification' });

        const message = response.data.message;

        seterrorMessage(message);
    }

    return (
        <>
            {signUpScene ?
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign UP</p>
                    <p><input value={fullName} onChange={(e) => setfullName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user full name' type="text" /></p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" /></p>
                    <p><input value={userEmail} onChange={(e) => setuserEmail(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user email' type="text" /></p>
                    <p><input value={password} onChange={(e) => setpassword(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='password' type="password" /></p>
                    <p><input value={referredBy} onChange={(e) => setreferredBy(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='referred by' type="password" /></p>
                    {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                    <button onClick={signUP} className="text-left cursor-pointer">submit</button>
                </div>
                :
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign UP Verify</p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" readOnly={true} /></p>
                    <p><input value={otp} onChange={(e) => setotp(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='otp' type="otp" /></p>
                    {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                    <button onClick={resendOTP} className="text-left cursor-pointer">resend OTP</button>
                    <button onClick={signUPVerify} className="text-left cursor-pointer">submit</button>
                </div>
            }
        </>
    )
}

export default SignUpPage