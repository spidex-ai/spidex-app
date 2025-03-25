import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AiCard from "../../components/AiCard";
const defaultAvt = "https://via.placeholder.com/150";
// Sample data for trending agents
const trendingAgents = [
  {
    id: 1,
    image: defaultAvt,
    title: 'CAI Agent Club',
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: 'DeFi',
    summary: 'TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.',
    creator: {
      name: 'Ava Lee',
      avatar: '/images/avatars/ava-lee.jpg'
    }
  },
  {
    id: 2,
    image: defaultAvt,
    title: 'CAI Agent Club',
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: 'DeFi',
    summary: 'TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.',
    creator: {
      name: 'Ava Lee',
      avatar: '/images/avatars/ava-lee.jpg'
    }
  },
  {
    id: 3,
    image: defaultAvt,
    title: 'CAI Agent Club',
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: 'DeFi',
    summary: 'TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.',
    creator: {
      name: 'Ava Lee',
      avatar: '/images/avatars/ava-lee.jpg'
    }
  },
  {
    id: 4,
    image: defaultAvt,
    title: 'CAI Agent Club',
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: 'DeFi',
    summary: 'TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.',
    creator: {
      name: 'Ava Lee',
      avatar: '/images/avatars/ava-lee.jpg'
    }
  },
  {
    id: 5,
    image: defaultAvt,
    title: 'CAI Agent Club',
    rating: 4.5,
    totalRatings: 5,
    usageCount: 1234345,
    category: 'DeFi',
    summary: 'TaskGenie is an AI-powered autonomous agent designed to streamline your workflow and boost productivity.',
    creator: {
      name: 'Ava Lee',
      avatar: '/images/avatars/ava-lee.jpg'
    }
  }
];

// Responsive configuration for the carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 3,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export default function DiscoverMore() {
  return (
    <div className="py-16 bg-gray-50 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-5xl mb-2">Discover More AI Agents</h2>
          <p className="text-[21px]">Futured AI Agents</p>
        </div>
        
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list"
          itemClass="px-2"
          centerMode={false}
        >
          {trendingAgents.map(agent => (
            <div key={agent.id} className="px-2">
              <AiCard
                image={agent.image}
                title={agent.title}
                rating={agent.rating}
                totalRatings={agent.totalRatings}
                usageCount={agent.usageCount}
                category={agent.category}
                summary={agent.summary}
                creator={agent.creator}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

