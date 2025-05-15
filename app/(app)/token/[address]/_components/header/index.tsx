"use client";

import React from "react";

import { Skeleton } from "@/components/ui";

import Address from "@/app/_components/address";

import SaveToken from "@/app/(app)/_components/save-token";
import { getLogoUrl } from "@/app/utils/logo";
import { CardanoTokenDetail } from "@/services/dexhunter/types";
import SearchBar from "../../../_components/search-bar";
import Image from "next/image";
import { QuoteType } from "./select-quote";
import SelectQuote from "./select-quote";
interface Props {
  data: CardanoTokenDetail | null;
  isLoading: boolean;
  isSearch?: boolean;
  quote: QuoteType;
  onQuoteChange: (quote: QuoteType) => void;
}

const Header: React.FC<Props> = ({
  data,
  isLoading,
  isSearch = false,
  quote,
  onQuoteChange,
}) => {
  if (isLoading) {
    return <Skeleton className="h-6 w-full" />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
      <div className="flex items-center gap-2 mt-1">
        {data?.logo && (
          <img
            src={getLogoUrl(data.logo)}
            alt={data?.unit ? data.unit : data?.token_ascii}
            className="w-6 h-6 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {/* <h1 className="text-lg font-bold">({`${data?.ticker}/USD`})</h1> */}
            <SelectQuote
              quote={quote}
              token={data?.ticker ?? ""}
              onQuoteChange={onQuoteChange}
            />
            <Address address={data?.unit ?? ""} />
          </div>
        </div>
        <SaveToken address={data?.unit ?? ""} />
        {isSearch && <SearchBar isTitle={false} />}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          window.open("https://farmroll.io", "_blank");
        }}
      >
        <Image
          src="/icons/banner-chat-ads.svg"
          alt="info"
          width={485}
          height={61}
        />
      </div>
    </div>
  );
};

export default Header;
