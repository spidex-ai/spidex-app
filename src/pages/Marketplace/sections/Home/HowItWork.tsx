import How2Card from "../../components/How2Card";
import How2Explore from "@/assets/images/how2-explore.png";
import How2Deploy from "@/assets/images/how2-deploy.png";
import How2Automate from "@/assets/images/how2-automate.png";

export default function HowItWork() {
  const how2s = [
    {
      icon: <img src={How2Explore} alt="Explore icon" />, 
      title: "Explore & Choose an AI Agent", 
      description: "Design, customize, and deploy your AI agent with advanced functions, seamless integrations, and automation - tailored to your needs."
    },
    {
      icon: <img src={How2Deploy} alt="Deploy icon" />, 
      title: "Deploy & Configure", 
      description: "Publish your AI agent on the CAI Marketplace to reach more users. Optimize its profile, pricing, and category for visibility, and enhance it with a compelling description and visuals."
    },
    {
      icon: <img src={How2Automate} alt="Automate icon" />, 
      title: "Automate & Monetize", 
      description: "Turn your AI agent into a revenue stream! Track engagement, optimize performance, and refine it with real-time analytics and user feedback. Keep improving and watch your AI business grow!"
    }
  ];
  
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-text-secondary text-center">
        <p className="text-5xl mb-4">How It Works</p>
        <p className="mb-6 text-[21px]">
          Find out how to get started
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-18">
          {how2s.map((how2, index) => (
            <How2Card 
              key={index} 
              icon={how2.icon} 
              title={how2.title} 
              description={how2.description} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

