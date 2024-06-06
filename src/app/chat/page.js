'use client'

import { useEffect, useState } from "react";
import Chat from "@/app/components/Chat";
import MobileSiderbar from "@/app/components/MobileSidebar";
import Sidebar from "@/app/components/Sidebar";
import useAnalytics from "@/app/hooks/useAnalytics";

export default function Home() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const { trackEvent } = useAnalytics();

  // useEffect(() => {
  //   trackEvent("page.view", { page: "home" });
  // }, []);

  const [conversation, setConversation] = useState([]);
  const [showEmptyChat, setShowEmptyChat] = useState(true);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar setConversation={setConversation} setShowEmptyChat={setShowEmptyChat}/>
        </div>
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} 
            conversation={conversation} setConversation={setConversation}
            showEmptyChat={showEmptyChat} setShowEmptyChat={setShowEmptyChat}/>
    </main>
  );
}
