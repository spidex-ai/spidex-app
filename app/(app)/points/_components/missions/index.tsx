'use client';
import Pagination from '@/app/(app)/_components/pagination';
import { ButtonBlack, GradientSecondaryBtn } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuests } from '@/hooks/point/use-point';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReminderModalWrapper, { Platform } from './reminder-modal-wrapper';
import dayjs from 'dayjs';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

interface MissionItem {
  id: number;
  icon: React.ReactNode;
  name: string;
  description: string;
  point: string;
  isBorderBottom: boolean;
  requireUrl?: string;
  type: number;
  status: number;
  step: number;
  completedAt: string;
  verifyingAt: string;
  requirements?: {
    token?: string;
    atLeast?: number;
  };
  category: number;
}

interface Props {
  onMissionComplete: () => void;
}

const Missions = ({ onMissionComplete }: Props) => {
  const router = useRouter();
  const { auth } = useSpidexCore();
  const {
    quests,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    refetchQuests,
  } = useQuests();

  const {
    triggerSocialQuest,
    triggerDailyLogin,
    startSocialQuest,
    verifySocialQuest,
  } = useSpidexCore();
  const [loadingMissionId, setLoadingMissionId] = React.useState<number | null>(
    null
  );
  const [expandedMissions, setExpandedMissions] = React.useState<number[]>([]);

  const [isReminderModalOpen, setIsReminderModalOpen] =
    useState<boolean>(false);
  const [reminderModalPlatform, setReminderModalPlatform] =
    useState<Platform>('X');

  const [countdowns, setCountdowns] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (
      (auth?.user?.xId && reminderModalPlatform === 'X') ||
      (auth?.user?.discordUsername && reminderModalPlatform === 'Discord') ||
      (auth?.user?.telegramUsername && reminderModalPlatform === 'Telegram')
    ) {
      setIsReminderModalOpen(false);
    }
    return;
  }, [auth, reminderModalPlatform]);

  // SOCIAL = 0,
  // JOIN_DISCORD = 1,
  // JOIN_TELEGRAM = 2,
  // FOLLOW_X = 3,

  // DAILY_LOGIN = 10,
  const STEP = {
    COMPLETED: 3,
    VERIFYING: 2,
    VERIFY: 1,
    START: 0,
    DISABLED: -1,
  };
  const CATEGORY = {
    ONE_TIME: 0,
    DAILY: 1,
    MULTI_TIME: 2,
  };
  const results: MissionItem[] =
    quests.length > 0
      ? quests.map((quest, index) => {
          let icon = null;
          switch (quest.type) {
            case 0:
              icon = (
                <Image
                  src="/icons/x-bg-white.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
              );
              break;
            case 1:
              icon = (
                <Image
                  src="/icons/discord.svg"
                  alt="discord"
                  width={24}
                  height={24}
                />
              );
              break;
            case 2:
              icon = (
                <Image
                  src="/icons/tele.svg"
                  alt="telegram"
                  width={24}
                  height={24}
                />
              );
              break;
            case 3:
              icon = (
                <Image
                  src="/icons/x-bg-white.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
              );
              break;
            case 10:
              icon = (
                <Image
                  src="/icons/connect-bg-white.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
              );
              break;
            case 20:
              icon = (
                <Image
                  src="/icons/connect-bg-white.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
              );
              break;
            default:
              icon = (
                <Image
                  src="/icons/connect-bg-white.svg"
                  alt="x"
                  width={24}
                  height={24}
                />
              );
          }

          icon = quest.icon ? <Image src={quest.icon} alt="icon" width={24} height={24} /> : icon;

          let step =
            quest.status == 3
              ? STEP.COMPLETED
              : quest.status == 2
                ? STEP.VERIFYING
                : quest.status === 1 || quest.type === 10
                  ? STEP.VERIFY
                  : quest.type === 20 || quest.type === 32 || quest.type === 41
                    ? STEP.DISABLED
                    : STEP.START;

          if (
            step === STEP.VERIFYING &&
            quest.verifyingAt &&
            dayjs().isAfter(dayjs(quest.verifyingAt).add(2, 'minute'))
          ) {
            step = STEP.VERIFY;
          }

          const category = quest.category === CATEGORY.ONE_TIME ? CATEGORY.ONE_TIME : quest.category === CATEGORY.DAILY ? CATEGORY.DAILY : CATEGORY.MULTI_TIME;

          return {
            id: quest.id,
            icon: icon,
            name: quest.name,
            description: quest.description,
            point: quest.point,
            isBorderBottom: index !== quests.length - 1,
            type: quest.type,
            status: quest.status,
            requireUrl: quest?.requirements?.url,
            step: step,
            completedAt: quest.completedAt,
            verifyingAt: quest.verifyingAt,
            requirements: quest?.requirements,
            category: category,
          };
        })
      : [];

  useEffect(() => {
    const timer = setInterval(async () => {
      const now = new Date().getTime();
      const newCountdowns: { [key: number]: number } = {};
      let shouldRefetch = false;
      let id = null;

      results.forEach(result => {
        if (result.step === STEP.VERIFYING) {
          const verifyingTime = new Date(result.verifyingAt).getTime();
          const completedTime = verifyingTime + 120 * 1000;
          const diff = Math.floor((completedTime - now) / 1000);
          if (diff > 0) {
            newCountdowns[result.id] = diff;
          } else {
            shouldRefetch = true;
            id = result.id;
          }
        }
      });

      setCountdowns(newCountdowns);

      if (shouldRefetch) {
        if (id) {
          const verifyResult = await verifySocialQuest(id);
          if (verifyResult?.status === 3) {
            toast.success(`You earned +${verifyResult.points} points!`);
          } else {
            toast.error('Please verify your mission again!');
          }
        }
        refreshData();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [results, refetchQuests]);

  const toggleDescription = (id: number) => {
    setExpandedMissions(prev =>
      prev.includes(id)
        ? prev.filter(missionId => missionId !== id)
        : [...prev, id]
    );
  };

  const refreshData = () => {
    refetchQuests();
    onMissionComplete();
  };

  const handleFinish = async (
    result: MissionItem,
    isClickTab: boolean = true
  ) => {
    console.log('isClickTab', isClickTab);

    if (!auth?.user?.xId && (result.type === 0 || result.type === 3)) {
      setIsReminderModalOpen(true);
      setReminderModalPlatform('X');
      return;
    }

    if (!auth?.user?.discordUsername && result.type === 1) {
      setIsReminderModalOpen(true);
      setReminderModalPlatform('Discord');
      return;
    }

    if (!auth?.user?.telegramUsername && result.type === 2) {
      setIsReminderModalOpen(true);
      setReminderModalPlatform('Telegram');
      return;
    }

    console.log('🚀 ~ handleFinish ~ result.id:', result.id);
    setLoadingMissionId(result.id);
    try {
      let data = null;
      switch (result.type) {
        case 0:
        case 1:
        case 2:
        case 3:
          if (result.step === STEP.START) {
            data = await startSocialQuest(result.id);
            window.open(result.requireUrl, '_blank');
          } else if (
            (result.step === STEP.VERIFY && isClickTab) ||
            result.step === STEP.COMPLETED ||
            result.step === STEP.VERIFYING
          ) {
            window.open(result.requireUrl, '_blank');
          } else {
            data = await triggerSocialQuest(result.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const verifyResult = await verifySocialQuest(result.id);
            if (verifyResult?.status === 2) {
              toast.success(`Your mission is being verified!`);
            } else if (verifyResult?.status === 3) {
              toast.success(`You earned +${verifyResult.points} points!`);
            } else {
              toast.error('You have failed the mission! Please try again.');
            }
          }

          break;
        case 10:
          if (result.step !== STEP.COMPLETED) {
            console.log("🚀 ~ Missions ~ result:", result)
            data = await triggerDailyLogin();
            toast.success('You earned +10 points!');
          }
          break;
        case 20:
          router.push(`/referral`);
          return;
        case 41:
          router.push(`/chat`);
          return;
        case 32:
          const tokenTrade =
            'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d';
          router.push(`/token/${tokenTrade}?tab=trade`);
          return;
        case 35:
          const tokenSwap = result?.requirements?.token;
          if (tokenSwap) {
            router.push(`/token/${tokenSwap}?tab=trade`);
          }
          return;
        default:
          return;
      }
      refreshData();
      return data;
    } catch (error) {
      console.log('🚀 ~ handleFinish ~ error:', error);
      toast.error('You have failed the mission! Please try again.');
    } finally {
      setLoadingMissionId(null);
    }
  };

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary p-10">
      <div className="">
        <div className="text-[28px] font-medium text-white">Missions</div>
      </div>
      <div className="flex flex-col mt-6 gap-3">
        {loading ? (
          <Skeleton className="w-full h-[100px]" />
        ) : (
          <>
            {results.length > 0
              ? results.map(result => (
                  <div className="bg-bg-main rounded-lg p-4" key={result.type}>
                    <div
                      className={`grid grid-cols-3 cursor-pointer`}
                      onClick={() => handleFinish(result)}
                    >
                      <div className="col-span-1 flex gap-2 items-center cursor-pointer">
                        <div
                          className=""
                          onClick={e => {
                            e.stopPropagation();
                            toggleDescription(result.id);
                          }}
                        >
                          <Image
                            src="/icons/arrow-right.svg"
                            alt="arrow-down"
                            width={10}
                            height={10}
                            className={`transform transition-transform duration-200 ${
                              expandedMissions.includes(result.id)
                                ? 'rotate-90'
                                : ''
                            }`}
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {result.icon}
                            </div>
                            <div className="text-white text-lg">
                              {result.name}
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 text-white text-lg flex justify-center gap-1 items-center">
                        <div>+{result.point} </div>
                        <div>
                          <Image
                            src="/icons/logo-gray.svg"
                            alt="arrow-right"
                            width={24}
                            height={24}
                          />
                        </div>
                        {result.category === CATEGORY.ONE_TIME ? null : result.category === CATEGORY.DAILY ? (
                          <div>/day</div>
                        ) : (
                          <div>/time</div>
                        )}
                      </div>
                      <div className="col-span-1 text-white flex items-center justify-end">
                        <div className="w-[150px]">
                          {result.step === STEP.COMPLETED ? (
                            <div>
                              <GradientSecondaryBtn
                                className="w-full px-4 py-2 text-sm"
                                disabled={true}
                              >
                                Completed
                              </GradientSecondaryBtn>
                            </div>
                          ) : result.step === STEP.VERIFYING ? (
                            <div>
                              <ButtonBlack
                                isLoading={false}
                                disabled={true}
                                className="w-full px-4 py-2 text-sm"
                              >
                                Verifying
                                {countdowns[result.id]
                                  ? `: ${countdowns[result.id]}s`
                                  : ' ...'}
                              </ButtonBlack>
                            </div>
                          ) : result.step === STEP.VERIFY ? (
                            <div>
                              <ButtonBlack
                                isLoading={loadingMissionId === result.id}
                                disabled={
                                  (loadingMissionId !== null &&
                                    loadingMissionId !== result.id) ||
                                  result.status === 3
                                }
                                className="w-full px-4 py-2 text-sm"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  console.log(
                                    '🚀 ~ handleFinish ~ result:',
                                    result
                                  );
                                  handleFinish(result, false);
                                }}
                              >
                                Verify
                              </ButtonBlack>
                            </div>
                          ) : result.step === STEP.DISABLED ? null : (
                            <div>
                              <ButtonBlack
                                isLoading={loadingMissionId === result.id}
                                // isLoading={true}
                                disabled={
                                  (loadingMissionId !== null &&
                                    loadingMissionId !== result.id) ||
                                  result.status === 2
                                }
                                className="w-full px-4 py-2 text-sm"
                              >
                                Start
                              </ButtonBlack>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-full relative overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedMissions.includes(result.id)
                          ? 'opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 py-2 w-full text-text-gray">
                        {result.description}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </>
        )}
      </div>

      <div className="mt-6">
        <Pagination
          total={totalPages}
          current={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <ReminderModalWrapper
        isOpen={isReminderModalOpen}
        onOpenChange={value => setIsReminderModalOpen(value)}
        platform={reminderModalPlatform}
      />
    </div>
  );
};

export default Missions;
