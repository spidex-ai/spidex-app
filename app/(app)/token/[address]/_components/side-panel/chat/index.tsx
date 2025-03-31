'use client'

import React from 'react'

import ChatInput from './input'

import Messages from './messages'
import EmptyChat from './empty'

import { useChat } from '../../../_contexts'

import { TokenChatData } from '@/types'

interface Props {
    token: TokenChatData
}

const Chat: React.FC<Props> = ({ token }) => {

    const { messages } = useChat();

    return (
        <div className="h-full w-full flex flex-col items-center relative">
            <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-4xl">
                <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
                    {
                        messages.length > 0 ? (
                            <>
                                <Messages token={token} />
                                <ChatInput />
                            </>
                        ) : (
                            <EmptyChat token={token} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat