import { FC } from "react";
import LogoSystemDiagram from "@/assets/images/logo-system-diagram.png";
import {
  Rocket,
  Diamond,
  Sheild,
  ArrowConnerLeft,
  ArrowConnerRight,
} from "@/assets";
import System from "@/assets/images/system.png";

interface SystemItemProps {
  icon: React.ReactNode;
  text: string | React.ReactNode;
  className?: string;
}

const SystemItem: FC<SystemItemProps> = ({ icon, text, className = "" }) => (
  <div
    className={`flex items-center gap-3 bg-white hover:bg-white/80 backdrop-blur-sm rounded-full p-2 w-[297px] cursor-pointer ${className} z-3`}
  >
    <span className="h-[58px]">{icon}</span>
    <span className="text-text-secondary whitespace-nowrap text-lg w-[153px] text-left">
      {text}
    </span>
  </div>
);

const SystemDiagram: FC = () => {
  return (
    <>
      <div className="lg:hidden sm:block md:block">
        <img src={System} alt="logo" className="w-full h-full" />
      </div>
      <div className="relative w-[1056px] h-[682px] lg:block sm:hidden md:block mx-auto translate-x-[2%] -translate-y-[12%]">
        <div className="absolute z-1 hover:opacity-80 transition-all duration-300">
          <img src={LogoSystemDiagram} alt="logo" />
        </div>
        <div className="absolute bottom-[23%] left-[48%] -translate-x-1/2 z-3">
          <SystemItem
            icon={<Sheild className="h-[58px]" />}
            text={
              <p className="pl-0">
                Secure & Transparents <br /> Infrastructure
              </p>
            }
          />
        </div>
        <div className="absolute left-[7%] top-[46%] -translate-y-1/2 z-2">
          <SystemItem
            icon={<Rocket className="h-[58px]" />}
            text={<p className="pl-4">Initial AI Offerings</p>}
          />
          <div className="absolute left-[48%] top-[100%]">
            <ArrowConnerLeft className="w-[150px] h-[150px]" />
          </div>
        </div>

        <div className="absolute right-[12%] top-[46%] -translate-y-1/2 z-2">
          <SystemItem
            icon={<Diamond className="h-[58px] z-1" />}
            text={
              <p className="pl-4">
                Tokenized AI <br /> Economies
              </p>
            }
          />
          <div className="absolute right-[45%] top-[100%]">
            <ArrowConnerRight className="w-[150px] h-[150px]" />
          </div>
        </div>

        <div className="absolute inset-0 bg-[#34FFD3] opacity-10 blur-[100px] rounded-full" />
      </div>
    </>
  );
};

export default SystemDiagram;
