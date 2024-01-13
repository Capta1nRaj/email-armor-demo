'use client'
import React from 'react'

import axios from "axios"
import { useState } from "react"

const SignInpage = () => {
    const [userName, setuserName] = useState('priyalcoc2')
    const [password, setpassword] = useState('priyalcoc2')
    const [otp, setotp] = useState('');

    const [signInScene, setsignInScene] = useState(true);

    const [errorMessage, seterrorMessage] = useState('');

    async function signIn() {
        const data = { userName, password }
        const response = await axios.post('/api/signIn', data)

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 201) {
            setsignInScene(false);
            return;
        } else {
            seterrorMessage(message);
        }
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


    return (
        <>
            {signInScene ?
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign IN</p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" /></p>
                    <p><input value={password} onChange={(e) => setpassword(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='password' type="password" /></p>
                    <p className='text-red-600'>{errorMessage}</p>
                    <button onClick={signIn} className="text-left cursor-pointer">submit</button>
                </div>
                :
                <div className='flex flex-col gap-4 mt-4 ml-8'>
                    <p>Sign IN Verify</p>
                    <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" readOnly={true} /></p>
                    <p><input value={otp} onChange={(e) => setotp(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='otp' type="otp" /></p>
                    <p className='text-red-600'>{errorMessage}</p>
                    <button onClick={signInVerify} className="text-left cursor-pointer">submit</button>
                </div>
            }
        </>
    )
}

export default SignInpage