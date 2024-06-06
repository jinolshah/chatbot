'use client'

import { signIn, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaGoogle } from 'react-icons/fa';

export default function Signin() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/chat');
        }
    }, [status, router]);

    const [email, setEmail] = useState('');

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-gray-100 rounded-lg p-8 shadow-md w-96">
                    <p className="text-gray-600 mb-5">Sign in by clicking a link in the email</p>
                    <div className="mb-5">
                        <input
                            placeholder="Email"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                        text-sm text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        onClick={() => signIn('email', { email })}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-colors duration-200 
                                    ease-in-out hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-5"
                    >
                        Login / Signup
                    </button>
                    <div className="border-t border-gray-400 pt-5">
                        <button
                            onClick={() => signIn('google')}
                            className="w-full bg-red-300 flex items-center justify-center text-gray-800 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100 mb-4"
                        >
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}