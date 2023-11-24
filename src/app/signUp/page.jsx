'use client'
import React from 'react'

import axios from "axios"
import { useState } from "react"

const SignUpPage = () => {
    const [fullName, setfullName] = useState('')
    const [userName, setuserName] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [password, setpassword] = useState('')
    const [referredBy, setreferredBy] = useState('')

    async function signUP() {
        const data = { fullName, userName, userEmail, password, referredBy }
        const response = await axios.post('/api/signUp', data)
        console.log(response.data)
    }

    return (
        <div className='flex flex-col gap-4 mt-4 ml-8'>
            <div>sign up</div>
            <div><input value={fullName} onChange={(e) => setfullName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user full name' type="text" /></div>
            <div><input value={userName} onChange={(e) => setuserName(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user name' type="text" /></div>
            <div><input value={userEmail} onChange={(e) => setuserEmail(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='user email' type="text" /></div>
            <div><input value={password} onChange={(e) => setpassword(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='password' type="password" /></div>
            <div><input value={referredBy} onChange={(e) => setreferredBy(e.target.value)} className='text-black pl-2 py-2 placeholder:text-black' placeholder='referred by' type="password" /></div>
            <div onClick={signUP} className="cursor-pointer">submit</div>
        </div>
    )
}

export default SignUpPage