"use client"

import React from 'react'

import ChatInput from './input';
import StarterButtons from './starter-buttons';

import { cn } from '@/lib/utils';
import { LogoChat } from '@/components/ui/logo';
import AgentButtons from './agent-buttons';

const EmptyChat: React.FC = () => {

    return (
        <div className={cn(
            // Base
            "flex flex-col items-center justify-center w-full h-full px-4",
        )}>
            <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 md:gap-8">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <LogoChat className="w-20 h-20" />
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-center text-2xl">
                            How can <span className="text-brand-600 font-bold inline">We</span> help you?
                        </h1>
                        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                        Welcome to Spidex AI, your personal DeFi assistant. <br /> Type your intent or pick a prompt to get started.
                        </p>
                    </div>
                </div>
                <ChatInput />
                <StarterButtons />
                <AgentButtons />
            </div>
        </div>
    )
}

export default EmptyChat;