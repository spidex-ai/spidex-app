import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const defaultAvt = "https://via.placeholder.com/150";
// Sample data for trending agents
const trendingAgents = [
  {
    id: 1,
    image: defaultAvt,
    title: 'DeFi',
    
  },
  {
    id: 2,
    image: defaultAvt,
    title: 'Finance',
    
  },
  {
    id: 3,
    image: defaultAvt,
    title: 'Crypto',
    
  },
  {
    id: 4,
    image: defaultAvt,
    title: 'GameFi',
  },
  {
    id: 5,
    image: defaultAvt,
    title: 'NFT',
  },
];

// Responsive configuration for the carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 4,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 4,
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

export default function Browse() {
  return (
    <div className="py-16 bg-gray-50 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-5xl mb-2">Browse Categories</h2>
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
              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-center gap-2">
                  <img src={agent.image} alt={agent.title} className="w-[267px] h-[240px] rounded-full" />
                </div>
                <p className="text-[21px] font-medium">{agent.title}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

