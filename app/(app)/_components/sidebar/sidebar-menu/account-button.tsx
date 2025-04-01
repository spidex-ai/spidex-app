'use client'

import React from 'react'

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import Image from 'next/image';

const AccountButton: React.FC = () => {

    const pathname = usePathname();

    return (
        <Link href='/account'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={pathname?.includes('/account') ?? false}
                >
                    <h1 className="flex items-center gap-2 font-semibold">
                        <Image 
                            src={'/icons/profile.svg'} 
                            width={5}
                            height={5}
                            alt="profile"
                            className='w-4 h-4'
                        />
                        Profile
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
}

export default AccountButton;