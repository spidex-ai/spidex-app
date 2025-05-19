import React from "react";
import Image from "next/image";
import { GradientButton } from "@/components/ui";
export interface RefListItemProps {
    index: number;
  key: number;
  avatar: string | null;
  username: string;
  point: string;
  date: string;
}

const RefListItem: React.FC<RefListItemProps> = ({
  index,
  // key,
  avatar,
  username,
  point,
  date,
}: RefListItemProps) => {
  const pointNumber = Number(point).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
  return (
    <div className={`${index % 2 === 0 ? 'bg-bg-main' : ''}`}>
        <div className={`grid grid-cols-3 py-6`}>   
      <div className="flex items-center justify-center gap-2">
        <div>
          {avatar ? (
            <Image src={avatar} alt={username} width={32} height={32} />
          ) : (
            <Image
              src="/icons/agent-club.svg"
              alt="agent-club"
              width={32}
              height={32}
            />
          )}
        </div>
        <div>{username}</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <GradientButton>{`+${pointNumber} SILK`}</GradientButton>
      </div>
      <div className="flex items-center justify-center gap-2">{date}</div>
    </div>
    </div>
  );
};

export default RefListItem;
