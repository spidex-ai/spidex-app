'use client';

import { Skeleton } from '@/components/ui';
import { usePointInfo } from '@/hooks/point/use-point';
import dynamic from 'next/dynamic';

const PointInformationWrapper = dynamic(
  () => import('./point-information-wrapper'),
  { ssr: false, loading: () => <Skeleton className="w-full h-[100px]" /> }
);

interface Props {
  pointInfoHook: ReturnType<typeof usePointInfo>;
}

export default function PointInformation({ pointInfoHook }: Props) {
  return <PointInformationWrapper pointInfoHook={pointInfoHook} />;
}
