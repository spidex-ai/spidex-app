'use client';

import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import Summary from './_components/summary';

const EventPage: React.FC = () => {
  return (
    <ProtectedClient>
      <div className="relative h-full max-h-full">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
        <div className="flex items-center gap-2">
            <Image
              src="/icons/event-blink.svg"
              alt="event"
              width={5}
              height={5}
              className="w-4 h-4 md:w-6 md:h-6"
            />
            <TextGradient className="text-xl md:text-3xl font-medium leading-none">
                All Competions
            </TextGradient>
          </div>

          <Summary />
        </div>
      </div>
    </ProtectedClient>
  );
};

export default EventPage;