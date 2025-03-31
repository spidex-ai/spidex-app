import { Models } from '@/types/models';
import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { useChat as useAiChat } from 'ai/react';
import { generateId } from 'ai';

type ToolResult<T> = {
    message: string;
    body?: T;
}


interface ChatContextType {
    messages: any[];
    input: string;
    setInput: (input: string) => void;
    onSubmit: () => Promise<void>;
    isLoading: boolean;
    sendMessage: (message: string) => void;
    addToolResult: <T>(toolCallId: string, result: ToolResult<T>) => void;
    isResponseLoading: boolean;
    model: Models;
    setModel: (model: Models) => void;
    setChat: (chatId: string) => void;
    resetChat: () => void;
    chatId: string;
    inputDisabledMessage: string;
}

const ChatContext = createContext<ChatContextType>({
    messages: [],
    input: '',
    setInput: () => {},
    onSubmit: async () => {},
    isLoading: false,
    sendMessage: () => {},
    isResponseLoading: false,
    addToolResult: () => {},
    model: Models.OpenAI,
    setModel: () => {},
    setChat: () => {},
    resetChat: () => {},
    chatId: '',
    inputDisabledMessage: '',
});

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    // const { user, getAccessToken } = usePrivy();

    const [chatId, setChatId] = useState<string>(generateId());
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const [model, setModel] = useState<Models>(Models.OpenAI);
    const [userId, setUserId] = useState<string>('');


    const setChat = async (chatId: string) => {
        setChatId(chatId);
        const chat = await fetch(`/api/chats/${chatId}`, {
            headers: {
                Authorization: `Bearer`,
            },
        });
        const chatData = await chat.json();
        if (chatData) {
            setMessages(chatData.messages);
            setUserId('')
        }
    }

    const resetChat = () => {
        setChatId(generateId());
        setMessages([]);
    }



    const { messages, input, setInput, append, isLoading, addToolResult: addToolResultBase, setMessages } = useAiChat({
        maxSteps: 20,
        onResponse: () => {
            setIsResponseLoading(false);
        },
        api: '/api/chat/solana',
        body: {
            model,
            modelName: model,
            userId: userId,
            chatId,
        },
    });

    useEffect(() => {
        const updateChat = async () => {
            if(messages.length > 0 && !isLoading) {
                const response = await fetch(`/api/chats/${chatId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer `,
                    },
                    body: JSON.stringify({
                        messages,
                    }),
                });
                const data = await response.json();
                if(typeof data === 'object') {
                }
            }
        };

        updateChat();
    }, [isLoading]);


    const onSubmit = async () => {
        if (!input.trim()) return;
        setIsResponseLoading(true);
        await append({
            role: 'user',
            content: input,
        });
        setInput('');
    }

    const sendMessage = async (message: string) => {
        setIsResponseLoading(true);
        await append({
            role: 'user',
            content: message,
        });
    }

    const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
        addToolResultBase({
            toolCallId,
            result,
        })
    }

    const inputDisabledMessage = useMemo(() => {
        if(messages.length === 0) return '';
        const lastMessage = messages[messages.length - 1];
        let message = lastMessage.toolInvocations?.map(toolInvocation => {
            if(toolInvocation.state === "result") return '';
            const toolName = toolInvocation.toolName.slice(toolInvocation.toolName.indexOf('-') + 1);
            switch(toolName) {
               
                default:
                    return '';
            }
        }).filter(message => message !== '').join(' and ');
        if(message) {
            message = message?.concat(' to continue');
        }
        return message || '';
    }, [messages])

    return (
        <ChatContext.Provider value={{ 
            messages, 
            input, 
            setInput, 
            onSubmit, 
            isLoading,
            sendMessage,
            isResponseLoading,
            addToolResult,
            model,
            setModel,
            setChat,
            resetChat,
            chatId,
            inputDisabledMessage,
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);