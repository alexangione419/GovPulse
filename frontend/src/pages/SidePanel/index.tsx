import { Outlet } from "react-router-dom";
import "./styles.css";

const LeftNav: React.FC = () => {
  return (
    <div className="Layout">
      <div className="SidePanel">
        <div className="LeftNav__logo">Pryzm</div>
      </div>
      
      <div className="MainPanel">
        <Outlet/> 
      </div>
    
    </div>
  );
};

export default LeftNav;