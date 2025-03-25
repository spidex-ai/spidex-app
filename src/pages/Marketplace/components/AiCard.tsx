import { CiStar } from "react-icons/ci";
import { GoStarFill } from "react-icons/go";

interface AiCardProps {
  image: string;
  title: string;
  rating: number;
  totalRatings: number;
  usageCount: number;
  category: string;
  summary: string;
  creator: {
    name: string;
    avatar: string;
  };
}

export default function AiCard({
  image,
  title,
  rating,
  totalRatings,
  usageCount,
  category,
  summary,
  creator
}: AiCardProps) {
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
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

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-[369px] text-text-secondary">
      {/* Card image - fixed size 369x300 */}
      <div className="relative w-full h-[300px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Creator info overlay */}
        <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 text-white text-xs p-2 rounded-full">
          <img src={creator.avatar} alt={creator.name} className="w-5 h-5 rounded-full mr-2" />
          <span>{creator.name}</span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2 items-center">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500">({totalRatings})</span>
        </div>

        {/* Usage count */}
        <div className="text-sm mb-2">
          <span className="font-medium">Number of Uses:</span> {formatNumber(usageCount)}
        </div>

        {/* Category */}
        <div className="text-sm mb-3">
          <span className="font-medium">Category:</span> {category}
        </div>

        {/* Summary */}
        <div className="text-sm text-gray-600 line-clamp-2">
          <span className="font-medium">Summary:</span> {summary}
        </div>
      </div>
    </div>
  );
}
