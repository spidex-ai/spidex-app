"use client";

import React from "react";

import { Skeleton } from "@/components/ui";

import Address from "@/app/_components/address";


import SaveToken from "@/app/(app)/_components/save-token";
import { getLogoUrl } from "@/app/utils/logo";
import { CardanoTokenDetail } from "@/services/dexhunter/types";

interface Props {
    data: CardanoTokenDetail | null;
    isLoading: boolean;
}

const Header: React.FC<Props> = ({ data, isLoading }) => {


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
    </div>
  );
};

export default Header;
