import { useState } from "react";
import Capi from "@/assets/images/capi.png";
import { Play } from "@/assets";
import SystemBg from "@/assets/images/system-bg.png";
import SystemDiagram from "@/components/SystemDiagram";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

// MenuItem component to reduce repetition
interface MenuItemProps {
  index: number;
  activeItem: number;
  label: string;
  onClick: (index: number) => void;
  getOpacity: (index: number) => string;
}

const MenuItem = ({
  index,
  activeItem,
  label,
  onClick,
  getOpacity,
}: MenuItemProps) => {
  return (
    <MotionDiv 
      className="relative"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="rounded-full sm:hidden lg:block md:block bg-primary-300 w-[43px] h-[43px] flex items-center justify-center absolute -left-15 transition-all duration-500 ease-in-out"
        style={{
          opacity: activeItem === index ? 1 : 0,
          transform: `translate(${activeItem === index ? '0' : '-20px'}, -50%)`,
          top: '50%',
        }}
      >
        <Play />
      </div>
      <div
        className="rounded-xl py-3 px-15 cursor-pointer relative overflow-hidden"
        onClick={() => onClick(index)}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{
            background: 'linear-gradient(210deg, #34FFD3 0%, #00CCAB 46%, #DEA5E3 100%)',
            opacity: activeItem === index ? 1 : 0,
            transform: `translateX(${activeItem === index ? '0' : '-100%'})`,
          }}
        />
        {activeItem === index && (
          <div
            className="absolute w-[100px] h-[100px] rounded-t-full bg-[#34FFD3] transition-opacity duration-500 ease-in-out"
            style={{
              bottom: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px #34FFD3, 0 0 20px #34FFD3, 0 0 30px rgba(52, 255, 211, 0.7)",
              filter: "blur(100px)",
              opacity: activeItem === index ? 1 : 0,
            }}
          />
        )}
        <p
          className={`text-[21px] relative z-10 transition-all duration-500 ease-in-out ${
            activeItem === index ? "text-primary-300" : "text-white"
          }`}
          style={{
            opacity: getOpacity(index).includes("100") ? 1 : 
                    getOpacity(index).includes("60") ? 0.6 : 0.3
          }}
        >
          {label}
        </p>
      </div>
    </MotionDiv>
  );
};

const SystemSection = () => {
  const [activeItem, setActiveItem] = useState(2); // Default to "Earn points through activities"

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  // Function to determine opacity based on distance from active item
  const getOpacity = (index: number) => {
    if (index === activeItem) return "opacity-100";

    const distance = Math.abs(index - activeItem);
    if (distance === 1) return "opacity-60"; // Adjacent items
    return "opacity-30"; // Further items
  };

  // Menu items data
  const menuItems = [
    "Governance priviledges",
    "Stake with better rates",
    "Exclusive benefits & airdrops",
    "Redeem practical rewards",
    "Elite AI creator tier",
  ];

  return (
    <section className="flex items-center bg-background-black w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${SystemBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:max-w-full lg:max-w-7xl">
        <div className="w-full rounded-xl mx-auto p-20 sm:p-5 lg:p-20 my-10">
          <div className="text-center relative flex flex-col gap-10 mx-auto">
            <MotionP 
              className="lg:text-[54px] mx-auto text-white sm:text-[32px] "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              AIO Launchpad for AI Agents
            </MotionP>
            <MotionP 
              className="text-lg max-w-[600px] mx-auto text-white"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Enable AI Initial Offering with the ultimate launchpad for AI
              developers within the Cardano ecosystem.
            </MotionP>
            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SystemDiagram />
            </MotionDiv>
            <div
              className="absolute w-[100px] h-[50px] rounded-t-full bg-[#34FFD3]"
              style={{
                bottom: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow:
                  "0 0 10px #34FFD3, 0 0 20px #34FFD3, 0 0 30px rgba(52, 255, 211, 0.7)",
                filter: "blur(100px) ",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
        <div className="mb-5 bg-background-dark rounded-lg relative overflow-hidden">
          <div className="flex gap-10 mt-5 justify-between pt-10 sm:flex-col lg:flex-row lg:pt-10 sm:pt-2">
            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-[54px] text-white max-w-[590px] text-left  lg:pl-20 sm:pl-5">
                CAPI Point
              </p>
              <p className="text-[21px] text-text-dark max-w-[351px] text-left pt-8  lg:pl-20 sm:pl-5">
                Earn CAPI points through activities for more benefits!
              </p>
              <img src={Capi} alt="system" />
            </MotionDiv>
            <div className="flex flex-col gap-5 items-center relative md:pr-20 md:py-10 sm:pr-0 sm:pl-2 sm:px-10">
              {menuItems.map((label, index) => (
                <MenuItem
                  key={index}
                  index={index}
                  activeItem={activeItem}
                  label={label}
                  onClick={handleItemClick}
                  getOpacity={getOpacity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
