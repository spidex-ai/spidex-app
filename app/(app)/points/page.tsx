'use client'
import React from "react";
import PointInformation from "./_components/point-information";
import Missions from "./_components/missions";
import History from "./_components/history";


const PointsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full h-full max-h-full overflow-y-auto px-1">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <PointInformation />
     
      <Missions />
      <History />
    </div>
  );
};

export default PointsPage;
