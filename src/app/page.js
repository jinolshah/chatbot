'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image'

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-400 py-4">
        <div className="container mx-auto flex items-center px-4">
          <Image src="/logo.png" width={30} height={30} alt="SupportU" className="mr-5" />
          <h1 className="text-white text-2xl font-bold">SupportU</h1>
          <button onClick={() => router.push('/auth/signin')} className="ml-auto text-white font-semibold bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">Sign In</button>
        </div>
      </header>
      <main className="container mx-auto flex flex-grow py-8 px-4 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-slate-700 text-6xl font-bold mb-8">Break down barriers to mental health support on campus with SupportU.</h2>
            <p className="text-slate-500 text-lg mb-6">Our platform facilitates early intervention and creates a safe space for students to seek help without judgment.</p>
            <p className="text-slate-500 text-lg mb-6">Through the incorporation of highly trained and specialized application of artificial intelligence, SupportU provides stigma-free, 24/7 support in mental health counseling.</p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-300 py-2 text-white text-center">
        <p>&copy; 2024 SupportU. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;