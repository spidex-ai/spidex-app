'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';

const SharePostModal = dynamic(() => import('./share-post-modal'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[20px]" />,
});
type SharePostModalWrapperProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refCode: string;
};
export default function SharePostModalWrapper({
  isOpen,
  onOpenChange,
  refCode,
}: SharePostModalWrapperProps) {
  return (
    <SharePostModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      refCode={refCode}
    />
  );
}
