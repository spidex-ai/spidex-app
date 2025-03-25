import { Ada } from "@/assets";
import "react-multi-carousel/lib/styles.css";
import DefaultAvatar from "@/assets/images/default-avt.png";
// Sample data for trending agents
const trendingAgents = [
  {
    id: 1,
    image: DefaultAvatar,
    title: 'Keep it real',
    totalSales: 4.5,
  },
  {
    id: 2,
    image: DefaultAvatar,
    title: 'CAI Agent Club',
    totalSales: 4.5,
  },
  {
    id: 3,
    image: DefaultAvatar,
    title: 'CAI Agent Club',
    totalSales: 4.5,
  },
  {
    id: 4,
    image: DefaultAvatar,
    title: 'CAI Agent Club',
    totalSales: 4.5,
  },
]

export default function TopCreator() {
  return (
    <div className="py-16 bg-gray-50 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-5xl mb-2">Top Ai Creators</h2>
          <p className="text-[21px]">Most the most innovative ai developers on the platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-18">
          {trendingAgents.map((agent) => (
            <div key={agent.id} className="p-4 bg-white rounded-3xl shadow-md flex flex-col gap-4 p-8">
              <div className="h-5 w-5 bg-primary-100 rounded-full flex items-center justify-center p-4">
                {agent.id}
              </div>
              <div className="flex items-center gap-2 rounded-full justify-center">
                <img src={agent.image} alt={agent.title} className="w-[140px] h-[140px]" />
              </div>
              <div className="flex items-center gap-2 justify-center flex-col">
                <p className="text-sm font-medium">{agent.title}</p>
                <p className="text-sm font-medium flex items-center gap-1">Total sales: <span className="font-bold">{agent.totalSales}</span> <Ada /> ADA</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

