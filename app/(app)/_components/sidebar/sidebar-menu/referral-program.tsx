'use client';

import React from 'react';

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import Image from 'next/image';

const RefferalProgram: React.FC = () => {
  const pathname = usePathname();

  const isActive = pathname?.includes('/referral');

  return (
    <Link href="/referral">
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/ref-blink.svg"
                alt="ref-program"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            ) : (
              <Image
                src="/icons/ref-white.svg"
                alt="ref-program"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            )}
            Referral Program
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default RefferalProgram;
