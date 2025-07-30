'use client';
import { GradientButton, Skeleton } from '@/components/ui';
import { EventItem, EventStatus } from '@/hooks/events/type';
import { formatNumber } from '@/lib/utils';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface SummaryProps {
  events: EventItem[];
  loading: boolean;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem) => void;
}
const slideProperties = {
  duration: 3000,
  autoplay: true,
  transitionDuration: 500,
  arrows: true,
  infinite: true,
  easing: 'ease',
  prevArrow: (
    <button className={``}>
      <img src="/icons/arrow-left.svg" alt="arrow-left" className="w-4 h-4" />
    </button>
  ),
  nextArrow: (
    <button className={``}>
      <img src="/icons/arrow-right.svg" alt="arrow-right" className="w-4 h-4" />
    </button>
  ),
  slidesToShow: 3,
  cssClass: 'mx-4',
};

const Summary: React.FC<SummaryProps> = ({
  events,
  loading,
  selectedEvent,
  setSelectedEvent,
}) => {
  const date = useMemo(() => {
    if (!selectedEvent) return;
    const { startDate, endDate } = selectedEvent;
    if (dayjs(startDate).isAfter(dayjs())) {
      return {
        status: EventStatus.UPCOMING,
        time: startDate,
      };
    }
    if (dayjs(endDate).isBefore(dayjs())) {
      return {
        status: EventStatus.ENDED,
        time: endDate,
      };
    }
    return {
      status: EventStatus.LIVE,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      start: startDate,
      end: endDate,
    };
  }, [selectedEvent]);

  if (loading || !selectedEvent) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div className="">
      <div className="w-full border border-gray-500 rounded-md  py-7 px-16">
        <div className="">
          <div className="flex gap-20">
            <div className="rounded-lg">
              <img
                src={selectedEvent?.icon ?? '/icons/competition.svg'}
                alt="com-1"
                className="w-52 h-52 rounded-lg"
              />
            </div>
            <div>
              <div className="flex gap-4">
                <div
                  className={`text-sm font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.UPCOMING ? 'text-black bg-[#009EFF]' : 'text-white bg-[#233857]'}`}
                >
                  Incoming
                </div>
                <div
                  className={`text-sm font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.LIVE ? 'text-black bg-[#BBF985]' : 'text-white bg-[#233857]'}`}
                >
                  Going on
                </div>
                <div
                  className={`text-sm font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.ENDED ? 'text-white bg-[#FF6666]' : 'text-white bg-[#233857]'}`}
                >
                  Ended
                </div>
              </div>

              <div className="text-[28px] font-medium mt-3">
                {selectedEvent?.name}
              </div>
              <div className="text-sm text-gray-500">
                {selectedEvent?.description}
              </div>
              <div className="my-5">
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedEvent?.tradeToken?.logo}
                        alt="ada-1"
                        className="w-12 h-12 rounded-full border border-green-500"
                      />
                    </div>
                    <div>
                      <div className="text-[28px] font-medium">
                        {formatNumber(Number(selectedEvent?.totalPrize))}
                      </div>
                      <div className="flex gap-1 items-center">
                        <div>
                          <img
                            src="/icons/prize.svg"
                            alt="prize"
                            className="w-3 h-3"
                          />
                        </div>
                        <div className="text-sm pt-1">
                          Total Prize Pool (ADA)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-white mx-3"></div>
                  <div>
                    <div className="text-[28px] font-medium">
                      {formatNumber(Number(selectedEvent?.totalVolumeTraded))}
                    </div>
                    <div className="flex gap-1 items-center">
                      <div>
                        <img
                          src="/icons/user.svg"
                          alt="user"
                          className="w-3 h-3"
                        />
                      </div>
                      <div className="text-sm pt-1">Total Volume</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-lg text-text-10 mt-3 font-medium">
                <GradientButton
                  className="font-medium"
                  onClick={() => window.open(selectedEvent?.url, '_blank')}
                >
                  View Details
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="col-span-full">
          <Slide {...slideProperties}>
            {events.map((event, index) => (
              <div
                key={index}
                className="each-slide cursor-pointer rounded-xl mx-2"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center gap-2 p-2 border border-gray-500 rounded-lg">
                  <div>
                    <img
                      src={event.icon}
                      alt={event.name}
                      className="w-20 h-20 min-w-20 object-cover mx-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-white text-sm">
                      {event.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {event.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Summary;
