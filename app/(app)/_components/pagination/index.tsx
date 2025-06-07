'use client'

import { Skeleton } from '@/components/ui'
import dynamic from 'next/dynamic'

const PaginationWrapper = dynamic(
  () => import('./pagination-wrapper'),
  { ssr: false, loading: () => <Skeleton className="w-full h-[100px]" /> } 
)

interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ total, current, onPageChange }: Props) {
  return <PaginationWrapper total={total} current={current} onPageChange={onPageChange} />;
}
