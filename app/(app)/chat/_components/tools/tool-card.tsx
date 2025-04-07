import React from 'react'

import { 
    AnimatedShinyText, 
    Collapsible, 
    CollapsibleTrigger, 
    CollapsibleContent, 
    Icon 
} from '@/components/ui'

import { cn } from '@/lib/utils'

import type { ToolInvocation } from 'ai'
import type { BaseActionResult } from '@/ai'
import { getAgentName } from './tool-to-agent'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { 
    KNOWLEDGE_AGENT_NAME, 
    MARKET_AGENT_NAME, 
    STAKING_AGENT_NAME, 
    WALLET_AGENT_NAME,
    TOKEN_ANALYSIS_AGENT_NAME, 
    TRADING_AGENT_NAME, 
    SOCIAL_AGENT_NAME,
    LIQUIDITY_AGENT_NAME
} from "@/ai/agents/names";

interface Props<ActionResultBodyType, ActionArgsType> {
    tool: ToolInvocation,
    loadingText: string,
    result: {
        heading: (result: BaseActionResult<ActionResultBodyType>) => string,
        body: (result: BaseActionResult<ActionResultBodyType>) => React.ReactNode,
    },
    call?: {
        heading: string,
        body: (toolCallId: string, args: ActionArgsType) => React.ReactNode,
    },
    defaultOpen?: boolean,
    className?: string,
    prevToolAgent?: string,
}

const getAgentIcon = (agentName: string) => {
    switch(agentName) {
        case STAKING_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case WALLET_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case MARKET_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case KNOWLEDGE_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case TRADING_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case SOCIAL_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case TOKEN_ANALYSIS_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
        case LIQUIDITY_AGENT_NAME:
            return <Image src="/icons/trading-agent.svg" alt="Chart Candlestick" width={20} height={20} />;
            
    }   
}

const ToolCard = <ActionResultBodyType, ActionArgsType>({ tool, loadingText, result, call, defaultOpen = true, className, prevToolAgent }: Props<ActionResultBodyType, ActionArgsType>) => {

    const agentName = getAgentName(tool);
    console.log("🚀 ~ ToolCard ~ agentName:", agentName)

    const agentIcon = getAgentIcon(agentName);
    console.log("🚀 ~ ToolCard ~ agentIcon:", agentIcon)

    console.log("🚀 ~ ToolCard ~ tool:", tool)
    
    return (
        <div className={cn(
            "flex flex-col gap-2 w-fit",
            className
        )}>
            <div className={cn(
                "flex items-center gap-2",
                prevToolAgent === agentName && "hidden"
            )}>
                {
                    tool.state === "result"
                        ? (tool.result.body 
                            ? <>{agentIcon}</>
                            : <Icon name="X" className="w-4 h-4 text-red-500 dark:text-red-400" />)
                        : <>{agentIcon}</>
                }
                <p className="text-sm md:text-lg font-bold">{agentName}</p>
            </div>
            <div>
                {
                    tool.state === "partial-call" ? (
                        <AnimatedShinyText
                            className="text-sm"
                        >
                         a
                        </AnimatedShinyText>
                    ) : (
                        tool.state === "call" ? (
                            call?.body 
                                ? (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{call.heading}</p>
                                        {call.body(tool.toolCallId, tool.args)}
                                    </div>
                                ) 
                                : (
                                    <AnimatedShinyText
                                        className="text-sm"
                                    >
                                       {loadingText}
                                    </AnimatedShinyText>
                                )
                        ) : (
                            <Collapsible defaultOpen={defaultOpen}>
                                {/* <CollapsibleTrigger 
                                    className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:underline"
                                >
                                    <p className="text-sm">{result.heading(tool.result)}</p>
                                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="text-sm pt-2">
                                    {result.body(tool.result)}
                                </CollapsibleContent> */}
                            </Collapsible>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ToolCard