import React, { useEffect, useRef, useState } from "react";
import EmptyChat from "@/components/_app/pages/empty-chat";
import ChatMessages from "@/components/_app/pages/messages";
import ChatInput from "@/components/_app/pages/chat-input";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// interface ChatOption {
//   id: string;
//   icon: string;
//   label: string;
// }

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => { 
    scrollToBottom();
    setMessages([])
  }, [messages]);
  return (
    <>
    <div className="h-full w-full flex flex-col items-center relative">
        <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-4xl">
            <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <EmptyChat />
                    </div>
                ) : (
                    <>
                        <ChatMessages messages={messages} />
                        <ChatInput />
                    </>
                )}
            </div>
        </div>
    </div>
</>
  );
};

export default Chat;
