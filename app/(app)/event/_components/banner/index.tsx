// app/(app)/event/_components/banner/index.tsx
import { GradientButton } from '@/components/ui';
import { TextGradient } from '@/components/ui/text';
import { EventDetail } from '@/hooks/events/type';
import { EEventStatus } from '@/hooks/events/use-event';
import { formatNumber } from '@/lib/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Banner = ({ eventDetail }: { eventDetail: EventDetail }) => {
  const router = useRouter();
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
                <TextGradient className="text-3xl font-meidum">
                  {eventDetail.name}
                </TextGradient>
              </h1>
              <p className="text-gray-300 text-sm mb-2">
                Trade to share {formatNumber(Number(eventDetail.totalPrize))}{' '}
                ADA prize pool
              </p>
              <GradientButton
                className="md:py-2 py-1 px-8 md:px-10 font-medium text-base"
                onClick={() =>
                  router.push(`/token/${eventDetail?.tradeToken.unit}`)
                }
              >
                Trade Now
              </GradientButton>
              <div className="mt-5">
                <div>
                  {eventDetail?.status === EEventStatus.UPCOMING && (
                    <div className="flex gap-2 items-center">
                      <div>
                        <Countdown
                          endDate={eventDetail?.startDate ?? ''}
                          title="Start in"
                        />
                      </div>
                    </div>
                  )}
                  {(eventDetail?.status === EEventStatus.LIVE ||
                    eventDetail?.status === 'ACTIVE') && (
                    <div className="flex gap-2 items-center">
                      <div>
                        <Countdown
                          endDate={eventDetail?.endDate ?? ''}
                          title="End in"
                        />
                      </div>
                    </div>
                  )}
                  {(eventDetail?.status === EEventStatus.ENDED || eventDetail?.status === 'DRAFT') && (
                    <div className="flex gap-2 items-center">
                      <div className="text-xs text-text-gray font-bold">
                        End at{' '}
                        {dayjs(eventDetail?.endDate).format(
                          'DD MMM YYYY HH:mm:ss'
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Statistics Bar (Left Corner Only) */}
          <div className="absolute bottom-0">
            <div className="relative max-w-xl">
              {/* Top horizontal line with gradient blur effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>

              <div className="grid grid-cols-3 gap-0">
                {/* Total Prize Pool */}
                <div className="text-center border-r border-white/70 pr-3">
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
                <div className="text-center border-r border-white/70 px-3">
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
                <div className="text-center pl-3">
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
    <div className="flex gap-1 text-base text-text-gray">
      <span className="font-bold uppercase">{title}:</span>
      <span className="font-semibold text-white">
        {timeLeft.days > 0 && `${timeLeft.days}D: `}
        {`${String(timeLeft.hours).padStart(2, '0')}H`}:
        {`${String(timeLeft.minutes).padStart(2, '0')}M`}:
        {`${String(timeLeft.seconds).padStart(2, '0')}S`}
      </span>
    </div>
  );
};

export default Banner;
