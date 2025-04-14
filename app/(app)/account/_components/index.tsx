import { Skeleton } from '@/components/ui'
import dynamic from 'next/dynamic'

const AccountWrapper = dynamic(() => import('./account-wrapper'), { ssr: false, loading: () => <Skeleton className="w-full h-full" /> })

export default function Account() {
    return <AccountWrapper />
}