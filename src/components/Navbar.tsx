import { MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LogoIcon } from "../assets";
import PrimaryButton from "./Button";
import ConnectWallet from "./Layout/ConnectWallet";

type RouteItem = {
  label: string;
  href: string;
  onClick?: () => void;
  children?: Array<{ label: string; href: string }>;
};

const Navbar = ({ isLandingPage }: { isLandingPage: boolean }) => {
  const routesLandingPage: RouteItem[] = [
    {
      label: "Features",
      href: "/#",
      onClick: () => {
        const item = document.getElementById("features");
        if (item) {
          item.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      label: "Documents",
      href: "/#",
    },
    {
      label: "FAQ",
      href: "/#",
      onClick: () => {
        const item = document.getElementById("faq");
        if (item) {
          item.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      label: "Social",
      href: "#",
      children: [
        // {
        //   label: "About",
        //   href: "/about",
        // },
      ],
    },
  ];

  const routes: RouteItem[] = [
    {
      label: "Create Agent",
      href: "/app/create-agent",
    },
    {
      label: "Marketplace",
      href: "/app/marketplace",
    },
    {
      label: "More",
      href: "/#",
      children: [
        // {
        //   label: "About",
        //   href: "/about",
        // },
      ],
    },
    {
      label: "AIO",
      href: "/aio",
    },
  ];

  return (
    <nav className={`${!isLandingPage ? 'bg-white' : 'bg-background-black'} text-text-primary` }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center min-h-[100px]">
          <div className="flex-shrink-0 md:pr-12">
            <Link to={isLandingPage ? "/" : "/app"} className="font-bold text-xl">
              <LogoIcon />
            </Link>
          </div>
          <div className="hidden md:block md:grow md:px-12">
            <div className={`mx-3 flex items-center lg:flex md:hidden space-x-4 gap-14 ${!isLandingPage ? 'justify-start' : 'justify-end'}`}>
              {(isLandingPage ? routesLandingPage : routes).map(
                (route, index) =>
                  route.children ? (
                    <MenuRoot key={route.label + index}>
                      <MenuTrigger asChild>
                        <Link to="#" className={`${!isLandingPage ? 'text-background-paper' : 'text-white'} flex items-center hover:text-text-dark`}>
                          {route.label}
                          <FaChevronDown className="ml-1" />
                        </Link>
                      </MenuTrigger>
                      {/* <MenuContent>
                        {route.children.map((child) => (
                          <MenuItem
                            key={child.label}
                            value={child.label}
                            asChild
                          >
                            <Link to={child.href}><p className="text-lg">{child.label}</p></Link>
                          </MenuItem>
                        ))}
                      </MenuContent> */}
                    </MenuRoot>
                  ) : (
                    <Link 
                      to={route.href} 
                      className={`${!isLandingPage ? 'text-background-paper' : 'text-white'} hover:text-text-dark`} 
                      onClick={route.onClick ? () => route.onClick!() : undefined}
                    >
                      {route.label}
                    </Link>
                  )
              )}
            </div>
          </div>
          <div className="">
            {!isLandingPage ? (
              <ConnectWallet />
            ) : (
              <PrimaryButton className="px-12" onClick={() => {}}>Lauch App</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
