'use client';

import React, { useState } from 'react';

import { ChevronDown, Loader2, Trash2 } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  Skeleton,
  Icon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui';

import { useUserChats } from '@/hooks';

import { useChat } from '../../../chat/_contexts/chat';

import { cn } from '@/lib/utils';

import Image from 'next/image';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

const ChatsGroup: React.FC = () => {
  const pathname = usePathname();

  const { isMobile, setOpenMobile } = useSidebar();

  const { auth } = useSpidexCore();

  const { chats, isLoading, mutate } = useUserChats();

  const { setChat, chatId, resetChat } = useChat();

  const [isOpen, setIsOpen] = useState(false);

  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);

  const handleDelete = async (deletedChatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.user || deletingChatId) return;

    setDeletingChatId(deletedChatId);

    try {
      const response = await fetch(`/api/chats/${deletedChatId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (response.ok) {
        mutate(chats.filter(chat => chat.id !== deletedChatId));

        if (deletedChatId === chatId) {
          resetChat();
          if (isMobile) {
            setOpenMobile(false);
          }
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    } finally {
      setDeletingChatId(null);
    }
  };

  const isActive = pathname.includes('/chat');

  const handleMainChatClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleChatItemClick = (chatId: string) => {
    setChat(chatId);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Collapsible
      className="group/collapsible"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="justify-between w-full"
            isActive={isActive}
          >
            <div className="flex items-center justify-between w-full">
              <Link
                href="/chat"
                onClick={handleMainChatClick}
                className="flex items-center gap-2 flex-1"
              >
                {isActive ? (
                  <Image
                    src="/icons/chat-blink.svg"
                    alt="Chats"
                    width={20}
                    height={20}
                    className="h-4 w-4"
                  />
                ) : (
                  <Image
                    src="/icons/chat.svg"
                    alt="Chats"
                    width={20}
                    height={20}
                    className="h-4 w-4"
                  />
                )}
                <h1 className="text-sm font-semibold">Chats</h1>
              </Link>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    resetChat();
                    if (isMobile) {
                      setOpenMobile(false);
                    }
                  }}
                  className="h-fit w-fit p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-md"
                >
                  <Icon name="Plus" />
                </div>
                <ChevronDown className="h-[14px] w-[14px] transition-transform group-data-[state=open]/collapsible:rotate-180 text-neutral-500 dark:text-neutral-500" />
              </div>
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="flex-1 overflow-hidden relative flex flex-col">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : chats.length > 0 ? (
              chats.map(chat => (
                <SidebarMenuSubItem key={chat.id} className="group/chat">
                  <SidebarMenuSubButton
                    isActive={chat.id === chatId}
                    className="flex items-center justify-between w-full"
                  >
                    <Link
                      href={`/chat`}
                      className="flex-1 truncate"
                      onClick={() => handleChatItemClick(chat.id)}
                    >
                      <span className="truncate">{chat.tagline}</span>
                    </Link>
                    <div
                      onClick={e => handleDelete(chat.id, e)}
                      className={cn(
                        'size-6 shrink-0 dark:hover:bg-neutral-700 hover:bg-neutral-200 rounded-md transition-all duration-300 flex items-center justify-center opacity-0 group-hover/chat:opacity-100',
                        deletingChatId === chat.id &&
                          'opacity-50 pointer-events-none'
                      )}
                    >
                      {deletingChatId === chat.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4 text-red-600" />
                      )}
                    </div>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            ) : auth?.user ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
                No chats found
              </p>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
                Sign in to view your chats
              </p>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default ChatsGroup;
