import React from 'react'

import Link from 'next/link';

import { FaDiscord, FaXTwitter } from 'react-icons/fa6';

import {
    Sidebar as SidebarUI, 
    SidebarHeader, 
    SidebarContent, 
    SidebarInset,
    SidebarFooter,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
    SidebarMenu as SidebarMenuUI,
    useSidebar,
} from '@/components/ui'

import AuthButton from './auth-button';
import Logo from './logo';
import SidebarMenu from './sidebar-menu';

import OpenSidebarTrigger from './open-sidebar-trigger';
import ClosedSidebarTrigger from './closed-sidebar-trigger';
// import ColorModeToggle from './color-mode-toggle';
import MobileNavbar from './mobile-navbar';
import Image from 'next/image'

interface Props {
    children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {


    return (
        <>
            <SidebarUI variant="inset" collapsible='icon'>
                <SidebarHeader>
                    <div className="flex items-center justify-between">
                        <Logo />
                        <div className="flex items-center gap-2">
                            {/* <ColorModeToggle /> */}
                            <OpenSidebarTrigger />
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent className="relative">
                    <SidebarMenu />
                </SidebarContent>
                <SidebarSeparator />
                <SidebarFooter>
                    <SidebarMenuUI>
                        <AuthButton />
                        <SidebarMenuItem>
                            <SidebarMenuButton 
                                asChild 
                            >
                                <Link 
                                    href={process.env.NEXT_PUBLIC_X_URL || ''} 
                                    target={'_blank'}
                                >
                                    <Image src="/icons/x-white.svg" alt="twitter" width={15} height={15} />
                                    <span className='truncate'>Follow Us</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton 
                                asChild 
                            >
                                <Link 
                                    href={process.env.NEXT_PUBLIC_TELEGRAM_URL || ''} 
                                    target={'_blank'}
                                >
                                    <Image src="/icons/tele-white.svg" alt="telegram" width={15} height={15} />
                                    <span className='truncate'>Join Telegram</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenuUI>
                </SidebarFooter>
            </SidebarUI>
            <SidebarInset>
                <div className="p-2 pt-0 md:p-4 flex-1 h-0 overflow-y-hidden relative flex flex-col">
                    <ClosedSidebarTrigger />
                    <MobileNavbar />
                    {children}
                </div>
            </SidebarInset>
        </>
    )
}

export default Sidebar;