import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '../ui/sidebar';

const Layout = ({ isLandingPage }: { isLandingPage: boolean }) => {
  return (
    <div className={`min-h-screen flex ${!isLandingPage ? 'font-inter bg-background-grey' : 'bg-background-paper'}`}>
      <Sidebar />
      <main className="flex-1 pt-10 pr-20 bg-background pl-[350px]">
          <Outlet />
          <Toaster />
      </main>
    </div>
  );
};


export default Layout; 