'use client';
import { GradientButton, Skeleton } from '@/components/ui';
import { EventItem } from '@/hooks/events/type';
import { formatNumber } from '@/lib/utils';
import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SummaryProps {
  events: EventItem[];
  loading: boolean;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem) => void;
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  pauseOnHover: false,
  pauseOnFocus: true,
};

const Summary: React.FC<SummaryProps> = ({
  events, 
  loading,
  selectedEvent,
  setSelectedEvent,
}) => {

  if (loading || !selectedEvent) {
    return <Skeleton className="h-10 w-full" />;
  }


  return (
    <div className="flex gap-1">
      <div className="w-full border border-gray-500 rounded-md  py-6 px-6">
        <div className="">
          <div className="flex gap-6 pl-10">
            <div>
              <img
                src={selectedEvent?.icon ?? '/icons/competition.svg'}
                alt="com-1"
                className="w-52 h-52"
              />
            </div>
            <div>
              <div className="text-sm bg-bg-swap rounded-3xl py-1 px-3 inline-block items-center">
                Ended
              </div>
              <div className="text-[28px] font-medium mt-3">
                {selectedEvent?.name}
              </div>
              <div className="text-sm text-gray-500">
                {selectedEvent?.description}
              </div>
              <div className="text-lg text-text-10 mt-3 font-medium">
                <GradientButton className="font-medium">
                  View Details
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pl-4">
          <div className="flex gap-4">
            <div className="flex gap-4">
              <div>
                <img src="/icons/ada.svg" alt="ada-1" className="w-16 h-16" />
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
                  <div className="text-sm pt-1">Total Prize Pool (ADA)</div>
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
                  <img src="/icons/user.svg" alt="user" className="w-3 h-3" />
                </div>
                <div className="text-sm pt-1">Total Volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-36">
        <div className='h-full'>
          <Slider {...settings}>
            {events.map((event, idx) => (
              <div key={idx} className="">
                <img
                  src={event.icon}
                  alt={`Event ${idx + 1}`}
                  className="w-32 h-32 object-cover mx-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Summary;
