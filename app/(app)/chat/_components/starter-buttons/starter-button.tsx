'use client'

import React from 'react'

import { useChat } from '../../_contexts/chat';

import { cn } from '@/lib/utils';

interface Props {
    icon: React.ReactNode
    title: string
    description: string
    prompt: string,
    className?: string
}

const StarterButton: React.FC<Props> = ({ icon, title, description, prompt, className }) => {

    const { sendMessage } = useChat();

    return (
        <div 
            className={cn(
                'gap-2 text-sm text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-border-main dark:bg-bg-secondary rounded-md px-2 py-4 cursor-pointer',
                className
            )}
            onClick={() => sendMessage(prompt)}
        >
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-1 flex justify-end items-start pt-1">
                    {icon}
                </div>
                <div className="col-span-5 text-left">
                    <div className="text-sm text-white">{title}</div>
                    <div className='text-xs text-neutral-400'>{description}</div>
                </div>
            </div>
        </div>
    )
}

export default StarterButton