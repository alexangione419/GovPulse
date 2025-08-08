import { Outlet } from "react-router-dom";
import "./styles.css";
import { SidePanel } from "..";

const Layout: React.FC = () => {
  return (
    <div className="Layout">
        <SidePanel />
      
      <div className="MainPanel">
        <Outlet/> 
      </div>
    
    </div>
  );
};

export default Layout;