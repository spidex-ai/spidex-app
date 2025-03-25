import { MainButton } from "@/components/Button";
import AiCard from "../../components/AiCard";
import { MdArrowOutward } from "react-icons/md";

const defaultAvt = "https://via.placeholder.com/150";
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
];
export default function SimilarAiAgents() {
  return (
    <div className="py-16 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between pr-5">
          <p className="text-5xl mb-2">Similar AI Agents</p>
          <MainButton className="rounded-lg flex items-center gap-2 bg-white !text-background-paper">
            View more
            <MdArrowOutward className="" />
          </MainButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingAgents.map((agent) => (
            <AiCard key={agent.id} {...agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
