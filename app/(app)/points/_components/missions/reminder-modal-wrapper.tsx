'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui'

const ReminderModal = dynamic(
  () => import('./reminder-modal'),
  { 
    ssr: false,
    loading: () => <Skeleton className="w-screen h-screen" />
  }
)

export type Platform = 'X' | 'Telegram' | 'Discord'

type ReminderModalWrapperProps = {  
    isOpen: boolean 
    onOpenChange: (isOpen: boolean) => void 
    platform: Platform
}
export default function ReminderModalWrapper({ isOpen, onOpenChange, platform }: ReminderModalWrapperProps) {
  return <ReminderModal isOpen={isOpen} onOpenChange={onOpenChange} platform={platform} />
}