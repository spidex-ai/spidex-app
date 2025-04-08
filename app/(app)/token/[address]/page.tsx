'use client'
import React, { Suspense, use } from "react";
import { Skeleton } from "@/components/ui";

import TokenChart from "../../_components/token/chart";
import Header from "./_components/header";
import TokenDashboardTabs from "./_components/tabs";
import SidePanel from "./_components/side-panel";
import ResizableLayout from "./_components/resizable-layout";
import { useTokenDetail } from "@/hooks";

type tParams = Promise<{ address: string }>;

const TokenPage = ({ params }: { params: tParams }) => {
    const { address } = use(params);
    const {data} = useTokenDetail(address);
    console.log('data tokeen:::', data);
    return (
        <div className="flex flex-col gap-2 h-full max-h-full overflow-hidden">
            <Header address={address} />
            <ResizableLayout 
                chartComponent={<TokenChart mint={address} data={data} />}
                tabsComponent={
                    <Suspense fallback={<Skeleton className="h-full w-full m-2" />}>
                        <TokenDashboardTabs address={address} data={data} />
                    </Suspense>
                }
                sidePanelComponent={<SidePanel address={address} data={data} />}
                // tabsComponent={<div></div>}
                // sidePanelComponent={<div></div>}
            />
        </div>
    );
};

export default TokenPage;