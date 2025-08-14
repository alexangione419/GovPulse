import { Outlet } from "react-router-dom";
import "./styles.css";
import { SidePanel } from "..";
import { useState } from "react";





type ContractFilters = {
  startDate: string;
  endDate: string;
  awardMaxAmount: string;
  awardMinAmount: string;
}

export type Filters = {
  grants: GrantFilters;
  opportunities: OpportunityFilters;
  contracts: ContractFilters;
}

export type LayoutContext = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  applyFilter: number;
};



const Layout: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    grants: {
      agency: "DOD*"
    },
    opportunities: {
      postedFrom: "07/01/2025",
      postedTo: "08/01/2025",
      state: "",
      status: ""
    },
    contracts: {
      startDate: "2025-07-01",
      endDate: "2025-08-01",
      awardMaxAmount: "400000",
      awardMinAmount: "0"
    }
  });
  const [applyFilter, setApplyFilter] = useState(0);

  return (
    <div className="Layout">
        <SidePanel filters={filters} onChange={setFilters} onApply={() => setApplyFilter(applyFilter+1)}/>
      
      <div className="MainPanel">
        <Outlet context={{filters, setFilters, applyFilter}}/> 
      </div>
    
    </div>
  );
};

export default Layout;