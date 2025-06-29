'use client';

import ProtectedClient from '@/app/components/protected-client';
import Banner from './_components/banner';
import Rank from './_components/rank'; 
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';

const LeaderboardPage: React.FC = () => {
  return (
    <ProtectedClient>
      <div className="relative h-full max-h-full">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
        <div className="flex items-center gap-2">
            <Image
              src="/icons/leaderboard-white.svg"
              alt="points"
              width={5}
              height={5}
              className="w-6 h-6"
            />
            <TextGradient className="text-3xl font-medium leading-none">
              Leaderboard
            </TextGradient>
          </div>

          <Banner />
          <Rank />
        </div>
      </div>
    </ProtectedClient>
  );
};

export default LeaderboardPage;
