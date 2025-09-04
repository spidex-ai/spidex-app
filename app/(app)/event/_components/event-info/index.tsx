import { TextGradient } from '@/components/ui/text';
import { EventDetail } from '@/hooks/events/type';
import { formatNumber } from '@/lib/utils';
import dayjs from 'dayjs';
import React from 'react';

interface EventInfoProps {
  eventDetail: EventDetail;
}

const EventInfo: React.FC<EventInfoProps> = ({ eventDetail }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 gap-0 mt-4 border border-border-main">
        <div className="border-r border-border-main pt-4 pb-2 md:px-10 px-4">
          <TextGradient className="md:text-2xl text-base font-medium max-w-2xl mx-auto">
            Reward Allocation
          </TextGradient>

          <div className="mt-4 max-w-2xl mx-auto">
            <div className="md:flex items-center md:justify-between gap-2 border-b border-border-main md:pb-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/first.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm font-medium">1st place</div>
              </div>
              <div className="md:text-base text-sm text-right uppercase">
                {formatNumber(
                  Number(eventDetail?.top3Prizes.firstPlace.tokenAmount)
                )}{' '}
                {eventDetail?.top3Prizes.firstPlace.name}
              </div>
            </div>
            <div className="md:flex items-center md:justify-between gap-2 border-b border-border-main md:pb-4 pb-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/second.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm font-medium">2nd place</div>
              </div>
              <div className="md:text-base text-sm text-right uppercase ">
                {formatNumber(
                  Number(eventDetail?.top3Prizes.secondPlace.tokenAmount)
                )}{' '}
                {eventDetail?.top3Prizes.secondPlace.name}
              </div>
            </div>
            <div className="md:flex items-center md:justify-between gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/third.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm font-medium">3rd place</div>
              </div>
              <div className="md:text-base text-sm text-right uppercase">
                {formatNumber(
                  Number(eventDetail?.top3Prizes.thirdPlace.tokenAmount)
                )}{' '}
                {eventDetail?.top3Prizes.thirdPlace.name}
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 md:px-10 px-4">
          <TextGradient className="md:text-2xl text-base font-medium max-w-2xl mx-auto">
            TIMINGS
          </TextGradient>

          <div className="mt-4 max-w-2xl mx-auto">
            <div className="md:flex items-center md:justify-between gap-2 border-b border-border-main md:pb-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/first-blue.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm">{dayjs(eventDetail?.startDate).format('DD.MM.YYYY')}</div>
              </div>
              <div className="text-[#BBF985] md:text-base text-sm text-right font-medium">Competition Starts</div>
            </div>
            <div className="md:flex items-center md:justify-between gap-2 border-b border-border-main md:pb-4 pb-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/second-blue.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm">{dayjs(eventDetail?.endDate).format('DD.MM.YYYY')}</div>
              </div>
              <div className="text-[#FF6666] md:text-base text-sm text-right font-medium">Competition Ends</div>
            </div>
            <div className="md:flex items-center md:justify-between gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/icons/third-blue.svg"
                    alt="gold-medal"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <div className="md:text-base text-sm">{dayjs(eventDetail?.distributionDate).format('DD.MM.YYYY')}</div>
              </div>
              <div className="text-[#0E76AE] md:text-base text-sm text-right font-medium">Distribution Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
