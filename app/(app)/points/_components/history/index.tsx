"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usePointHistory } from "@/hooks/point/use-point";
import React from "react";
import Image from "next/image";

import { PointHistory } from "@/hooks/point/type";

interface HistoryItem {
  task: string;
  point: string;
  isBorderBottom: boolean;
  createdAt: string;
}

const Hisotry = () => {
  const { pointHistory, loading, error } = usePointHistory();
  console.log("🚀 ~ Missions ~ hisotory:", pointHistory);

  if (loading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const results: HistoryItem[] = pointHistory.map(
    (item: PointHistory, index: number) => {
      return {
        task: item.questName,
        point: item.amount,
        createdAt: item.createdAt,
        isBorderBottom: index !== pointHistory.length - 1,
      };
    }
  );
  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary p-10">
      <div className="">
        <div className="text-2xl font-bold text-white">SILK History</div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="grid grid-cols-3 border-b border-border-main py-6 text-text-gray">
          <div className="col-span-1 flex items-center gap-2">Earned</div>
          <div className="col-span-1 flex items-center justify-center gap-2">
            Task completed
          </div>
          <div className="col-span-1 flex items-center justify-center gap-2">
            Date & Time
          </div>
        </div>
        <div>
          {results.map((result) => (
            <div
              key={result.task}
              className={`grid grid-cols-3  ${
                result.isBorderBottom
                  ? "border-b border-border-main py-6"
                  : "pt-6"
              }`}
            >
              <div className="col-span-1 flex items-center gap-2">
                <div>+{Number(result.point).toFixed(2)}</div>
                <div>
                  <Image
                    src="/icons/logo-gray.svg"
                    alt="arrow-right"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="col-span-1 text-white flex items-center justify-center gap-1">
                <div>{result.task}</div>
              </div>
              <div className="col-span-1 text-white flex items-center justify-center">
                <div>{result.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hisotry;
