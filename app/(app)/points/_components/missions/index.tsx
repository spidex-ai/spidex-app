"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuests } from "@/hooks/point/use-point";
import React from "react";
import Image from "next/image";
import { GradientButton } from "@/components/ui";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";

interface MissionItem {
  id: number;
  icon: React.ReactNode;
  name: string;
  point: string;
  isBorderBottom: boolean;
}

const Missions = () => {
  const { quests, loading, error } = useQuests();
  const { triggerSocialQuest } = useSpidexCoreContext();
  const [loadingMissionId, setLoadingMissionId] = React.useState<number | null>(
    null
  );
  console.log("🚀 ~ Missions ~ quests:", quests);

  if (loading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      point: quest.point,
      isBorderBottom: index !== quests.length - 1,
    };
  });

  const handleFinish = async (id: number) => {
    setLoadingMissionId(id);
    console.log("🚀 ~ handleFinish ~ id:", id);
    try {
      const data = await triggerSocialQuest(id);
      console.log("🚀 ~ handleFinish ~ data:", data);
    } catch (error) {
      console.log("🚀 ~ handleFinish ~ error:", error);
    } finally {
      setLoadingMissionId(null);
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
            key={result.name}
            className={`grid grid-cols-3  ${
              result.isBorderBottom
                ? "border-b border-border-main py-6"
                : "pt-6"
            }`}
          >
            <div className="col-span-1 flex items-center gap-2">
              <div className="flex items-center">{result.icon}</div>
              <div className="text-white">{result.name}</div>
            </div>
            <div className="col-span-1 text-white flex items-center justify-center gap-1">
              <div>+{result.point} </div>
              <div>
                <Image
                  src="/icons/logo-gray.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
              </div>
              <div>/day</div>
            </div>
            <div className="col-span-1 text-white flex items-center justify-end">
              <GradientButton
                onClick={() => handleFinish(result.id)}
                isLoading={loadingMissionId === result.id}
                disabled={loadingMissionId !== null && loadingMissionId !== result.id}
           
              >
                Finish
              </GradientButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
