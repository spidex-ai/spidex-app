'use client';
import { useEventDetail } from '@/hooks/events/use-event';
import React, { use } from 'react';
import EventInfo from '../_components/event-info';
import Rank from '../_components/rank';
import Banner from '../_components/banner';
import { Skeleton } from '@/components/ui';

type tParams = Promise<{ id: string }>;

const EventDetailPage = ({ params }: { params: tParams }) => {
  const { id } = use(params);
  const { eventDetail, loading } = useEventDetail(id);
  return (
    <div>
      { loading && <Skeleton className="h-20 w-full" />}
      {eventDetail && <Banner eventDetail={eventDetail} />}

      {eventDetail && <EventInfo eventDetail={eventDetail} />}

      <div className="max-w-7xl mx-auto my-4">
        <div className="text-4xl font-medium my-8">Leaderboard</div>
        <div>
        <Rank id={+id} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
