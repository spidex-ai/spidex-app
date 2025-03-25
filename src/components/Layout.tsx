import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster"
const Layout = ({ isLandingPage }: { isLandingPage: boolean }) => {
  return (
    <div className={`min-h-screen flex flex-col ${!isLandingPage ? 'font-inter bg-background-grey' : 'bg-background-paper'}`}>
      <Navbar isLandingPage={isLandingPage} />
      <main className="mx-auto w-full">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};


export default Layout; 