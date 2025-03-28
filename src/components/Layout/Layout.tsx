import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '../ui/sidebar';

const Layout = ({ isLandingPage }: { isLandingPage: boolean }) => {
  return (
    <div className={`min-h-screen flex ${!isLandingPage ? 'font-inter bg-background-grey' : 'bg-background-paper'}`}>
      <Sidebar />
      <main className="flex-1 pl-20 pt-10 bg-background">
          <Outlet />
          <Toaster />
      </main>
    </div>
  );
};


export default Layout; 