import { Arrow } from "@/assets";
import { Accordion } from "@chakra-ui/react";
import { useState } from "react";
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

const FAQ = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  return (
    <section className="flex items-center bg-background-black w-full relative overflow-hidden" id="faq">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 w-full lg:max-w-7xl">
        <div className="w-full p-10 my-10">
          <div className="text-center relative flex flex-col gap-10 mb-10 w-full">
            <MotionP 
              className="text-[54px] mx-auto text-white"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              FAQ
            </MotionP>
          </div>
          <Accordion.Root multiple w={"100%"} onValueChange={(v) => setActiveItems(v.value)}>
            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Accordion.Item key="point" value="point">
                <Accordion.ItemTrigger>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-2xl font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFFFFF 37%, #DBBADE 56%, #34FFD3 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>What is CAPI Point, and how does it work?</p>
                      <div className={`transform transition-transform duration-200 ${activeItems.includes("point") ? "rotate-180" : ""}`}>
                        <Arrow />
                      </div>
                    </div>
                    <div className={`w-full h-[1px] mt-8 mb-4 ${activeItems.includes("point") ? "hidden" : "block"}`} style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </div>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <p className="text-lg text-text-dark">
                      CAPI Point is the native point system of CAI, rewarding users for creating, deploying, and interacting with AI agents. You earn points by building AI, engaging with the platform, and participating in the ecosystem. Points can be redeemed for exclusive benefits, airdrops, and governance privileges in the future.
                    </p>
                    <div className="w-full h-[1px] mt-8 mb-4" style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Accordion.Item key="how2" value="how2">
                <Accordion.ItemTrigger>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-2xl font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFFFFF 37%, #DBBADE 56%, #34FFD3 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>How can I monetize my AI agent?</p>
                      <div className={`transform transition-transform duration-200 ${activeItems.includes("how2") ? "rotate-180" : ""}`}>
                        <Arrow />
                      </div>
                    </div>
                    <div className={`w-full h-[1px] mt-8 mb-4 ${activeItems.includes("how2") ? "hidden" : "block"}`} style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </div>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <p className="text-lg text-text-dark">
                      AI creators can earn through multiple revenue models:
                    </p>
                    <p className="text-lg text-text-dark pl-4">
                      <span className="text-white">• One-time sales</span> - Sell AI agents on the CAI Marketplace.
                    </p>
                    <p className="text-lg text-text-dark  pl-4">
                      <span className="text-white">• Subcriptions</span> - Charge recurring fees for AI-powered services.
                    </p>
                    <p className="text-lg text-text-dark  pl-4">
                      <span className="text-white">• Usage-based fees</span> - Earn per interaction or execution.
                    </p>
                    <p className="text-lg text-text-dark  pl-4">
                      <span className="text-white">• Tokenized AI</span> - Launch native tokens for governance and incentives.
                    </p>
                    <div className="w-full h-[1px] mt-8 mb-4" style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Accordion.Item key="how3" value="how3">
                <Accordion.ItemTrigger>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-2xl font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFFFFF 37%, #DBBADE 56%, #34FFD3 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>Can I earn without creating an AI agent?</p>
                      <div className={`transform transition-transform duration-200 ${activeItems.includes("how3") ? "rotate-180" : ""}`}>
                        <Arrow />
                      </div>
                    </div>
                    <div className={`w-full h-[1px] mt-8 mb-4 ${activeItems.includes("how3") ? "hidden" : "block"}`} style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </div>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <p className="text-lg text-text-dark">
                      Yes! You can stake AI tokens, refer users, or engage with AI agents to earn CAPI Point rewards.
                    </p>
                    <div className="w-full h-[1px] mt-8 mb-4" style={{
                      background: "linear-gradient(60deg, #00ccaa00 0%, #00CCAB 47%, #00ccaa00 100%)"
                    }} />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Accordion.Item key="how4" value="how4">
                <Accordion.ItemTrigger>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-2xl font-medium"
                        style={{
                          background: "linear-gradient(90deg, #FFFFFF 37%, #DBBADE 56%, #34FFD3 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>Is coding required to create an AI agent?</p>
                      <div className={`transform transition-transform duration-200 ${activeItems.includes("how4") ? "rotate-180" : ""}`}>
                        <Arrow />
                      </div>
                    </div>
                  </div>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <p className="text-lg text-text-dark">
                      No! CAI offers a no-code AI builder where you simply define your agent's functions, upload data, and customize behavior.
                    </p>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </MotionDiv>
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
