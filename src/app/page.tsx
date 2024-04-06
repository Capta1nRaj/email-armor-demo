'use client'

import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home() {

  const router = useRouter();

  const [userName, setuserName] = useState('');

  async function sessionCheck() {
    const { data: { status, message, userName } } = await axios.get('/api/localSessionCheck');

    if (status === 202) {
      setuserName(userName)
      return;
    } else {
      router.push('/signIn')
    }

  }

  async function logout() {
    await axios.get('/api/logout');
    router.push('/signIn')
  }

  useEffect(() => {
    sessionCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <p>{userName}</p>
      <button onClick={logout} className="mt-4">logout</button>
    </>
  )
}
