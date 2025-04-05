"use client";

import React, { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui";

import Address from "@/app/_components/address";

// import Links from "./token-links";

import { useTokenDetail } from "@/hooks";
import SaveToken from "@/app/(app)/_components/save-token";
import { getLogoUrl } from "@/app/utils/logo";
import { TokenDetail } from "@/services/dexhunter/types";

interface Props {
  address: string;
}

const Header: React.FC<Props> = ({ address }) => {
  const [data, setData] = useState<TokenDetail | null>(null);
  const { isLoading, getTokenDetail } = useTokenDetail();

  useEffect(() => {
    fetchTokenDetail();
  }, [address]);

  const fetchTokenDetail = async () => {
    const data = await getTokenDetail(address);
    if (data) {
      setData(data);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-6 w-full" />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex items-center gap-2">
        {data?.logo && (
          <img
            src={getLogoUrl(data.logo)}
            alt={data.token_ascii}
            className="w-6 h-6 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">
              {data?.token_ascii} ({data?.ticker})
            </h1>
            <Address address={data?.token_id ?? ""} />
          </div>
        </div>
        <SaveToken address={data?.token_id ?? ""} />
      </div>
      {/* {
                tokenOverview.extensions && (
                    <Links extensions={tokenOverview.extensions} />
                )
            } */}
    </div>
  );
};

export default Header;
