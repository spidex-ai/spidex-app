'use client';

import React, { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Skeleton,
  useSidebar,
} from '@/components/ui';

import { useSavedTokens } from '@/hooks';
import Image from 'next/image';
import SaveToken from '../../save-token';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';
const SavedTokensGroup: React.FC = () => {
  const pathname = usePathname();

  const { auth } = useSpidexCore();

  const { open: isSidebarOpen, isMobile, setOpenMobile } = useSidebar();

  const { savedTokens, isLoading } = useSavedTokens();

  const [isOpen, setIsOpen] = useState(false);
  const tokenTrade =
    'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d';
  const isActive =
    pathname.includes('/token') && !pathname.includes(`/token/${tokenTrade}`);

  const handleMainLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleSubLinkClick = () => {
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
                href="/token"
                onClick={handleMainLinkClick}
                className="flex items-center gap-2 flex-1"
              >
                {isActive ? (
                  <Image
                    src="/icons/token-blink.svg"
                    alt="Tokens"
                    width={20}
                    height={20}
                    className="h-4 w-4"
                  />
                ) : (
                  <Image
                    src="/icons/token-white.svg"
                    alt="Tokens"
                    width={20}
                    height={20}
                    className={`${!isSidebarOpen ? 'h-5 w-5' : 'h-4 w-4'}`}
                  />
                )}
                <h1 className="text-sm font-semibold">Tokens</h1>
                <Badge
                  variant="brandOutline"
                  className="text-[10px] h-5 w-fit px-1 rounded-md"
                >
                  New
                </Badge>
              </Link>
              <ChevronDown className="h-[14px] w-[14px] transition-transform group-data-[state=open]/collapsible:rotate-180 text-neutral-500 dark:text-neutral-500" />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="flex-1 overflow-hidden relative flex flex-col">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : savedTokens.length > 0 ? (
              savedTokens.map(savedToken => (
                <SidebarMenuSubItem key={savedToken.id}>
                  <SidebarMenuSubButton
                    isActive={pathname.includes(`/token/${savedToken.id}`)}
                    className="w-full flex items-center justify-between"
                  >
                    <Link
                      href={`/token/${savedToken.id}`}
                      className="flex-1 truncate"
                      onClick={handleSubLinkClick}
                    >
                      <span className="truncate">${savedToken.symbol}</span>
                    </Link>
                    <SaveToken
                      address={savedToken.id}
                      className="hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    />
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            ) : auth?.user ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2 py-1">
                No saved tokens
              </p>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
                Sign in to view your saved tokens
              </p>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default SavedTokensGroup;
