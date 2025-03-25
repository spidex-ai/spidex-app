import Discover from "./sections/Home/Discover";
import HowItWork from "./sections/Home/HowItWork";
import DiscoverMore from "./sections/Home/DiscoverMore";
import TopCreator from "./sections/Home/TopCreator";
import Trending from "./sections/Home/Trending";
import Browse from "./sections/Home/Browse";

export default function Marketplace() {
  return <div>
   <Discover />
   <HowItWork />
   <Trending />
   <DiscoverMore />
   <TopCreator />
   <Browse />

  </div>;
}

