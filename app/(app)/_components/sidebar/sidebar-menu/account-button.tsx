'use client'

import React from 'react'

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui';
import Image from 'next/image';

const AccountButton: React.FC = () => {

    const pathname = usePathname();
    const { open } = useSidebar();

    const isActive = pathname.includes('/account');
    return (
        <Link href='/account'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={pathname?.includes('/account') ?? false}
                >
                    <h1 className="flex items-center gap-2 font-semibold">
                        {
                            isActive ? (
                                <Image src="/icons/profile-blink.svg" alt="Profile" width={20} height={20} className='h-4 w-4'/>
                            ) : (
                                <Image src="/icons/profile.svg" alt="Profile" width={20} height={20} className='h-4 w-4'/>
                            )
                        }
                        {open && 'Profile'}
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
}

export default AccountButton;