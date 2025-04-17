"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuests } from "@/hooks/point/use-point";
import React from "react";
import Image from "next/image";
import { GradientButton, GradientSecondaryBtn } from "@/components/ui";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";

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
  const { quests, loading, error, fetchQuests } = useQuests();
  const { triggerSocialQuest, triggerDailyLogin } = useSpidexCoreContext();
  const [loadingMissionId, setLoadingMissionId] = React.useState<number | null>(
    null
  );
  const [expandedMissions, setExpandedMissions] = React.useState<number[]>([]);
  console.log("🚀 ~ Missions ~ quests:", quests);

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
  const results: MissionItem[] = quests.map((quest, index) => {
    let icon = null;
    switch (quest.type) {
      case 0:
        icon = (
          <Image src="/icons/x-white.svg" alt="x" width={24} height={24} />
        );
        break;
      case 1:
        icon = (
          <Image
            src="/icons/discord-white.svg"
            alt="discord"
            width={24}
            height={24}
          />
        );
        break;
      case 2:
        icon = (
          <Image
            src="/icons/tele-white.svg"
            alt="telegram"
            width={24}
            height={24}
          />
        );
        break;
      case 3:
        icon = (
          <Image src="/icons/x-white.svg" alt="x" width={24} height={24} />
        );
        break;
      case 10:
        icon = (
          <Image
            src="/icons/connect-white.svg"
            alt="x"
            width={24}
            height={24}
          />
        );
        break;
      case 20:
        icon = (
          <Image
            src="/icons/connect-white.svg"
            alt="x"
            width={24}
            height={24}
          />
        );
        break;
      default:
        icon = null;
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
  });

  const toggleDescription = (id: number) => {
    setExpandedMissions((prev) =>
      prev.includes(id)
        ? prev.filter((missionId) => missionId !== id)
        : [...prev, id]
    );
  };

  const handleFinish = async (result: MissionItem) => {
    setLoadingMissionId(result.id);
    try {
      console.log("🚀 ~ handleFinish ~ id:", result.id);
      let data = null;
      switch (result.type) {
        case 0:
        case 1:
        case 2:
        case 3:
          data = await triggerSocialQuest(result.id);
          break;
        case 10:
          data = await triggerDailyLogin();
          break;
        default:
          break;
      }
      console.log('data');
      return data;
    } catch (error) {
      console.log("🚀 ~ handleFinish ~ error:", error);
    } finally {
      setLoadingMissionId(null);
      fetchQuests();
    }
  };

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary p-10">
      <div className="">
        <div className="text-2xl font-bold text-white">Missions</div>
      </div>
      <div className="flex flex-col mt-6">
        {results.map((result) => (
          <div
            key={result.id}
            className={`grid grid-cols-3  ${
              result.isBorderBottom
                ? "border-b border-border-main py-6"
                : "pt-6"
            }`}
          >
            <div className="col-span-1 flex gap-2">
              <div
                onClick={() => toggleDescription(result.id)}
                className="cursor-pointer"
              >
                <Image
                  src="/icons/arrow-do.svg"
                  alt="arrow-down"
                  width={15}
                  height={15}
                  className={`transform transition-transform duration-200 ${
                    expandedMissions.includes(result.id) ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">{result.icon}</div>
                  <div className="text-white">{result.name}</div>{" "}
                </div>
                <div
                  className={`w-full relative overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedMissions.includes(result.id)
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-bg-tab p-4 mt-2 w-full min-h-28">
                    {result.description}
                  </div>
                  {result.status === 1 && (
                    <div className="absolute bottom-2 right-2">
                      <Image
                        src="/icons/verify.svg"
                        alt="verify"
                        width={19}
                        height={19}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-1 text-white flex justify-center gap-1">
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
                {result.type === 20 ? null : (
                  <div>
                    <GradientButton
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
                    </GradientButton>
                  </div>
                )}
                {result.status === 1 && (
                  <div>
                    <GradientSecondaryBtn className="px-7 py-2" disabled={true}>
                      Completed
                    </GradientSecondaryBtn>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
