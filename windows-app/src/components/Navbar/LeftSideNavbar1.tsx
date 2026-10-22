import { Link, useLocation } from "react-router-dom";
import { PiMapPinLight } from "react-icons/pi";
import { BsFront, BsPentagon } from "react-icons/bs";

import { TbBuildingSkyscraper } from "react-icons/tb";
import { PiSparkleLight } from "react-icons/pi";

import { BiBarChartAlt2 } from "react-icons/bi";


type NavItemProps = {
  item: {
    id: number;
    name: string;
    path: string;
    // icon: JSX.Element;
    icon: React.ReactNode;
  };
};
export default function Navbar1() {
  const location = useLocation();

  const data = [
    { id: 1, name: "360°", path: "/", icon: <BsPentagon /> },
    { id: 2, name: "Project Highlights", path: "/project_highlights", icon: <BiBarChartAlt2 /> },
    { id: 3, name: "Location", path: "/location", icon: <PiMapPinLight /> },
    { id: 4, name: "Amenities", path: "/amenities", icon: <PiSparkleLight /> },
    { id: 5, name: "Masterplan", path: "/masterplan", icon: <TbBuildingSkyscraper /> },
    { id: 6, name: "Project Details", path: "/project_details", icon: <BsFront /> },
  ];
  const isHome = location.pathname === "/";
  const isLocationPage = location.pathname === "/location";


  const NavItem = ({ item }: NavItemProps) => {
    const isActive =
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);

    return (
      <Link to={item.path}>
        <li
          className={`
          flex flex-col text-wrap items-center gap-1 m-1 py-2 px-1 lg:p-1 lg:m-2 rounded-[18%]
          transition-all duration-300 cursor-pointer mb-1 w-10 md:w-[35px] lg:w-[53px] text-center
          ${isActive
              ? "md:bg-white/20  text-white md:scale-105 shadow-lg"
              : "text-gray-800 md:hover:bg-white/10 hover:text-gray-100 text-white/60  md:hover:scale-105"
            }
        `}
        >
          <span className="text-sm lg:text-xl">{item.icon}</span>
          <span className="text-[6px] lg:text-[10px] font-medium">{item.name}</span>
        </li>
      </Link>
    );
  };


  return (
    <>
      {/* ================= DESKTOP (Left Vertical) ================= */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2  left-[2%] z-30">
        <div className="bg-[#a99976]/10  backdrop-blur-xl  border border-white/30 rounded-[40px] px-0 py-2 shadow-2xl animate-float">
          <nav className="space-y-3">
            {data.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* ================= TABLET (Right Vertical) ================= */}
      <div className={`hidden 
  ${isLocationPage ? "md:hidden" : "md:block"} 
  lg:hidden fixed top-1/2 -translate-y-1/2 left-2 z-30`}>
        <div className="bg-black/30 backdrop-blur-xl border border-white/30 rounded-3xl p-2 shadow-xl">
          <nav className="space-y-2">
            {data.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* ================= MOBILE & TABLET (BOTTOM BAR) ================= */}
      <div
        className={`
    /* Core Layout & Positioning */
    fixed left-1/2 -translate-x-1/2 z-40 w-[55%] lg:hidden
    
    /* Show logic: Always flex on Mobile, hidden on Tablet UNLESS Location Page */
    flex ${isLocationPage ? "md:flex" : "md:hidden"} 
    
    /* Dynamic Bottom Spacing */
    ${(isHome ) ? "bottom-20" : "bottom-2"} 
    
    /* Smooth transitions */
    transition-all duration-300 ease-in-out
  `}
      >
        <div className="w-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-[24px] shadow-2xl px-2 py-0">
          <nav className="flex justify-around items-center">
            {data.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
