

import { Skeleton } from "@/components/ui";
import dynamic from "next/dynamic";

const PortfolioWapper = dynamic(() => import('./portfolio'), { ssr: false, loading: () => <Skeleton className="w-full h-full" /> });

export default PortfolioWapper;
