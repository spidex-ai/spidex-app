// app/(app)/event/_components/event-card/index.tsx
// Purpose: Display an event card with an image that stays sharp at the top and gradually blurs toward the bottom, overlaying event name and description
import React from 'react';
import Image from 'next/image';
import { EventItem } from '@/hooks/events/type';
import { TextGradient } from '@/components/ui/text';
import { GradientBorderButton } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import dayjs from 'dayjs';

interface EventCardProps {
  item: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  const imageUrl = item.icon || item.url || '/logo-200.png';

  return (
    <div className="w-full rounded-xl overflow-hidden bg-neutral-900/20">
      <div className="relative h-48 md:h-56">
        {/* Blurred base image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover scale-[1.02] blur-md"
            priority={false}
          />
        </div>

        {/* Sharp image on top with bottom fade mask so the blurred layer shows through */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          }}
        >
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Readability gradient tinting image bottom into #0B1320 */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="h-28 md:h-32 bg-gradient-to-b from-transparent via-[#0B1320]/70 to-[#0B1320]/90 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-2 md:px-5 md:pb-3">
            <TextGradient className="text-[18px] font-medium leading-6 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] min-h-12">
              {item.name}
            </TextGradient>
          </div>
        </div>
      </div>
      {/* Info panel: same background as gradient end for seamless feel */}
      <div className="relative z-[1] bg-[#0B1320]/90 px-4 pt-2 pb-4 md:px-5 md:pt-3 md:pb-5">
        {/* Details: each on its own line */}
        <div className="mt-3 md:mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-sm border-b border-border-main pb-2 mt-2">
            <div className="text-text-20 text-sm tracking-wide font-regular">
              Start Date
            </div>
            <div className="text-white">{dayjs(item.startDate).format('DD MMM YYYY')}</div>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm border-b border-border-main pb-2 mt-2">
            <div className="text-text-20 text-sm tracking-wide font-regular">End Date</div>
            <div className="text-white">{dayjs(item.endDate).format('DD MMM YYYY')}</div>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm border-b border-border-main pb-2 mt-2">
            <div className="text-text-20 text-sm tracking-wide font-regular">
              Trading Pair
            </div>
            <div className="text-white">
              {item.tradeToken?.ticker || item.tradeToken?.name || '-'}/ADA
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm border-b border-border-main pb-2 mt-2">
            <div className="text-text-20 text-sm tracking-wide font-regular">
              Total Prize
            </div>
            <div className="text-white">
              A{formatNumber(Number(item.totalPrize))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <GradientBorderButton>View Details</GradientBorderButton>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
