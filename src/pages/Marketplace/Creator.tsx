import { Hamburger } from "@/assets";
import BgInfoCreator from "@/assets/images/bg-info-creator.png";
import Avatar from "@/assets/images/default-avatar.png";
import { CiStar, CiSettings } from "react-icons/ci";
import {
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GoStarFill, GoGoal, GoDotFill } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { FaList } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { MainButton } from "@/components/Button";
import MoreFromCreator from "./sections/Creator/MoreFromCreator";
import SimilarAiAgents from "./sections/Creator/SimilarAiAgents";

export default function Creator() {
  const renderStars = (rating: number) => {
    const stars = [];
    const hasHalfStar = 5 - rating !== 0;

    // Full stars
    for (let i = 0; i < rating; i++) {
      stars.push(
        <GoStarFill key={`star-${i}`} className="w-4 h-4 text-primary-100" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <CiStar key="half-star" className="w-5 h-5 text-primary-100" />
      );
    }

    return stars;
  };
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
          <div className="flex flex-col gap-6">
            {/* Profile Section */}
            <div className="flex-shrink-0 p-14 bg-background-tertiary rounded-t-2xl">
              <div className="flex gap-4 justify-between">
                <div className="flex gap-10 items-center">
                  <div className="w-[160px] h-[160px] rounded-full overflow-hidden">
                    <img
                      src={Avatar}
                      alt="CAI Agent Club"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-4xl font-medium mb-2">
                        CAI Agent Club
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[21px]">Rating:</span>
                        {renderStars(4)}
                        <span className="text-[21px]">(4/5)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[21px]">
                        <span>Number of Uses: 1,234,345</span>
                        <HiMiniUsers />
                      </div>
                      <div className="mt-1 text-[21px]">Category: Defi</div>
                    </div>
                  </div>
                </div>

                {/* Created By Section */}
                <div className="flex gap-4 flex-col">
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-[21px]">Created by:</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={Avatar}
                        alt="Cardno Dev"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-[21px]">Cardno Dev</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <FaGlobe className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                    <FaDiscord className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                    <FaYoutube className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                    <FaTwitter className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                    <FaInstagram className="text-gray-600 text-xl hover:text-blue-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-grow p-14">
              {/* Overview Section */}
              <div className="flex gap-4">
                <p className="text-2xl font-medium mb-4 w-1/5">Overview</p>

                <div className="space-y-6 flex flex-col gap-4">
                  <div>
                    <p className="text-lg mb-2 font-medium flex items-center gap-3">
                      <FaList className="text-primary-100" />
                      Short Summary
                    </p>
                    <p className="text-lg pl-8">
                      Instantly evaluates NFT collections and provides rarity
                      scores to help you make informed buying decisions.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-medium mb-2 flex items-center gap-2">
                      <CiSettings className="text-primary-100" />
                      Primary Functions
                    </p>
                    <ul className="list-disc ml-6 text-lg space-y-1">
                      <li className="text-lg pl-1">Market Analysis</li>
                      <li className="text-lg pl-1">Risk Management</li>
                      <li className="text-lg pl-1">Trade Execution</li>
                      <li className="text-lg pl-1">Portfolio Optimization</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-lg font-medium mb-2 flex items-center gap-2">
                      <GoGoal className="text-primary-100" />
                      Goals
                    </p>
                    <ul className="list-disc ml-6 text-lg space-y-1">
                      <li className="text-lg pl-1">
                        Help users automate crypto trades
                      </li>
                      <li className="text-lg pl-1">
                        Minimize risks with AI-driven strategies
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <MainButton className="rounded-lg flex items-center gap-2">
                      <GoDotFill className="" />
                      Live demo
                    </MainButton>
                    <MainButton className="rounded-lg flex items-center gap-2">
                      <IoEyeOutline className="" />
                      View detail
                    </MainButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MoreFromCreator />
        <SimilarAiAgents />
      </div>
    </div>
  );
}
