'use client'

import axios from 'axios';
import React, { useState } from 'react'

const ResetPassoword = () => {

    const [userName, setuserName] = useState('priyalcoc2');
    const [otp, setotp] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');

    async function resendOTP() {
        const response = await axios.post('/api/resend', { userName, type: 'forgotPassword' });

        const message = response.data.message;

        seterrorMessage(message);
    }

    async function resetPassowrd() {
        const response = await axios.post('/api/forgotPassword', { userName, otp, newPassword });

        const message = response.data.message;
        const statusCode = response.data.statusCode;

        if (statusCode === 200) {

            seterrorMessage(message);
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);

        } else {
            seterrorMessage(message);
        }
    }

    return (
        <div className='flex flex-col gap-4 mt-4 ml-8'>
            <p><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" /></p>
            <p><input value={otp} onChange={(e) => setotp(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='otp' type="otp" /></p>
            <p><input value={newPassword} onChange={(e) => setnewPassword(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='newPassword' type="newPassword" /></p>
            {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
            <button onClick={resendOTP} className="text-left cursor-pointer">resendOTP</button>
            <button onClick={resetPassowrd} className="text-left cursor-pointer">submit</button>
        </div>
    )
}

export default ResetPassoword