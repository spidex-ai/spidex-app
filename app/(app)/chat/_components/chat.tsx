'use client';

import React from 'react';

import EmptyChat from './empty';
import Messages from './messages';
import ChatInput from './input';

import { useChat } from '../_contexts/chat';
import Image from 'next/image';
import ReportBug from '../../_components/report-bug';

const Chat: React.FC = () => {
  const { messages } = useChat();

  const cleanedMessages = messages.filter(message => message.role !== 'system');

  return (
    <>
      <div className="h-full w-full flex flex-col items-center relative">
        <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-5xl">
          <div className="flex-1  h-0 flex flex-col max-w-full">
            {cleanedMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full relative">
                <EmptyChat />
              </div>
            ) : (
              <>
                <Messages messages={cleanedMessages} />
                <ChatInput />
              </>
            )}
          </div>
        </div>
        {cleanedMessages.length === 0 && (
          <div
            className="absolute top-0 right-10 cursor-pointer"
            onClick={() => {
              window.open('https://spidex.ag/', '_blank');
            }}
          >
            <Image
              src="/icons/spidex-ai-banner-ads.svg"
              alt="Spidex AI Chat"
              width={300}
              height={100}
            />
          </div>
        )}
        <ReportBug />
      </div>
    </>
  );
};

export default Chat;
