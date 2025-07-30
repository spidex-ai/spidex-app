'use client';

import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import Summary from './_components/summary';
import { useEvent } from '@/hooks/events/use-event';
import Rank from './_components/rank';
import { useEffect, useState } from 'react';
import { EventItem } from '@/hooks/events/type';

const EventPage: React.FC = () => {
  const { events, loading } = useEvent();
  console.log('🚀 ~ EventPage ~ events:', events);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, [events]);

  return (
    <ProtectedClient>
      <div className="relative h-full max-h-full">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
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

          {selectedEvent && (
            <>
              <Summary
                events={events}
                loading={loading}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
              />
              <Rank id={selectedEvent?.id} />
            </>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
};

export default EventPage;
