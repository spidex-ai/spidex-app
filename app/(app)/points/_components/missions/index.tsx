"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usePointHistory, useQuests } from "@/hooks/point/use-point";
import React from "react";
import Image from "next/image";
import { ButtonBlack, GradientSecondaryBtn } from "@/components/ui";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import ReminderModalWrapper from "./reminder-modal-wrapper";
import toast from "react-hot-toast";

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
}

const Missions = () => {
  const { auth } = useSpidexCoreContext();
  const { quests, loading, error, fetchQuests } = useQuests();
  const { refetchPointHistory } = usePointHistory();
  const { triggerSocialQuest, triggerDailyLogin } = useSpidexCoreContext();
  const [loadingMissionId, setLoadingMissionId] = React.useState<number | null>(
    null
  );
  const [expandedMissions, setExpandedMissions] = React.useState<number[]>([]);

  const [isReminderModalOpen, setIsReminderModalOpen] = React.useState<boolean>(false); 


  if (loading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // SOCIAL = 0,
  // JOIN_DISCORD = 1,
  // JOIN_TELEGRAM = 2,
  // FOLLOW_X = 3,

  // DAILY_LOGIN = 10,
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
          };
        })
      : [];

  const toggleDescription = (id: number) => {
    setExpandedMissions((prev) =>
      prev.includes(id)
        ? prev.filter((missionId) => missionId !== id)
        : [...prev, id]
    );
  };

  const handleFinish = async (result: MissionItem) => {
    if (!auth?.user?.xUsername) {
      setIsReminderModalOpen(true);
      return;
    }
    setLoadingMissionId(result.id);
    try {
  
      let data = null;
      switch (result.type) {
        case 0:
        case 1:
        case 2:
        case 3:
          data = await triggerSocialQuest(result.id);
          window.open(result.requireUrl, "_blank");
          break;
        case 10:
          data = await triggerDailyLogin();
          break;
        default:
          break;
      }
 
      toast.success('You have completed the mission!')
      return data;
    } catch (error) {
      console.error("🚀 ~ handleFinish ~ error:", error);

      toast.error('You have failed the mission! Please try again.')
    } finally {
      setLoadingMissionId(null);
      fetchQuests();
      refetchPointHistory();
    }
  };

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary p-10">
      <div className="">
        <div className="text-[28px] font-medium text-white">Missions</div>
      </div>
      <div className="flex flex-col mt-6 gap-3">
        {results.length > 0
          ? results.map((result) => (
              <div className="bg-bg-main rounded-lg p-4" key={result.id}>
                <div className={`grid grid-cols-3 `}>
                  <div className="col-span-1 flex gap-2 items-center cursor-pointer"  onClick={() => toggleDescription(result.id)}>
                    <div className="">
                      <Image
                        src="/icons/arrow-right.svg"
                        alt="arrow-down"
                        width={10}
                        height={10}
                        className={`transform transition-transform duration-200 ${
                          expandedMissions.includes(result.id)
                            ? "rotate-90"
                            : ""
                        }`}
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">{result.icon}</div>
                        <div className="text-white text-lg">{result.name}</div>{" "}
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
                    {result.type === 20 ? null : <div>/day</div>}
                  </div>
                  <div className="col-span-1 text-white flex items-start justify-end">
                    <div>
                      {(result.type === 20 || result.type === 32 || result.type === 41) ? null : result.status == 1 ? (
                        <div>
                          <GradientSecondaryBtn
                            className="px-7 py-2"
                            disabled={true}
                          >
                            Completed
                          </GradientSecondaryBtn>
                        </div>
                      ) : (
                        <div>
                          <ButtonBlack
                            onClick={() => handleFinish(result)}
                            isLoading={loadingMissionId === result.id}
                            disabled={
                              (loadingMissionId !== null &&
                                loadingMissionId !== result.id) ||
                              result.status === 1
                            }
                            className="md:px-12 md:py-2"
                          >
                            Verify
                          </ButtonBlack>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full relative overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedMissions.includes(result.id)
                      ? "opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 py-2 w-full text-text-gray">
                    {result.description}
                  </div>
                  
                </div>
              </div>
            ))
          : null}
      </div>

      <ReminderModalWrapper
        isOpen={isReminderModalOpen}
        onOpenChange={() => setIsReminderModalOpen(!isReminderModalOpen)}
      />
    </div>
  );
};

export default Missions;
