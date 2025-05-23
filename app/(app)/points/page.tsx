'use client'
import React from "react";
import PointInformation from "./_components/point-information";
import Missions from "./_components/missions";
import History from "./_components/history";
import { TextGradient } from "@/components/ui/text";
import Image from "next/image";


const PointsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
      <div className="flex items-center gap-2">
        <Image src="/icons/points-white.svg" alt="points" width={5} height={5} className='w-4 h-4' />
        <TextGradient className="text-2xl font-bold leading-none">Dashboard</TextGradient>
      </div>

      <PointInformation />

      <Missions />
      <History />
    </div>
  );
};

export default PointsPage;
