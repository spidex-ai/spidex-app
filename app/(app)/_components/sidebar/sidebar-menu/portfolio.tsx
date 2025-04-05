'use client'

import React from 'react'

// import { User } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import Image from 'next/image';


const Portfolio: React.FC = () => {
    const pathname = usePathname();
    const isActive = pathname?.includes('/portfolio');
    return (
        <Link href='/portfolio'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={isActive}
                >
                    <h1 className="flex items-center gap-2 font-semibold">
                        {
                            isActive ? (
                                <Image src="/icons/portfolio-blink.svg" alt="portfolio" width={5} height={5} className='w-4 h-4'/>
                            ) : (
                                <Image src="/icons/portfolio-white.svg" alt="portfolio" width={5} height={5} className='w-4 h-4'/>
                            )
                        }
                        Portfolio
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
    
}

export default Portfolio