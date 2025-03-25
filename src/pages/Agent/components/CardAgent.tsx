import { MainButton } from "@/components/Button";
import { FC } from "react";

interface CardAgentProps {
  avatar: string;
  name: string;
  description: string;
  lastUpdate: string;
  onCustomize: () => void;
}

const CardAgent: FC<CardAgentProps> = ({
  avatar,
  name,
  description,
  lastUpdate,
  onCustomize
}) => {
  return (
    <div
      className="bg-white rounded-xl h-[300px] min-w-[250px] justify-between p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-shadow relative"
    >
      <div className="flex items-center gap-4 absolute -top-10 right-1/3">
        <img
          src={avatar}
          alt={name}
          className="rounded-full object-cover"
        />
      </div>
      <p className="text-lg font-medium mt-10">{name}</p>
      <div>

        <p className="text-gray-700 text-sm line-clamp-4 text-center">
          {description}
        </p>
        <p className="text-sm text-center">Last updated: {lastUpdate}</p>
      </div>

      <MainButton
        onClick={onCustomize}
        className='text-sm'
      >
        Customize
      </MainButton>
    </div>
  );
};

export default CardAgent;
