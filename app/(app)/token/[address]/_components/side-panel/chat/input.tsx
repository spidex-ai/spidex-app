"use client";

import React, { useRef, useEffect } from 'react';

// import { CornerDownRight } from 'lucide-react';

import Textarea from 'react-textarea-autosize'

import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui';

// import { ModelSelector } from '@/app/(app)/_components/chat';

import { useEnterSubmit } from '@/app/(app)/_hooks';

import { useChat } from '../../../_contexts';

import { cn } from '@/lib/utils';

import Image from 'next/image';
// import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import { useSpidexCoreContext } from '@/app/_contexts';
const ChatInput: React.FC = () => {

    const { auth } = useSpidexCoreContext();

    const { input, setInput, onSubmit, isLoading, inputDisabledMessage } = useChat();

    const { onKeyDown } = useEnterSubmit({ onSubmit: onSubmit })

    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!isLoading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLoading]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className={cn(
                // Base styles
                "w-full rounded-md flex flex-col overflow-hidden transition-colors duration-200 ease-in-out border border-transparent shadow-none",
                // Light mode styles
                "bg-neutral-100 focus-within:border-brand-600",
                // Dark mode styles
                "dark:bg-neutral-700/50 dark:focus-within:border-brand-600",
                isLoading && "opacity-50 cursor-not-allowed"
            )}
        >
            <OptionalTooltip text={inputDisabledMessage}>
                <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Ask the spidex anything..."
                    className={cn(
                        "w-full max-h-60 resize-none bg-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 dark:placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50",
                        "focus-visible:outline-none",
                        "dark:placeholder:text-neutral-400",
                    )}
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                    }}
                    disabled={isLoading || !auth?.user || inputDisabledMessage !== ''}
                    autoFocus
                />
            </OptionalTooltip>
            <div className="flex items-center justify-between px-2 pb-2">
                {/* <ModelSelector
                    model={model}
                    onModelChange={setModel}
                    disabled={isLoading}
                /> */}
                <div></div>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button 
                                type="submit" 
                                size="icon" 
                                disabled={input.trim() === '' || isLoading || !auth?.user}
                                variant="ghost"
                                className="h-8 w-8"
                            >
                                <Image src="/icons/send-gray.svg" alt="send" width={20} height={20} />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </form>
    );
};

const OptionalTooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {

    if(text === '') return children;

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent side="top">{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ChatInput;