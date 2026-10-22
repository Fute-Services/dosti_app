
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import LeftSideNavbar from './components/Navbar/LeftSideNavbar';
import LeftSideNavbar1 from './components/Navbar/LeftSideNavbar1';

import Header from './components/Navbar/Header'
import Desclaimer from './pages/RightPanel/Desclaimer';
import AboutNew from './pages/RightPanel/AboutNew';
import Tie_up from './pages/RightPanel/Tie_up';
import Aminities from './pages/Aminities';
import MasterPlanPage1 from './pages/MasterPlanPage1';
import LocationPage1 from './pages/LocationPage1';
import GoBackButton from './components/GoBackButton';
import GoBack from './components/GoBack';
import WalkthroughPage from './pages/WalkthroughPage';
import InventoryPage1 from './pages/InventoryPage1';
import UnitPlanPage from './pages/Inventory/UnitPlanPage';
import FloorPlanPage from './pages/Inventory/FloorPlanPage';
// import ProjectHighlights from './pages/Project_Highlights';
import ProjectHighLights from './pages/ProjectHighLights'
import Testimonials from './pages/RightPanel/Testimonials';
import Specification from './pages/RightPanel/Specification'
// import Testimonials from './pages/RightPanel/FeedBack';

import BuildingPage from './pages/Inventory/BuildingPage';

import Construction from './pages/RightPanel/Costruction'
import Brochure from './pages/RightPanel/Brochure';
function App() {


  const location = useLocation();

  const showNavbar = ["/",  "/disclaimer", "/tie_up", "/amenities","", "/location", 
    "", "/project_details","/construction",
    "/unit","/project_highlights" ,"/testimonials",""]
  const showHeader = ["/",   "/tie_up", "/masterplan", "/project_details","/unit","/construction"]

  const showBackButton = [ "/disclaimer", "/tie_up","/construction",
    ]


  const navbar2=["/location","/project_highlights","/amenities","/testimonials",
    "/disclaimer","/about",]
  // "/testimonials"

  const showBackButton1 = ["/masterplan", "/project_details","/about", "/project_highlights","/amenities"]
  // const dynamicRoutes = ["/floorplan/","/unit/"];

  // const isDynamicRoute = dynamicRoutes.some((r) => location.pathname.startsWith(r));

  const showNav = showNavbar.includes(location.pathname)  
  const showHead = showHeader.includes(location.pathname) 
  // || isDynamicRoute
  const showBack = showBackButton.includes(location.pathname);
  const showBack1 = showBackButton1.includes(location.pathname)

    const navbar22 = navbar2.includes(location.pathname)

  return (
    <> {showHead && <LeftSideNavbar />}
      {showNav && <Header />}
      {showBack1 && <GoBack />}
      {showBack && <GoBackButton />}
      {navbar22 && <LeftSideNavbar1/>}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/disclaimer" element={<Desclaimer />} />
        <Route path="/about" element={<AboutNew />} />
        <Route path="/tie_up" element={<Tie_up />} />
        <Route path="/construction" element={<Construction/>}/>
        {/* <Route path="/project_highlights" element={<ProjectHighlights/>}/> */}
        <Route path="/project_highlights" element={<ProjectHighLights/>}/>
        <Route path="/testimonials" element={<Testimonials/>}/>
         {/* <Route path="/testimonials" element={<Testimonials/>}/> */}
        <Route path="/amenities" element={<Aminities />} />
        <Route path="/location" element={<LocationPage1 />} />
        <Route path="/masterplan" element={<MasterPlanPage1 />} />
        <Route path="/walkthrough" element={<WalkthroughPage />} />
        <Route path="/specification" element={<Specification/>}/>
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/project_details" element={<InventoryPage1 />} />
        <Route path="/floorplan/:towerName" element={<FloorPlanPage />} />
        <Route path="/unit/:unitId" element={<UnitPlanPage />} />
        <Route path="/building/:id" element={<BuildingPage/>}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
