import type { Filters } from "../Layout";
import "./styles.css";


type FilterProps = {
  filters: Filters
  onChange: React.Dispatch<React.SetStateAction<Filters>>
  onApply: () => void;
}


const SidePanel: React.FC<FilterProps> = ({ filters, onChange, onApply }) => {
  return (
    <>
      <div className="SidePanel">
        <h1>GovPulse</h1>
        

        <div className="filterCardOpportunities">
          <h2>Opportunities</h2>
          <div className="filterBody">

            {(() => {
                const setOpp = (u: Partial<typeof filters.opportunities>) =>
                onChange(f => ({ ...f, opportunities: { ...f.opportunities, ...u }}));

            return (
              <>
              <label >
                <p> Posted From</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.opportunities.postedFrom}
                  onChange={(e) => setOpp({ postedFrom: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>
              
              <label >
                <p> Posted To</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.opportunities.postedFrom}
                  onChange={(e) => setOpp({ postedTo: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>
              
              <label >
                <p> State </p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.opportunities.state}
                  onChange={(e) => setOpp({ state: e.target.value })}
                  placeholder="DC, NJ, NY"
                />
              </label>
              
            <label>
                <p> Status </p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.opportunities.state}
                  onChange={(e) => setOpp({ status: e.target.value })}
                  placeholder="ACTIVE, INACTIVE, ARCHIVED, CANCELLED, DELETED"
                />
              </label>
              </>
            );
            })()}


          </div>
        </div>

        <div className="filterCardGrants">
          <h2>Grants</h2>
          <div className="filterBody">
            
            {(() => {
            const setOpp = (u: Partial<typeof filters.grants>) =>
            onChange(f => ({ ...f, grants: { ...f.grants, ...u }}));

            return (
              <>
              <label >
                <p> Agency</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.grants.agency}
                  onChange={(e) => setOpp({ agency: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>
              
              </>
            );
            })()}
          </div>
        </div>

        <div className="filterCardContracts">
          <h2>Contracts News</h2>
          <div className="filterBody">
           {(() => {
            const setOpp = (u: Partial<typeof filters.contracts>) =>
            onChange(f => ({ ...f, contracts: { ...f.contracts, ...u }}));

            return (
              <>
              <label >
                <p> Start Date</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.contracts.startDate}
                  onChange={(e) => setOpp({ startDate: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>
              
              <label >
                <p> End Date</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.contracts.endDate}
                  onChange={(e) => setOpp({ endDate: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>
              
               <label >
                <p> Award Min Amount</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.contracts.awardMinAmount}
                  onChange={(e) => setOpp({ awardMinAmount: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
              </label>

               <label >
                <p> Award Max Amount</p>
                <input
                  className="filterInput"
                  type="text"
                  value={filters.contracts.awardMaxAmount}
                  onChange={(e) => setOpp({ awardMaxAmount: e.target.value })}
                  placeholder="yyyy-mm-dd"
                />
                </label>

              </>
            );
            })()}
          </div>
        </div>
          <div >

            <button type="button" className="applyBtn" onClick={onApply}>
              Apply Filters
            </button>

          </div>
      

      </div>
    </> 
  );
};

export default SidePanel;