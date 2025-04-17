'use client'

import { Skeleton } from "@/components/ui"
import dynamic from "next/dynamic"

const PointInformationWrapper = dynamic(() => import("./point-information-wrapper"), { ssr: false, loading: () => <Skeleton className="w-full h-[100px]" /> })

export default function PointInformation() {
  return <PointInformationWrapper />
}
