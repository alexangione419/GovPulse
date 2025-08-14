import { useState, useEffect, useCallback } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import Grant from '../../components/Grant';
import Opportunity from '../../components/Opportunity'
import type { LayoutContext } from '../Layout';
import { useOutletContext } from 'react-router-dom';

const Home: React.FC = () => {
  const {filters, applyFilter} = useOutletContext<LayoutContext>();

  const [opps, setOpps] = useState<Opportunity[]>([])


  const [grants, setGrants] = useState<Grant[]>([])
  const [grantPage, setGrantPage] = useState(0)
  const [hasMoreGrants, sethasMoreGrants] = useState(true)

  const [loading, setLoading] = useState(false)



  const loadSources = useCallback(async () => {
    if (loading || !hasMoreGrants) return;
    setLoading(true);

    try {
      const newGrants = await getGrants(grantPage, filters.grants);
      setGrants(grants.concat(newGrants));
      setGrantPage(grantPage+1);

      if (newGrants.length = 0) {
        sethasMoreGrants(false)
      }

      // const newOpps = await getOpportunities(filters.opportunities);
      // setOpps(opps.concat(newOpps));

    } catch (err) {
      console.log(`ERROR - loading ${err}`)
    } finally {
      setLoading(false)
    }

  }, [grantPage, loading, hasMoreGrants])


  


  useEffect(() => {
    loadSources();
  }, []); 
  
  useEffect(() => {
    setGrants([]);
    setGrantPage(0);
    sethasMoreGrants(true);
    setOpps([]);
    

    
    loadSources();
  }, [applyFilter]);

  // scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        loadSources();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadSources]); 

  return (
    <div className='Home'>
      {opps.length > 0 && (
        <div>
          {opps.map((opp) => (
            <Opportunity key={opp.noticeId} opportunity={opp} />
            
          ))}
        </div>
      )}

      {grants.length > 0 && (
        <div>
          {grants.map((grant) => (
            <Grant key={grant.id} grant={grant} />
          ))}
        </div>
      )}

      {loading && <p>Loading more...</p>}
      {!hasMoreGrants && <p>No more grants found. Try a different filter!</p>}

    </div>
  )
}

export default Home;
