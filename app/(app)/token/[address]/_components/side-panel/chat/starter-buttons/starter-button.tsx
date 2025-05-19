'use client'

import React from 'react'

// import { Button, Icon } from '@/components/ui';

import { useChat } from '../../../../_contexts';

import { cn } from '@/lib/utils';

// import { IconName } from '@/types';

interface Props {
    icon: React.ReactNode
    title: string
    description: string
    prompt: string,
    className?: string
}

const StarterButton: React.FC<Props> = ({ title, prompt, className }) => {

    const { sendMessage } = useChat();

    return (
        <div 
        className={cn(
            'gap-2 text-sm text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-border-main dark:bg-bg-secondary rounded-md py-2 cursor-pointer',
            className
        )}
        onClick={() => sendMessage(prompt)}
    >
        <div className="px-2 gap-2">
         
            <div className="col-span-5 text-left">
                <div className="text-sm text-white">{title}</div>
         
            </div>
        </div>
    </div>
    )
}

export default StarterButton