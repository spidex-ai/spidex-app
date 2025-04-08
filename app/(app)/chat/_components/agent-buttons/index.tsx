'use client'

import { AgentButton } from '@/components/ui'
import React from 'react'
import Image from 'next/image'
import { useChat } from '../../_contexts/chat'
type Agent = {
    icon: React.ReactNode
    name: string
    prompt: string
}

const Agents: Agent[] = [
    {
        icon: <Image src="/icons/trading-agent.svg" alt="Agent" width={20} height={20} className="w-8 h-8" />,
        name: "Trading Agent",
        prompt: "Let's trade some tokens"
    },
    {
        icon: <Image src="/icons/market-agent.svg" alt="Agent" width={20} height={20} className="w-8 h-8" />,
        name: "Market Agent",
        prompt: "Show me the market data"
    },
    {
        icon: <Image src="/icons/portfolio-white.svg" alt="Agent" width={20} height={20} className="w-8 h-8" />,
        name: "Portfolio Agent",
        prompt: "Show me my portfolio"
    },
    {
        icon: <Image src="/icons/token-white.svg" alt="Agent" width={20} height={20} className="w-8 h-8" />,
        name: "Token Agent",
        prompt: "Show me the best tokens"
    },
    {
        icon: <Image src="/icons/intel-agent.svg" alt="Agent" width={20} height={20} className="w-8 h-8" />,
        name: "Intel Agent",
        prompt: "Get me developer docs for Orca"
    }
]

const AgentButtons = () => {
    const { sendMessage } = useChat();
  return (
    <div className='mt-10'>
        <div className='uppercase text-sm font-bold text-neutral-500 text-center'>supported agents</div>
        <div className="flex gap-4 mt-5">
            {
                Agents.map((agent) => (
                    <AgentButton
                        key={agent.name}
                        onClick={() => sendMessage(agent.prompt)}
                    >
                        <div className="flex items-center gap-2">
                            <div>{agent.icon}</div>
                            <div>{agent.name}</div>
                        </div>
                    </AgentButton>
                ))
            }
        </div>
    </div>
  )
}



export default AgentButtons