import { useState, useEffect } from "react";
import SidebarMtro from "../../components/SidebarMtro/SidebarMtro";
import DashboardMtro from "../../components/DashboardPortal/DasboardMtro";
function Home() {

  return (
    <div className="app-layout" >
       <SidebarMtro />  
     <DashboardMtro />
      
    </div>
  );
}

export default Home;