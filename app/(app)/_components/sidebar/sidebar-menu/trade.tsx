'use client';

import React from 'react';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

const Trade: React.FC = () => {
  const pathname = usePathname();
  // const { auth } = useSpidexCore()

  // if(!auth?.user?.walletAddress) return null
  const tokenTrade =
    'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d';
  const isActive = pathname.includes(`/token/${tokenTrade}`);
  return (
    <Link href={`/token/${tokenTrade}?tab=trade`}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/trade-blink.svg"
                alt="trade"
                width={20}
                height={20}
                className="h-4 w-4"
              />
            ) : (
              <Image
                src="/icons/trade-white.svg"
                alt="trade"
                width={20}
                height={20}
                className="h-4 w-4"
              />
            )}
            Trade
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Trade;
