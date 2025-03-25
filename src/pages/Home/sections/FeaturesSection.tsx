import Section2 from "@/assets/images/section2.png";
import {
  ArrowUp,
  DeployYourAgent,
  FinishTheTemple,
  IntegrateYourAgent,
} from "../../../assets";
import PrimaryButton from "../../../components/Button";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Deploy AI agent",
      description: "Select deployment type: Verifiable or Non-verifiable",
      icon: <DeployYourAgent />,
      className: "bg-primary-300",
    },
    {
      title: "Finish the temple",
      description: "Complete the form to describe your AI agent ideas",
      icon: <FinishTheTemple />,
      className: "bg-secondary-100",
    },
    {
      title: "Integrate AI  Agent",
      description:
        "Link your agent with your social media: X, Telegram, Discord",
      icon: <IntegrateYourAgent />,
      className: "bg-success-100",
    },
  ];

  return (
    <section className="flex items-center bg-background-tertiary w-full relative" id="features">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${Section2})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      <div className="lg:max-w-7xl md:w-full sm:w-full w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-40">
        <MotionDiv
          className="text-center relative flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MotionP
            className="lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] mx-auto text-text-secondary"
            variants={itemVariants}
          >
            Create & Deploy AI Agents
          </MotionP>
          <MotionP
            className="lg:text-[21px] md:text-[18px] sm:text-[10px] max-w-[680px] mx-auto text-text-secondary "
            variants={itemVariants}
          >
            Turn ideas into powerful AI Agents that tackle real-world
            challenges. Train and deploy versatile agents effortlessly with CAI
            Agent Builder.
          </MotionP>
          <MotionDiv
            className="flex flex-wrap lg:flex-row sm:flex-col lg:justify-center sm:justify-left gap-8 mx-auto lg:rounded-full sm:rounded-md py-4 px-8 bg-white shadow-xs mt-10 "
            variants={itemVariants}
          >
            <span
              className="text-lg font-bold text-left"
              style={{
                background: "linear-gradient(315deg, #003038 0%, #34ffd3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              • No-code implementation
            </span>
            <span
              className="text-lg font-bold text-left"
              style={{
                background: "linear-gradient(315deg, #003038 0%, #34ffd3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              • Data integration for smarter Agents
            </span>
            <span
              className="text-lg font-bold text-left"
              style={{
                background: "linear-gradient(315deg, #003038 0%, #34ffd3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              • Seamless process
            </span>
            <span
              className="text-lg font-bold text-left"
              style={{
                background: "linear-gradient(315deg, #003038 0%, #34ffd3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              • Easy customization
            </span>
          </MotionDiv>
          <MotionDiv
            className="flex w-full gap-10 mt-10 lg:flex-row md:flex-row sm:flex-col flex-col"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                className="w-full lg:w-1/3 md:w-1/3 sm:w-full flex flex-col justify-between p-8 rounded-2xl bg-white shadow-xs"
                variants={itemVariants}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] max-w-[150px] text-text-secondary text-left">
                      {feature.title}
                    </p>
                    <div className="flex-shrink-0">{feature.icon}</div>
                  </div>
                  <div className="flex flex-col gap-4 mt-20">
                    <p className="text-lg text-text-secondary text-left">
                      {feature.description}
                    </p>
                    <PrimaryButton className="bg-text-secondary">
                      <p className="text-primary-100 text-lg flex items-center justify-center gap-2 p-1">
                        Get Started <ArrowUp />
                      </p>
                    </PrimaryButton>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default FeaturesSection;
