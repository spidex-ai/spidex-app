'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { Message, useChat as useAiChat } from 'ai/react';
import { Models } from '@/types/models';
import { generateId } from 'ai';
import { useUserChats } from '@/hooks';

import {
  CARDANO_STAKE_NAME,
  CARDANO_TRANSFER_NAME,
  CARDANO_UNSTAKE_NAME,
  CARDANO_TRADE_NAME,
  CARDANO_WITHDRAW_LIQUIDITY_NAME,
  CARDANO_GET_WALLET_ADDRESS_NAME,
  CARDANO_DEPOSIT_LIQUIDITY_NAME,
} from '@/ai/action-names';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';
export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

// Define a type for tool results
type ToolResult<T> = {
  message: string;
  body?: T;
};

interface ChatContextType {
  messages: Message[];
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
  const { auth } = useSpidexCore();

  const [chatId, setChatId] = useState<string>(generateId());
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [model, setModel] = useState<Models>(Models.OpenAI);

  const { mutate } = useUserChats();

  const setChat = async (chatId: string) => {
    setChatId(chatId);
    const chat = await fetch(`/api/chats/${chatId}`, {
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    });
    const chatData = await chat.json();
    if (chatData) {
      setMessages(chatData.messages);
    }
  };

  const resetChat = () => {
    setChatId(generateId());
    setMessages([]);
  };

  const {
    messages,
    input,
    setInput,
    append,
    isLoading,
    addToolResult: addToolResultBase,
    setMessages,
  } = useAiChat({
    maxSteps: 20,
    onResponse: () => {
      setIsResponseLoading(false);
    },
    api: '/api/chat/cardano',
    body: {
      model,
      modelName: model,
      userId: auth?.user?.id,
      chatId,
    },
  });

  const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
    addToolResultBase({
      toolCallId,
      result,
    });
  };

  useEffect(() => {
    const updateChat = async () => {
      if (messages.length > 0 && !isLoading) {
        const response = await fetch(`/api/chats/${chatId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          body: JSON.stringify({
            messages,
          }),
        });
        const data = await response.json();
        if (typeof data === 'object') {
          mutate();
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
  };

  const sendMessage = async (message: string) => {
    setIsResponseLoading(true);
    await append({
      role: 'user',
      content: message,
    });
  };

  const inputDisabledMessage = useMemo(() => {
    if (messages.length === 0) return '';
    const lastMessage = messages[messages.length - 1];
    let message = lastMessage.toolInvocations
      ?.map(toolInvocation => {
        if (toolInvocation.state === 'result') return '';
        const toolName = toolInvocation.toolName.slice(
          toolInvocation.toolName.indexOf('-') + 1
        );
        console.log("🚀 ~ inputDisabledMessage ~ toolName:", toolName)
        switch (toolName) {
          case CARDANO_TRADE_NAME:
            return `Complete or cancel your trade`;
          case CARDANO_TRANSFER_NAME:
            return `Complete or cancel your transfer`;
          case CARDANO_STAKE_NAME:
            return `Complete or cancel your stake`;
          case CARDANO_UNSTAKE_NAME:
            return `Complete or cancel your unstake`;
          case CARDANO_DEPOSIT_LIQUIDITY_NAME:
            return `Complete or cancel your deposit`;
          case CARDANO_WITHDRAW_LIQUIDITY_NAME:
            return `Complete or cancel your withdraw`;
          case CARDANO_GET_WALLET_ADDRESS_NAME:
            return `Connect your wallet`;
          default:
            return '';
        }
      })
      .filter(message => message !== '')
      .join(' and ');
    if (message) {
      message = message?.concat(' to continue');
    }
    return message || '';
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
