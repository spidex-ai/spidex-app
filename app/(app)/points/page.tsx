'use client';
import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import React from 'react';
import History from './_components/history';
import Missions from './_components/missions';
import PointInformation from './_components/point-information';
import { usePointHistory, usePointInfo } from '@/hooks/point/use-point';

const PointsPage: React.FC = () => {
  const pointHistoryHook = usePointHistory(); 
  const pointInfoHook = usePointInfo();
    // Function để handle khi mission complete
    const handleMissionComplete = async () => {
      await pointHistoryHook.refetchPointHistory();
      await pointInfoHook.refetchPointInfo();
    };

  return (
    <ProtectedClient>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/points-white.svg"
            alt="points"
            width={5}
            height={5}
            className="w-6 h-6"
          />
          <TextGradient className="text-2xl font-medium leading-none">
            Dashboard
          </TextGradient>
        </div>

        <PointInformation pointInfoHook={pointInfoHook} />

        <Missions  onMissionComplete={handleMissionComplete} />
        <History pointHistoryHook={pointHistoryHook} />
      </div>
    </ProtectedClient>
  );
};

export default PointsPage;
