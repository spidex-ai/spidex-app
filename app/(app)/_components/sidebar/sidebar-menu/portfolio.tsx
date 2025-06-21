'use client';

import React from 'react';

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui';
import Image from 'next/image';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

const Portfolio: React.FC = () => {
  const pathname = usePathname();
  const { auth } = useSpidexCore();
  if (!auth?.user?.stakeAddress) return null;
  const isActive = pathname?.includes('/portfolio');
  return (
    <Link href={`/portfolio/${auth?.user?.stakeAddress}`}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/portfolio-blink.svg"
                alt="portfolio"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            ) : (
              <Image
                src="/icons/portfolio-white.svg"
                alt="portfolio"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            )}
            Portfolio
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Portfolio;
