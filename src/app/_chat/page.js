'use client'

import { signOut, useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';

const ProtectedPage = () => {
  const router = useRouter();
  const { data, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
    <>
      <p>Welcome, {data.user.email}</p>
      <button onClick={()=>signOut()}>Sign Out</button>
    </>
    );
  }

  router.push('/auth/signin')
};

export default ProtectedPage;

