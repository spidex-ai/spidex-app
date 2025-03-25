import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Sidebar from './Sidebar';

const Layout = ({ isLandingPage }: { isLandingPage: boolean }) => {
  return (
    <div className={`min-h-screen flex flex-col ${!isLandingPage ? 'font-inter bg-background-grey' : 'bg-background-paper'}`}>
      <Sidebar />
      <main className="mx-auto w-full">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};


export default Layout; 