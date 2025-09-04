// app/(app)/event/_components/banner/index.tsx
import { GradientButton } from '@/components/ui';
import { TextGradient } from '@/components/ui/text';
import { EventDetail } from '@/hooks/events/type';
import { formatNumber } from '@/lib/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { DexItem } from '../event-card';
import { useIsMobile } from '@/hooks/utils/use-mobile';

const Banner = ({ eventDetail }: { eventDetail: EventDetail }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={eventDetail.banner || '/icons/banner_event.jpg'}
        alt="Trading Competition Banner"
        className="w-full h-[250px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-green-900/80">
        <div className="container mx-auto px-4 h-full flex flex-col justify-between py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                <TextGradient className="md:text-3xl text-lg font-meidum">
                  {eventDetail.name}
                </TextGradient>
              </h1>
              <p className="text-gray-300 md:text-sm text-xs mb-2">
                Trade to share {formatNumber(Number(eventDetail.totalPrize))}{' '}
                ADA prize pool
              </p>
              <div className="flex md:flex-col flex-row md:gap-0 gap-2">
                <GradientButton
                  className="md:py-2 py-0 px-6 md:px-10 font-medium md:text-base text-sm max-w-fit"
                  onClick={() =>
                    router.push(
                      `/token/${eventDetail?.tradeToken.unit === 'ALL_TOKEN' ? 'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d' : eventDetail?.tradeToken.unit}?tab=trade`
                    )
                  }
                >
                  Trade Now
                </GradientButton>
                <div className="md:mt-5 mt-3 flex items-center">
                  <div>{eventDetail && <Time eventDetail={eventDetail} />}</div>
                </div>
              </div>
            </div>
          </div>

          {
            isMobile ? (
              <div className="grid grid-cols-2 gap-0">
                <div className="text-center ">
                  <div className="p-1">
                    <p className="text-[#BBF985] text-xs font-medium">
                      Dex
                    </p>
                    <p className="text-white text-sm font-bold">
                      <DexItem dexOption={eventDetail.tradeDex} />
                    </p>
                  </div>
                </div>

                <div className="text-center ">
                  <div className="p-1">
                    <p className="text-[#BBF985] text-xs font-medium">
                      Total Prize Pool
                    </p>
                    <p className="text-white text-sm font-bold">
                      {formatNumber(Number(eventDetail.totalPrize))} ADA
                    </p>
                  </div>
                </div>

                {/* Participants */}
                <div className="text-center ">
                  <div className="p-1">
                    <p className="text-[#BBF985] text-xs font-medium">
                      Participants
                    </p>
                    <p className="text-white text-sm font-bold">
                      {eventDetail.participantCount}
                    </p>
                  </div>
                </div>

                {/* Total Trading Volume */}
                <div className="text-center pl-2">
                  <div className="p-1">
                    <p className="text-[#BBF985] text-xs font-medium">
                      Total Trading Volume
                    </p>
                    <p className="text-white text-sm font-bold">
                      {formatNumber(Number(eventDetail.totalVolumeTraded))} ADA
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-0">
            <div className="relative max-w-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
              <div className="grid grid-cols-4 gap-0">
                <div className="text-center border-r border-white/70">
                  <div className="py-3 px-2">
                    <p className="text-[#BBF985] text-xs font-medium mb-1">
                      Dex
                    </p>
                    <p className="text-white text-sm font-bold">
                      <DexItem dexOption={eventDetail.tradeDex} />
                    </p>
                  </div>
                </div>

                <div className="text-center border-r border-white/70">
                  <div className="py-3 px-2">
                    <p className="text-[#BBF985] text-xs font-medium mb-1">
                      Total Prize Pool
                    </p>
                    <p className="text-white text-sm font-bold">
                      {formatNumber(Number(eventDetail.totalPrize))} ADA
                    </p>
                  </div>
                </div>

                {/* Participants */}
                <div className="text-center border-r border-white/70">
                  <div className="py-3 px-2">
                    <p className="text-[#BBF985] text-xs font-medium mb-1">
                      Participants
                    </p>
                    <p className="text-white text-sm font-bold">
                      {eventDetail.participantCount}
                    </p>
                  </div>
                </div>

                {/* Total Trading Volume */}
                <div className="text-center pl-2">
                  <div className="py-3 px-2">
                    <p className="text-[#BBF985] text-xs font-medium mb-1">
                      Total Trading Volume
                    </p>
                    <p className="text-white text-sm font-bold">
                      {formatNumber(Number(eventDetail.totalVolumeTraded))} ADA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          }
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
    <div className="flex gap-1 md:text-base text-sm text-text-gray">
      <span className="font-bold uppercase">{title}:</span>
      <span className="font-semibold text-white">
        {timeLeft.days > 0 && `${timeLeft.days}D:`}
        {`${String(timeLeft.hours).padStart(2, '0')}H`}:
        {`${String(timeLeft.minutes).padStart(2, '0')}M`}:
        {`${String(timeLeft.seconds).padStart(2, '0')}S`}
      </span>
    </div>
  );
};

const Time = ({ eventDetail }: { eventDetail: EventDetail }) => {
  if (dayjs(eventDetail?.endDate).isBefore(dayjs())) {
    return (
      <div className="flex gap-2 items-center">
        <div className="md:text-base text-sm text-text-gray font-bold">
          End at:{' '}
          <span className="text-white md:text-sm text-xs">
            {dayjs(eventDetail?.endDate).format('DD MMM YYYY HH:mm:ss')}
          </span>
        </div>
      </div>
    );
  }

  if (dayjs(eventDetail?.startDate).isAfter(dayjs())) {
    return (
      <div className="flex gap-2 items-center">
        <div>
          <Countdown endDate={eventDetail?.startDate ?? ''} title="Start in" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 items-center">
        <div>
          <Countdown endDate={eventDetail?.endDate ?? ''} title="Start at" />
        </div>
      </div>
    );
  }
};

export default Banner;
