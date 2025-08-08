import { useState, useEffect, useCallback } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import Grant from '../../components/Grant';
import Opportunity from '../../components/Opportunity'

const Home: React.FC = () => {
  const [opps, setOpps] = useState<Opportunity[]>([])


  const [grants, setGrants] = useState<Grant[]>([])
  const [grantPage, setGrantPage] = useState(0)
  const [hasMoreGrants, sethasMoreGrants] = useState(true)

  const [loading, setLoading] = useState(false)



  const loadGrants = useCallback(async () => {
    if (loading || !hasMoreGrants) return;
    setLoading(true);

    try {
      const newGrants = await getGrants(grantPage);
      console.log(newGrants)
      setGrants(grants.concat(newGrants));
      setGrantPage(grantPage+1);

      if (newGrants.length = 0) {
        sethasMoreGrants(false)
      }
    } catch (err) {
      console.log(`ERROR - Grant loading ${err}`)
    } finally {
      setLoading(false)
    }

  }, [grantPage, loading, hasMoreGrants])


  const loadOpportunities = useCallback(async () => {
    setLoading(true);

    try {
      const newOpps = await getOpportunities();
      setOpps(opps.concat(newOpps));


    } catch (err) {
      console.log(`ERROR - Opportunity loading ${err}`)
    } finally {
      setLoading(false)
    }
  }, [opps, loading])


  useEffect(() => {
    // loadOpportunities();
    loadGrants();
  }, []);

  // scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        loadGrants();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadGrants]); 

  return (
    <>
      
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

    </>
  )
}

export default Home;
