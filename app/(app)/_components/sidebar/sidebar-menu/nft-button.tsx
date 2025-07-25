'use client';

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui';
import Image from 'next/image';

const NftButton: React.FC = () => {
  const pathname = usePathname();
  const { open, isMobile, setOpenMobile } = useSidebar();

  const isActive = pathname.includes('/nft');

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link href="/nft" onClick={handleClick}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/nft') ?? false}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/nft-sidebar.svg"
                alt="NFT"
                width={20}
                height={20}
                className="h-4 w-4"
              />
            ) : (
              <Image
                src="/icons/nft-sidebar.svg"
                alt="NFT"
                width={20}
                height={20}
                className="h-4 w-4 opacity-70"
              />
            )}
            {open && 'NFT Collection'}
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default NftButton;
