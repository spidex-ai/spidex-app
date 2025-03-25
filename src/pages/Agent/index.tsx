import { FC, useState, useEffect } from "react";
import MainLogo from "@/assets/images/main-logo.png";
import { Blink2 } from "@/assets";
import { CiSearch } from "react-icons/ci";
import CardAgent from "./components/CardAgent";
import DefaultAvatar from "@/assets/images/default-avt.png";
import { AgentInfo } from "@/service/agent.service";
import { toaster } from "@/components/ui/toaster"
import { agentService } from "@/service/agent.service";
import { useNavigate } from "react-router-dom";
const Agent: FC = () => {
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const response = await agentService.listAgents();
        setAgents(response);
        toaster.create({
          title: "Agents fetched successfully",
        })
      } catch (error) {
        console.error(error);
        toaster.create({
          title: "Error fetching agents",
        })
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div
      className="min-h-screen p-8 max-w-7xl mx-auto text-text-secondary relative "
      style={{
        backgroundImage: `url(${MainLogo})`,
        backgroundSize: "contain",
        backgroundPosition: "top 8% right 50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute w-[20%] h-[20%] rounded-t-full bg-white transition-opacity duration-500 ease-in-out z-0"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow:
            "0 0 10pxrgb(255, 255, 255), 0 0 20px rgb(255, 255, 255), 0 0 30px rgba(255, 255, 255, 0.7)",
          filter: "blur(30px)",
        }}
      />
      <div className="flex flex-col items-center mt-26 relative">
        <div className="relative">
          <p className="text-7xl font-medium mt-4">My AI Agents</p>
          <div className="absolute -right-6 top-4">
            <Blink2 />
          </div>
        </div>
        <p className="text-7xl font-medium mt-1">My AI Chatbots</p>
        <p className="text-[21px] text-center mt-2">
          Here are all your AI agents. You can view and customize,
          <br /> any of your agents.
        </p>
        <div className="relative mt-6">
          <CiSearch className="absolute left-1/2 top-1/2 -translate-x-[270px] -translate-y-1/2 text-text-secondary text-2xl" />
          <input
            type="text"
            placeholder="Search By Agent Name Or Topic"
            className="w-[550px] text-sm p-4 text-center rounded-lg border-none bg-white text-black outline-none transition-colors"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-20">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">

            </div>
          ) : (
            agents.map((agent) => (
              <CardAgent
                key={agent.id}
                avatar={DefaultAvatar}
                name={agent.name}
                description={agent.description || ""}
                lastUpdate={agent.updatedAt || ""}
                onCustomize={() => {
                  navigate(`/app/agent/${agent.id}`);
                }}
              />

            )))}
        </div>
      </div>
    </div>
  );
};

export default Agent;
