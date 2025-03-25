import AiListBg from "@/assets/images/ai-list-bg.png";
import { MainButton } from "@/components/Button";
import { MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { MenuContent, MenuItem, MenuPositioner } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import AiCard from "./components/AiCard";
const defaultAvt = "https://via.placeholder.com/150";
const groupByOptions = [
  {
    label: "All categories",
    value: "all",
  },
  {
    label: "Defi",
    value: "defi",
  },
  {
    label: "Finance",
    value: "finance",
  },
  {
    label: "Crypto",
    value: "crypto",
  },
  {
    label: "NFT & Digital Assets",
    value: "nft",
  },
  {
    label: "GameFi",
    value: "gamefi",
  },
  {
    label: "Oracles & Data Feeds",
    value: "oracles",
  },
  {
    label: "AI Chatbots & VA",
    value: "ai-chatbots",
  },
];
const listOptions = [
  {
    label: "Ai agents",
    value: "ai-agents",
  },
  {
    label: "Owned",
    value: "owned",
  },
];
const trendingAgents = [
  {
    id: 1,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 2,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 3,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 4,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 5,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 6,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 7,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 8,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
  {
    id: 9,
    image: defaultAvt,
    title: "CAI Agent Club",
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: "DeFi",
    summary:
      "TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.",
    creator: {
      name: "Ava Lee",
      avatar: "/images/avatars/ava-lee.jpg",
    },
  },
];
export default function AiList() {
  const [groupBy, setGroupBy] = useState(groupByOptions[0]);
  const [list, setList] = useState(listOptions[0]);
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[482px]">
        <img src={AiListBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 text-text-secondary flex justify-between">
          <div className="flex gap-8 items-center">
            {listOptions.map((option) => (
              <div className="flex flex-col justify-between gap-2">
                <div
                  className={`w-full h-[5px] ${
                    list.value === option.value
                      ? "bg-linear-to-r from-secondary-200 to-primary-100"
                      : ""
                  }`}
                ></div>
                <div
                  key={option.value}
                  className={`flex gap-2 items-center cursor-pointer ${
                    list.value === option.value
                      ? "text-text-secondary"
                      : "text-text-quinary"
                  }`}
                  onClick={() => setList(option)}
                >
                  <span className="text-[21px]">{option.label}</span>
                  <span
                    className={`text-[21px] p-2 px-4 rounded-full ${
                      option.value === list.value
                        ? "bg-linear-to-r from-secondary-200 to-primary-100 text-text-secondary"
                        : "bg-background-grey-senary text-white"
                    }`}
                  >
                    {option.value === "ai-agents" ? "302" : "67"}
                  </span>
                </div>
                <div></div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <span>Group by:</span>
            <MenuRoot>
              <MenuTrigger>
                <MainButton className="rounded-lg flex items-center gap-2 !bg-primary-100 text-primary-300">
                  {groupBy.label}
                  <IoMdArrowDropdown />
                </MainButton>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent>
                  {groupByOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setGroupBy(option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuPositioner>
            </MenuRoot>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 text-text-secondary mt-6">
        <div className="grid grid-cols-3 gap-6 w-full">
          {trendingAgents.map((agent) => (
            <AiCard key={agent.id} {...agent} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <MainButton className="rounded-lg bg-white text-primary-300">
            Load more
          </MainButton>
        </div>
      </div>
    </div>
  );
}
