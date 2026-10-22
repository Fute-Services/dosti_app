// import { Link, useLocation } from "react-router-dom";
// import { PiMapPinLight } from "react-icons/pi";
// import { BsFront, BsPentagon } from "react-icons/bs";

// import { TbBuildingSkyscraper } from "react-icons/tb";
// import { PiSparkleLight } from "react-icons/pi";

// import { BiBarChartAlt2 } from "react-icons/bi";


// type NavItemProps = {
//   item: {
//     id: number;
//     name: string;
//     path: string;
//     // icon: JSX.Element;
//     icon: React.ReactNode;
//   };
// };
// export default function Navbar() {
//   const location = useLocation();

//   const data = [
//     { id: 1, name: "360°", path: "/", icon: <BsPentagon /> },
//      { id: 2, name: "Project Highlights", path: "/project_highlights", icon:<BiBarChartAlt2 /> },
//     { id: 3, name: "Location", path: "/location", icon: <PiMapPinLight /> },
//     { id: 4, name: "Amenities", path: "/amenities", icon: <PiSparkleLight /> },
//     { id: 5, name: "Masterplan", path: "/masterplan", icon: <TbBuildingSkyscraper /> },
//     { id: 6, name: "Project Details", path: "/project_details", icon: <BsFront /> },
//   ];
//   const isHome = location.pathname === "/";




//   const NavItem = ({ item }: NavItemProps) => {
//     const isActive =
//       item.path === "/"
//         ? location.pathname === "/"
//         : location.pathname.startsWith(item.path);

//     return (

//       <Link to={item.path} className="">
//         <li
//           className={`
//           flex flex-col text-wrap items-center gap-1 m-2 p-1 lg:p-1 rounded-[18%]
//           transition-all duration-300 cursor-pointer mb-1 w-10 md:w-[40px] lg:w-[47px] text-center
//           ${isActive
//               ? "md:bg-white/20 text-white md:scale-105 shadow-lg"
//               : "text-gray-800 md:hover:bg-white/10 hover:text-white  md:hover:scale-105"
//             }
//         `}
//         >
//           <span className="text-sm md:text-lg lg:text-xl">{item.icon}</span>
//           <span className="text-[7px] md:text-[8px] lg:text-[9px] font-medium">{item.name}</span>
//         </li>
//       </Link>
//     );
//   };


//   return (
//     <>
//       {/* ================= DESKTOP (Left Vertical) ================= */}
//       <div className="hidden lg:block absolute top-1/2  left-[1.5%] z-30 -translate-y-1/2">
//         <div className="bg-black/30 backdrop-blur-xl border border-white/30 rounded-[40px] px-1 py-2 shadow-2xl animate-float">
//           <nav className="space-y-3">
//             {data.map(item => (
//               <NavItem key={item.id} item={item} />
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* ================= TABLET (Right Vertical) ================= */}
//       <div className="hidden md:block lg:hidden fixed top-1/2 -translate-y-1/2 left-2 z-30">
//         <div className="bg-black/30 backdrop-blur-xl border border-white/30 rounded-3xl p-2 shadow-xl">
//           <nav className="space-y-2">
//             {data.map(item => (
//               <NavItem key={item.id} item={item} />
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* ================= MOBILE (Bottom Bar) ================= */}
//       <div className={`md:hidden fixed   ${isHome ? "bottom-[7%] translate-y-[7%]" : "bottom-2"} left-1/2 -translate-x-1/2 z-40 w-[78%]`}>
//         <div className="bg-black/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
//           <nav className="flex justify-between items-center px-2">
//             {data.map(item => (
//               <NavItem key={item.id} item={item} />
//             ))}
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }


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
    icon: React.ReactNode;
  };
};

export default function Navbar() {
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

  const NavItem = ({ item }: NavItemProps) => {
    const isActive =
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);

    return (
      <Link to={item.path}>
        <li
          className={`
          flex flex-col items-center gap-[2px] p-[2px] 
          
          max-md:flex-1 max-md:min-w-0   /* ✅ MOBILE FIX */
          
          m-2 md:m-2 max-md:m-0
          
          lg:p-1 rounded-[18%]
          transition-all duration-300 cursor-pointer mb-1 text-center
          
          w-10 md:w-[40px] lg:w-[47px]   /* ✅ DESKTOP SAME */
          max-md:w-auto                 /* ✅ MOBILE OVERRIDE */
          
         ${isActive
              ? `
      text-black
      md:text-white
      lg:text-white
      md:bg-white/20
      md:scale-105
      shadow-lg
    `
              : `
      text-gray-300
      md:text-gray-800
      lg:text-black/70
      md:hover:bg-white/20
      md:hover:text-white
      md:hover:scale-105
    `
            }
        `}
        >
          {/* ICON */}
          <span className="text-sm md:text-lg lg:text-xl max-md:text-[12px]">
            {item.icon}
          </span>

          {/* TEXT */}
          <span className="text-[7px] md:text-[8px] lg:text-[9px] font-medium max-md:text-[9px] leading-tight">
            {item.name}
          </span>
        </li>
      </Link>
    );
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block absolute top-1/2 left-[1.5%] z-30 -translate-y-1/2">
        <div className="bg-black/35 backdrop-blur-xl border border-white/30 rounded-[40px] px-1 py-2 shadow-2xl animate-float">
          <nav className="space-y-3">
            {data.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* ================= TABLET ================= */}
      <div className="hidden md:block lg:hidden fixed top-1/2 -translate-y-1/2 left-2 z-30">
        <div className="bg-black/30 backdrop-blur-xl border border-white/30 rounded-3xl p-2 shadow-xl">
          <nav className="space-y-2">
            {data.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div
        className={`md:hidden fixed ${isHome ? "bottom-[15%] translate-y-[7%]" : "bottom-2"
          } left-1/2 -translate-x-1/2 z-40 w-[95%]`}  /* ✅ WIDTH FIX */
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl px-2 py-1">
          <nav className="flex justify-between items-center"> {/* ✅ FIX */}
            {data.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}