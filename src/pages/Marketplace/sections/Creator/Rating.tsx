import Avatar from "@/assets/images/default-avatar.png";
import { MainButton } from "@/components/Button";
import { CiStar } from "react-icons/ci";
import { GoStarFill } from "react-icons/go";
import { MdArrowOutward } from "react-icons/md";

export default function Rating() {
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
  const Comment = () => {
    return (
      <div className="flex flex-col gap-2 border-t border-background-grey-quinary py-12">
        <div className="flex gap-2">
          <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
            <img src={Avatar} alt="avatar" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Courtney Henry</p>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <GoStarFill className="w-4 h-4 text-primary-100" />
                <GoStarFill className="w-4 h-4 text-primary-100" />
                <GoStarFill className="w-4 h-4 text-primary-100" />
                <GoStarFill className="w-4 h-4 text-primary-100" />
                <GoStarFill className="w-4 h-4 text-primary-100" />
              </div>
              <p className="text-sm">15 Aug 2025</p>
            </div>
          </div>
        </div>
        <span className="">
          🌟🌟🌟🌟🌟 Amazing Experience! This app is super easy to use and makes
          payments seamless. The QR scan is fast, and transactions are secure. I
          love the smooth UI and instant notifications. Highly recommend it!
          🌟🌟🌟 Needs Improvement The app is good, but sometimes QR codes don’t
          scan properly. Hope they fix this soon!
        </span>
      </div>
    );
  };
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-10 px-16">
        <div className="mb-8 flex items-center justify-between pr-5">
          <p className="text-2xl font-medium mb-2">Ratings</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-background-paper p-2 rounded-lg">
            {renderStars(4.5)}
            <p className="text-text-senary">4.5/5</p>
          </div>
          <span className="text-text-senary">1,230 User Reviews</span>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <div className="flex gap-2">
            <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
              <img src={Avatar} alt="avatar" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium mb-2">
                Rate Your Experience with Crypto Bot
              </p>
              <p className="flex items-center gap-1">
                Your feedback helps us improve. Let us know what you think!
              </p>
              <div className="flex items-center gap-2">
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <textarea
              className="w-full border border-background-grey-quinary bg-background-grey-quinary rounded-lg p-4"
              placeholder="Tell us about your experience..."
            />
          </div>
          <div className="flex justify-end">
            <MainButton className="rounded-lg flex items-center gap-2 !px-16">
              Submit
              <MdArrowOutward className="" />
            </MainButton>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}
