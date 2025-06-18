'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Message, useChat as useAiChat } from 'ai/react';

import { Models } from '@/types/models';

import {
  CARDANO_DEPOSIT_LIQUIDITY_NAME,
  CARDANO_GET_WALLET_ADDRESS_NAME,
  CARDANO_STAKE_NAME,
  CARDANO_TRADE_NAME,
  CARDANO_TRANSFER_NAME,
  CARDANO_UNSTAKE_NAME,
  CARDANO_WITHDRAW_LIQUIDITY_NAME,
} from '@/ai/action-names';

import { useSpidexCoreContext } from '@/app/_contexts';
import type { TokenChatData } from '@/types';
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
  resetChat: () => void;
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
  resetChat: () => {},
  inputDisabledMessage: '',
});

interface ChatProviderProps {
  token: TokenChatData;
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  token,
  children,
}) => {
  const { auth } = useSpidexCoreContext();

  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [model, setModel] = useState<Models>(Models.OpenAI);

  const resetChat = () => {
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
    api: `/api/chat/token`,
    body: {
      model,
      modelName: model,
      userId: auth?.user?.id,
      token,
    },
  });

  const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
    addToolResultBase({
      toolCallId,
      result,
    });
  };

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
        resetChat,
        inputDisabledMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
