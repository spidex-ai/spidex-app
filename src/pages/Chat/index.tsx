import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import DefaultAvt from '@/assets/images/default-avt.png'
import { MainButton } from '@/components/Button';
import { SendRight } from '@/assets';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatOption {
  id: string;
  icon: string;
  label: string;
}

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
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
  }, [messages]);

  const chatOptions: ChatOption[] = [
    { id: 'analyze', icon: '📈', label: 'Analyze BTC Trends' },
    { id: 'entry', icon: '📊', label: 'Find Best Entry Points' },
    { id: 'compare', icon: '🔍', label: 'Compare Crypto Pairs' },
    { id: 'sentiment', icon: '📰', label: 'Check Market Sentiment' },
    { id: 'strategy', icon: '💡', label: 'Suggest Trading Strategy' },
  ];

  const recentChats = [
    { id: '1', title: 'How to get fit without doing any exercise', time: '2m ago' },
    { id: '2', title: 'Hacking FBI Server with raspberry pi', time: '2m ago', pinned: true },
    { id: '3', title: 'Compsci SICP Tutorial course', time: '2m ago' },
    { id: '4', title: 'Proxy failure troubleshooting', time: '2m ago' },
    { id: '5', title: 'Wake me up when september ends', time: '2m ago' },
    { id: '6', title: 'Best Oasis songs top 100 of all time', time: '2m ago' },
    { id: '7', title: 'Fix SSL/TLS Error', time: '2m ago' },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulated bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request. Please wait while I process the information...",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full bg-gray-100 text-text-secondary">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 flex flex-col bg-white overflow-hidden">
        {/* User profile */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
            X
          </div>
          <div className="ml-2 text-sm font-medium">X_AE_A-13</div>
          <div className="ml-auto">
            <button className="text-gray-400">
              <IoIosArrowDown className='text-text-secondary' />
            </button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="px-4 border-b border-primary-100 py-2">
          <div className="text-sm font-medium text-center">Main</div>
        </div>

        {/* Recent chats */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between py-4 px-4">
            <div className="text-sm font-bold text-gray-200">Recent Chats</div>
            <button className="text-gray-400">
              <IoIosArrowDown className='text-text-secondary' />
            </button>
          </div>

          {/* Chat list */}
          <div>
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <div className="flex justify-between w-full items-center py-1">
                  <div className="text-sm truncate max-w-[75%]">{chat.title}</div>
                  <div className="text-xs text-gray-400">{chat.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Welcome screen */}
        <div className={`flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto ${messages.length > 0 ? 'hidden' : ''}`}>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src={DefaultAvt}
              alt="Bot Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-[32px] font-medium mb-2 text-text-quinary">CryptoTrading Bot X</h1>

          <p className="text-center mb-8 max-w-md">
            Your AI-Powered Trading Assistant, Ready To
            Analyze And Suggest The Best Moves!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
            {chatOptions.map((option) => (
              <button
                key={option.id}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat interface when there are messages */}
        <div className={`flex flex-col ${messages.length === 0 ? "" : "h-full"}`}>
          {/* Bot header */}
          <div className={`flex p-6 gap-6 ${messages.length === 0 ? 'hidden' : ''}`}>
            <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
              <img
                src={DefaultAvt}
                alt="Bot Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-[32px] font-medium text-text-quinary">CryptoTrading Bot X</h1>
          </div>

          {/* Messages container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4"
          >
            <div className="w-full max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-3 px-4 rounded-xl whitespace-pre-wrap break-words ${
                      message.sender === 'user'
                        ? 'bg-white'
                        : ''
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-4">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative">
                <textarea
                  placeholder="Ask me about market trends, indicators, or strategies..."
                  className="w-full py-3 px-4 pl-10 pb-12 bg-gray-100  bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none lg:min-h-[100px] min-h-[50px] pr-12"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                />

                {/* File attachment button - positioned inside textarea near placeholder */}
                <button
                  className="absolute left-3 top-3 text-gray-400 hover:text-blue-500 transition-colors"
                  title="Add file"
                  onClick={() => {/* Add file handling logic here */ }}
                >
                  <FiLink className="h-5 w-5" />
                </button>

                {/* Send button - positioned inside textarea on the right */}
                <MainButton
                  onClick={handleSendMessage}
                  className="absolute right-3 bottom-3 !px-6 !py-2"
                >
                  <div className='flex items-center gap-2'>
                    Send
                    <SendRight className='w-5 h-5' />
                  </div>
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
