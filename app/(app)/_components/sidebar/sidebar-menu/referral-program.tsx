'use client'

import React from 'react'

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import Image from 'next/image';


const RefferalProgram: React.FC = () => {
    const pathname = usePathname();

    return (
        <Link href='/referral'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={pathname?.includes('/referral') ?? false}
                >
                    <h1 className="flex items-center gap-2 font-semibold">
                        <Image 
                            src={'/icons/ref-white.svg'} 
                            width={5}
                            height={5}
                            alt="ref-program"
                            className='w-4 h-4'
                        />
                        Referral Program
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
    
}

export default RefferalProgram;
