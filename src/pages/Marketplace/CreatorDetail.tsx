import { Hamburger } from "@/assets";
import BgInfoCreator from "@/assets/images/bg-info-creator.png";
import Avatar from "@/assets/images/default-avatar.png";
import { MainButton } from "@/components/Button";
import { useState } from "react";
import {
  FaCopy,
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiMiniUsers, HiSparkles } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";
import AiCard from "./components/AiCard";

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
const listOptions = [
  {
    label: "Created",
    value: "created",
  },
  {
    label: "Owned",
    value: "owned",
  },
];
export default function CreatorDetail() {
  const [list, setList] = useState(listOptions[0]);

  return (
    <div className="min-h-screen">
      <div
        className="relative h-[482px]"
        style={{
          backgroundImage: `url(${BgInfoCreator})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto pt-4">
          <Hamburger />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-text-secondary">
        <div className="bg-white rounded-2xl shadow-lg -mt-40 relative">
          <div className="flex flex-col">
            {/* Profile Section */}
            <div className="flex-shrink-0 p-14 rounded-t-2xl">
              <div className="flex gap-4 justify-between">
                <div className="flex justify-between gap-10">
                  <div className="w-[160px] h-[160px] rounded-full overflow-hidden">
                    <img
                      src={Avatar}
                      alt="CAI Agent Club"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-5/6">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-4xl font-medium ">CAI Agent Club</p>
                      <div className="flex gap-6">
                        <MainButton className="rounded-lg flex items-center gap-2">
                          <span>0x1234567890</span>
                          <FaCopy />
                        </MainButton>
                        <MainButton className="rounded-lg">
                          Edit Profile
                        </MainButton>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <FaGlobe className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                      <FaDiscord className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                      <FaYoutube className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                      <FaTwitter className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                      <FaInstagram className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                    </div>
                    <p className="mt-1 text-lg font-medium">Biography</p>
                    <p className="text-lg">
                      With a strong background in machine learning, NLP, and
                      automation, I thrive on creating AI solutions that make
                      technology more accessible and efficient.
                    </p>
                    <div className="flex gap-12 mt-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <HiSparkles />
                          <span className="text-2xl font-medium">250+</span>
                        </div>
                        <p className="text-lg">Agents created</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <IoIosStar />
                          <span className="text-2xl font-medium">4.8/5</span>
                        </div>
                        <p className="text-lg">Average ratings</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <HiMiniUsers />
                          <span className="text-2xl font-medium">
                            1,444,444
                          </span>
                        </div>
                        <p className="text-lg">Total users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full">
              {/* Overview Section */}
              <div className="flex gap-8 items-center">
                {listOptions.map((option) => (
                  <div className="flex flex-col justify-between gap-2 w-1/2">
                    <div
                      className={`w-full h-[5px] ${
                        list.value === option.value
                          ? "bg-linear-to-r from-secondary-200 to-primary-100"
                          : ""
                      }`}
                    ></div>
                    <div
                      key={option.value}
                      className={`flex gap-2 justify-center items-center cursor-pointer ${
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 w-full mt-16">
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
