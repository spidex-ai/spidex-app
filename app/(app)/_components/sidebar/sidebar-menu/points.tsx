'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import Image from 'next/image';
const Points: React.FC = () => {

    const pathname = usePathname();

    return (
        <Link href='/points'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={pathname?.includes('/points') ?? false}
                >
                    <h1 className="flex items-center gap-2 font-semibold">
                        <Image 
                            src={'/icons/points-white.svg'} 
                            width={5}
                            height={5}
                            alt="points"
                            className='w-4 h-4'
                        />
                        Points
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link> 
    )
}

export default Points;