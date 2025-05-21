import React from 'react'

import { SidebarProvider } from '@/components/ui';

import Sidebar from './_components/sidebar';
import ExperimentalAlertDialog from './_components/experimental-alert-dialog';

import { ChatProvider } from './chat/_contexts/chat';
import { Toaster } from 'react-hot-toast';
interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <SidebarProvider>
            <ExperimentalAlertDialog />
            <ChatProvider>
                <Sidebar>
                    {children}
                </Sidebar>
            </ChatProvider>
            <Toaster 
                toastOptions={
                    {
                        success: {
                            style: {
                                background: '#1E293B',
                                color: '#62DA74',
                                borderRadius: '8px',
                                padding: '16px',
                                border: '2px solid rgba(98, 218, 116, 0.3)',
                                boxShadow: '0 4px 12px rgba(98, 218, 116, 0.1)',
                                backdropFilter: 'blur(12px)'
                            }
                        },
                        error: {
                            style: {
                                background: '#1E293B',
                                color: '#FF4D4F',
                                borderRadius: '8px',
                                padding: '16px',
                                border: '2px solid rgba(255, 77, 79, 0.3)',
                                boxShadow: '0 4px 12px rgba(255, 77, 79, 0.1)',
                                backdropFilter: 'blur(12px)'
                            }
                        },
                        position: 'top-right',
                        duration: 3000
                    }
                }
            />
        </SidebarProvider>
    )
}

export default Layout;