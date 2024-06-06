import { signOut, signIn, useSession } from "next-auth/react";
import React from "react";
import { useEffect } from 'react';
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

export default function Sidebar (prop) {
  const {setConversation} = prop;
  const {setShowEmptyChat} = prop;
  const { data: session, status } = useSession();

  const clearConvo = async () => {
    try {
      const response = await fetch('/api/message/deleteMessages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ byUser: session.user.email }),
      });
      const data = await response.json();
      setConversation([]);
      setShowEmptyChat(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to sign-in page
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
        <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
          
        </nav>
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
        <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
            <AiOutlinePlus className="h-4 w-4" />
            New chat
          </a>
          <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
            <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
              <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
                <FiMessageSquare className="h-4 w-4" />
                <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  New conversation
                  <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                </div>
              </a>
            </div>
          </div>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineUser className="h-4 w-4" />
            {session.user.name || session.user.email}
          </a>
          <a
            href="https://help.openai.com/en/collections/3742473-chatgpt"
            target="_blank"
            className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <BiLinkExternal className="h-4 w-4" />
            Get help
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <AiOutlineMessage className="h-4 w-4" />
            <button onClick={() => clearConvo()}>
              Clear conversation
            </button>
          </a>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <MdLogout className="h-4 w-4" />
            <button onClick={() => signOut()}>
              Logout
            </button>
          </a>
        </nav>
      </div>
    );
  }
};
