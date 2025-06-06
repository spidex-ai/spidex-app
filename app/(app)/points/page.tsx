'use client'
import ProtectedClient from "@/app/components/protected-client";
import { TextGradient } from "@/components/ui/text";
import Image from "next/image";
import React from "react";
import History from "./_components/history";
import Missions from "./_components/missions";
import PointInformation from "./_components/point-information";


const PointsPage: React.FC = () => {
  return (
    <ProtectedClient>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
        <div className="flex items-center gap-2">
          <Image src="/icons/points-white.svg" alt="points" width={5} height={5} className='w-6 h-6' />
          <TextGradient className="text-2xl font-medium leading-none">Dashboard</TextGradient>
        </div>

        <PointInformation />

        <Missions />
        <History />
      </div>
    </ProtectedClient>
  );
};

export default PointsPage;
