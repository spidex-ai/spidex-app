'use client';

import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import { EEventStatus, useEvent } from '@/hooks/events/use-event';
import { useState } from 'react';
import { GradientBorderButton, GradientButton, Skeleton } from '@/components/ui';
import EventCard from './_components/event-card';
const statuses = Object.values(EEventStatus);

const EventPage: React.FC = () => {
  const [status, setStatus] = useState<EEventStatus>(EEventStatus.LIVE);
  const { events, loading } = useEvent(status);


  return (
    <ProtectedClient>
      <div className="relative h-full max-h-full">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1 pr-4">
          <div className="md:flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/event-blink.svg"
                alt="event"
                width={5}
                height={5}
                className="w-4 h-4 md:w-6 md:h-6"
              />
              <TextGradient className="text-xl md:text-3xl font-medium leading-none">
                Event
              </TextGradient>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 md:mt-0">
              {statuses.map(item => (
                <div key={item} onClick={() => setStatus(item)} className="cursor-pointer md:w-32">
                  {
                    item === status ? (
                      <GradientButton className="md:py-2 py-2 capitalize font-medium md:text-base text-sm w-full">
                        {item}
                      </GradientButton>
                    ) : (
                      <GradientBorderButton className="capitalize w-full md:text-base text-sm">
                        {item}
                      </GradientBorderButton>
                    )
                  }
                </div>
              ))}
            </div>
          </div>

          {
            loading ? (
              <div className="">
                <Skeleton className="h-20 w-full" />
              </div>
            ) : events?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-10 md:mb-2">
                {events.map(event => (
                  <EventCard key={event.id} item={event} />
                ))}
              </div>
            ) : (
              <div>No event found</div>
            )
          }

          {/* {selectedEvent && (
            <>
              <Summary
                events={events}
                loading={loading}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
              />
              <Rank id={selectedEvent?.id} />
            </>
          )} */}
        </div>
      </div>
    </ProtectedClient>
  );
};

export default EventPage;
