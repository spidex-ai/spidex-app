import { Hamburger, RocketLaunch, UserCheck } from "@/assets";
import { MainButton } from "@/components/Button";
import SpaceWalking from "@/assets/images/space-walking.png";

export default function Discover() {
  return (
    <div className="w-full text-text-secondary">
      <div className="max-w-7xl mx-auto mt-6 mb-6 pl-3">
        <Hamburger />
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-12 md:pb-16 flex justify-between items-center">
        {/* Left content column */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-[68px] font-medium text-text-secondary mb-4">
            Discover &<br />
            Deploy AI Agents
          </h1>

          <p className="text-text-secondary mb-6">
            Explore AI-Powered Agents Built For DeFi, NFTs,
            <br />
            Automation, And More. Buy, Deploy, And Monetize
            <br />
            AI Agents With Ease.
          </p>

          <MainButton className="flex items-center rounded-lg">
            <RocketLaunch className="w-5 h-5 mr-2" />
            Browse
          </MainButton>

          {/* Stats section */}
          <div className="flex mt-12 space-x-8 text-text-secondary">
            <div className="text-center md:text-left border-r border-background-grey-quaternary pr-12">
              <h3 className="text-[28px] font-bold">2120k+</h3>
              <p className="text-[21px]">AI Agents Listed</p>
            </div>

            <div className="text-center md:text-left border-r border-background-grey-quaternary pr-12">
              <h3 className="text-[28px] font-bold">100k+</h3>
              <p className="text-[21px]">Transactions</p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-[28px] font-bold">240k+</h3>
              <p className="text-[21px]">AI Developers</p>
            </div>
          </div>
        </div>

        {/* Right image column */}
        <div className="md:w-2/5">
          <div className="flex flex-col">
            <div className="rounded-t-lg overflow-hidden shadow-lg">
              <img
                src={SpaceWalking}
                alt="Space Walking - AI Agent"
                className="w-full h-auto"
              />
            </div>

            <div className="bg-white p-6 rounded-b-lg flex items-center">
              <div className="text-sm">
                <p className="font-medium text-[22px]">Space Walking</p>
                <div className="flex items-center mt-1">
                  <div className="w-5 h-5 rounded-full mr-2">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="">Creator Name</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
