"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usePointHistory } from "@/hooks/point/use-point";
import React from "react";
import Image from "next/image";

import { PointHistory } from "@/hooks/point/type";
import { formatSILK } from "@/app/utils/format";
import Pagination from "@/app/(app)/_components/pagination";

interface HistoryItem {
  task: string;
  point: string;
  isBorderBottom: boolean;
  createdAt: string;
}

const Hisotry = () => {
  const {
    pointHistory,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePointHistory();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const results: HistoryItem[] =
    pointHistory.length > 0
      ? pointHistory.map((item: PointHistory, index: number) => {
          const date = new Date(item.createdAt);
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const month = date.toLocaleString("en-US", { month: "short" });
          const year = date.getFullYear();
          return {
            task: item.questName,
            point: item.amount,
            createdAt: `${hours}:${minutes} ${day}-${month}-${year}`,
            isBorderBottom: index !== pointHistory.length - 1,
          };
        })
      : [];
  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary p-10">
      <div className="">
        <div className="text-[28px] font-medium text-white">SILK History</div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="grid grid-cols-3 border-b border-border-main py-6 text-text-gray text-base">
          <div className="col-span-1 flex items-center gap-2">Earned</div>
          <div className="col-span-1 flex items-center justify-center gap-2">
            Task completed
          </div>
          <div className="col-span-1 flex items-center justify-center gap-2">
            Date & Time
          </div>
        </div>
        <div>
          {loading ? (
            <Skeleton className="w-full h-[100px]" />
          ) : (
            <div>
              {results.length > 0 ? (
                results.map((result) => (
                  <div
                    key={result.task}
                    className={`grid grid-cols-3 text-sm ${
                      result.isBorderBottom
                        ? "border-b border-border-main py-6"
                        : "pt-6"
                    }`}
                  >
                    <div className="col-span-1 flex items-center gap-2">
                      <div>+ {formatSILK(result.point)}</div>
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
                ))
              ) : (
                <div className="text-center text-text-gray mt-8">No data.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <Pagination
          total={totalPages}
          current={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Hisotry;
