'use client';
import {
  GradientBorderButton,
  GradientBorderButtonMobile,
  GradientButton,
  Skeleton,
} from '@/components/ui';
import { EventItem, EventStatus } from '@/hooks/events/type';
import { formatNumber } from '@/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/utils/use-mobile';

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
  const router = useRouter();
  const isMobile = useIsMobile();

  const date = useMemo(() => {
    if (!selectedEvent) return;
    const { startDate, endDate } = selectedEvent;
    if (dayjs(startDate).isAfter(dayjs())) {
      return {
        status: EventStatus.UPCOMING,
        time: startDate,
        start: startDate,
        end: endDate,
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
      <div
        className={`w-full border border-gray-500 rounded-md ${isMobile ? 'py-4 px-4' : 'py-7 px-16'}`}
      >
        <div className="">
          <div className={`${isMobile ? 'flex gap-4' : 'flex gap-20'}`}>
            <div className="rounded-lg">
              <img
                src={selectedEvent?.icon ?? '/icons/competition.svg'}
                alt="com-1"
                className={`${isMobile ? 'w-20 h-20 min-w-20' : 'w-52 h-52'} rounded-lg`}
              />
            </div>
            <div>
              <div className="flex gap-4">
                {date?.status === EventStatus.UPCOMING && (
                  <div className="flex gap-4 items-center">
                    <div
                      className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.UPCOMING ? 'text-black bg-[#009EFF]' : 'text-white bg-[#233857]'}`}
                    >
                      Incoming
                    </div>
                    <div>
                      <Countdown endDate={date?.start ?? ''} title="Start in" />
                    </div>
                  </div>
                )}
                {date?.status === EventStatus.LIVE && (
                  <div className="flex gap-4 items-center">
                    <div
                      className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.LIVE ? 'text-black bg-[#BBF985]' : 'text-white bg-[#233857]'}`}
                    >
                      Going on
                    </div>
                    <div>
                      <Countdown endDate={date?.end ?? ''} title="End in" />
                    </div>
                  </div>
                )}
                {date?.status === EventStatus.ENDED && (
                  <div className="flex gap-4 items-center">
                    <div
                      className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium py-2 px-5 rounded-3xl ${date?.status === EventStatus.ENDED ? 'text-white bg-[#FF6666]' : 'text-white bg-[#233857]'}`}
                    >
                      Ended
                    </div>
                    <div className="text-xs text-text-gray font-bold">
                      End at {dayjs(date?.end).format('DD MMM YYYY HH:mm:ss')}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`${isMobile ? 'text-18px' : 'text-[28px]'} font-medium mt-3`}
              >
                {selectedEvent?.name}
              </div>
              <div className="text-sm text-gray-500">
                {selectedEvent?.description}
              </div>
              <div className="my-5">
                {isMobile ? (
                  <div className="flex gap-1">
                    <GradientBorderButtonMobile
                      onClick={() => window.open(selectedEvent?.url, '_blank')}
                    >
                      View Details
                    </GradientBorderButtonMobile>
                    <GradientButton
                      className="font-medium"
                      onClick={() =>
                        router.push(`/token/${selectedEvent?.tradeToken.unit}`)
                      }
                    >
                      Trade now
                    </GradientButton>
                  </div>
                ) : (
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
                            Total Prize Pool (
                            {selectedEvent?.tradeToken?.ticker})
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-white mx-3"></div>
                    <div>
                      <div className="text-[28px] font-medium">
                        $
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
                )}
              </div>
              {!isMobile && (
                <div className="text-lg text-text-10 mt-3 font-medium flex gap-4">
                  <GradientBorderButton
                    onClick={() => window.open(selectedEvent?.url, '_blank')}
                  >
                    View Details
                  </GradientBorderButton>
                  <GradientButton
                    className="font-medium"
                    onClick={() =>
                      router.push(`/token/${selectedEvent?.tradeToken.unit}`)
                    }
                  >
                    Trade now
                  </GradientButton>
                </div>
              )}
            </div>
          </div>
          {isMobile && (
            <div className="flex gap-1">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedEvent?.tradeToken?.logo}
                    alt="ada-1"
                    className="w-12 h-12 rounded-full border border-green-500"
                  />
                </div>
                <div>
                  <div className="text-[24px] font-medium">
                    {formatNumber(Number(selectedEvent?.totalPrize))}
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>
                      <img
                        src="/icons/prize.svg"
                        alt="prize"
                        className="w-2 h-2"
                      />
                    </div>
                    <div className="text-xs">
                      Total Prize Pool ({selectedEvent?.tradeToken?.ticker})
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-white mx-3"></div>
              <div>
                <div className="text-[24px] font-medium">
                  ${formatNumber(Number(selectedEvent?.totalVolumeTraded))}
                </div>
                <div className="flex gap-1 items-center">
                  <div>
                    <img src="/icons/user.svg" alt="user" className="w-2 h-2" />
                  </div>
                  <div className="text-xs">Total Volume</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className="col-span-full">
          <Slide {...slideProperties} slidesToShow={isMobile ? 1 : 3}>
            {/* eslint-disable react-hooks/rules-of-hooks */}
            {events.map((event, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const dateEvent = useMemo(() => {
                if (!event) return;
                const { startDate, endDate } = event;
                if (dayjs(startDate).isAfter(dayjs())) {
                  return {
                    status: EventStatus.UPCOMING,
                    time: startDate,
                    start: startDate,
                    end: endDate,
                  };
                }
                if (dayjs(endDate).isBefore(dayjs())) {
                  return {
                    status: EventStatus.ENDED,
                    time: endDate,
                    end: endDate,
                    start: startDate,
                  };
                }
                return {
                  status: EventStatus.LIVE,
                  time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                  start: startDate,
                  end: endDate,
                };
              }, [event]);

              return (
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
                        className={`${isMobile ? 'w-20 h-20 min-w-20' : 'w-20 h-20 min-w-20'} object-cover mx-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                      />
                    </div>
                    <div className="text-[10px]">
                      <div>
                        {dateEvent?.status === EventStatus.UPCOMING && (
                          <div className="flex gap-2 items-center">
                            <div
                              className={`text-xs font-medium py-1 px-4 rounded-3xl ${dateEvent?.status === EventStatus.UPCOMING ? 'text-black bg-[#009EFF]' : 'text-white bg-[#233857]'}`}
                            >
                              Incoming
                            </div>
                            <div>
                              <Countdown
                                endDate={dateEvent?.start ?? ''}
                                title="Start in"
                              />
                            </div>
                          </div>
                        )}
                        {dateEvent?.status === EventStatus.LIVE && (
                          <div className="flex gap-2 items-center">
                            <div
                              className={`text-xs font-medium py-1 px-4 rounded-3xl ${dateEvent?.status === EventStatus.LIVE ? 'text-black bg-[#BBF985]' : 'text-white bg-[#233857]'}`}
                            >
                              Going on
                            </div>
                            <div>
                              <Countdown
                                endDate={dateEvent?.end ?? ''}
                                title="End in"
                              />
                            </div>
                          </div>
                        )}
                        {dateEvent?.status === EventStatus.ENDED && (
                          <div className="flex gap-2 items-center">
                            <div
                              className={`text-xs font-medium py-1 px-4 rounded-3xl ${dateEvent?.status === EventStatus.ENDED ? 'text-white bg-[#FF6666]' : 'text-white bg-[#233857]'}`}
                            >
                              Ended
                            </div>
                            <div className="text-xs text-text-gray font-bold">
                              End at {dayjs(dateEvent?.end).format('DD MMM YYYY HH:mm:ss')}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-white text-sm mt-2">
                        {event.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {event.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slide>
        </div>
      </div>
    </div>
  );
};

interface CountdownProps {
  endDate: string;
  title?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ endDate, title }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const end = dayjs(endDate);
      const difference = end.diff(now);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex gap-1 text-xs text-text-gray">
      <span className="font-bold">{title}</span>
      <span className="font-semibold">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {`${String(timeLeft.hours).padStart(2, '0')}h`}:
        {`${String(timeLeft.minutes).padStart(2, '0')}m`}:
        {`${String(timeLeft.seconds).padStart(2, '0')}s`}
      </span>
    </div>
  );
};

export default Summary;
