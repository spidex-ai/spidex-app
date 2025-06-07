'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';

const ReminderModal = dynamic(() => import('./reminder-modal'), {
  ssr: false,
  loading: () => <Skeleton className="w-screen h-screen" />,
});
type ReminderModalWrapperProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};
export default function ReminderModalWrapper({
  isOpen,
  onOpenChange,
}: ReminderModalWrapperProps) {
  return <ReminderModal isOpen={isOpen} onOpenChange={onOpenChange} />;
}
