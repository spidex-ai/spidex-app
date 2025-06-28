'use client';

// import { AgentButton } from '@/components/ui'
import React from 'react';
import Image from 'next/image';
import { useChat } from '../../_contexts/chat';
type Agent = {
  key: string;
  icon: React.ReactNode;
  name: string;
  prompt: string;
  isBorder?: boolean;
};

const Agents: Agent[] = [
  {
    key: 'trading-agent',
    icon: (
      <Image
        src="/icons/trading-agent.svg"
        alt="Agent"
        width={15}
        height={15}
        className="w-4 h-4"
      />
    ),
    name: 'Trading Agent',
    prompt: "Let's trade some tokens",
    isBorder: true,
  },
  {
    key: 'market-agent',
    icon: (
      <Image
        src="/icons/market-agent.svg"
        alt="Agent"
        width={15}
        height={15}
        className="w-4 h-4"
      />
    ),
    name: 'Market Agent',
    prompt: 'Show me the market data',
    isBorder: true,
  },
  {
    key: 'portfolio-agent',
    icon: (
      <Image
        src="/icons/portfolio-white.svg"
        alt="Agent"
        width={15}
        height={15}
        className="w-4 h-4"
      />
    ),
    name: 'Portfolio Agent',
    prompt: 'Show me my portfolio',
    isBorder: true,
  },
  {
    key: 'token-agent',
    icon: (
      <Image
        src="/icons/token-white.svg"
        alt="Agent"
        width={15}
        height={15}
        className="w-4 h-4"
      />
    ),
    name: 'Token Agent',
    prompt: 'Show me the token analytics of minswap token',
    isBorder: true,
  },
  {
    key: 'intel-agent',
    icon: (
      <Image
        src="/icons/intel-agent.svg"
        alt="Agent"
        width={15}
        height={15}
        className="w-4 h-4"
      />
    ),
    name: 'Intelligence Agent',
    prompt: 'Get me developer docs for Cardano in 2025',
  },
];

const AgentButtons = () => {
  const { sendMessage } = useChat();
  return (
    <div className="mt-10 w-full mx-auto">
      <div className="uppercase text-sm font-bold text-neutral-500 text-center">
        supported agents
      </div>
      {/* Desktop: Single line layout */}
      <div className="hidden sm:flex gap-6 mt-5 mx-auto justify-center">
        {Agents.map(agent => (
          <div key={agent.key} className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => sendMessage(agent.prompt)}
            >
              <div>{agent.icon}</div>
              <div>{agent.name}</div>
            </div>
            {agent.isBorder && (
              <div className="border-r border-border-main h-full"> </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Two lines layout - 3 items first line, 2 items second line */}
      <div className="sm:hidden mt-5 mx-auto">
        {/* First line: 3 items */}
        <div className="flex gap-4 justify-center mb-4">
          {Agents.slice(0, 3).map((agent, index) => (
            <div key={agent.key} className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => sendMessage(agent.prompt)}
              >
                <div>{agent.icon}</div>
                <div className="text-xs">{agent.name}</div>
              </div>
              {index < 2 && (
                <div className="border-r border-border-main h-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Second line: 2 items */}
        <div className="flex gap-4 justify-center">
          {Agents.slice(3, 5).map((agent, index) => (
            <div key={agent.key} className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => sendMessage(agent.prompt)}
              >
                <div>{agent.icon}</div>
                <div className="text-xs">{agent.name}</div>
              </div>
              {index < 1 && (
                <div className="border-r border-border-main h-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentButtons;
