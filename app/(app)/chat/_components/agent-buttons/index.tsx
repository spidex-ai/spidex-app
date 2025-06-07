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
    prompt: 'Show me the best tokens',
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
    prompt: 'Get me developer docs for Cardano',
  },
];

const AgentButtons = () => {
  const { sendMessage } = useChat();
  return (
    <div className="mt-10 w-full mx-auto">
      <div className="uppercase text-sm font-bold text-neutral-500 text-center">
        supported agents
      </div>
      <div className="flex gap-6 mt-5 mx-auto justify-center">
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
    </div>
  );
};

export default AgentButtons;
