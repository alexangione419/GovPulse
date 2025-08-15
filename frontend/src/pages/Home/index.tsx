import { useState, useEffect, useCallback, useRef } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import { getContracts } from '../../api/contracts';
import Grant from '../../components/Grant';
import Opportunity from '../../components/Opportunity'
import type { LayoutContext } from '../Layout';
import { useOutletContext } from 'react-router-dom';
import Contract from '../../components/Contracts';

const Home: React.FC = () => {
  const {filters, applyFilter} = useOutletContext<LayoutContext>();

  const [feed, setFeed] = useState<any[]>([])
  const [oppPage, setOppPage] = useState(0)
  const [hasMoreOpps, sethasMoreOpps] = useState(true)

  const [grantPage, setGrantPage] = useState(0)
  const [hasMoreGrants, sethasMoreGrants] = useState(true)

  const [contractPage, setContractPage] = useState(1)
  const [hasMoreContracts, sethasMoreContracts] = useState(true)

  const [loading, setLoading] = useState(false)

  const loadingRef = useRef(false);

  
  useEffect(() => {
    loadSources();
  }, []); 

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const loadSources = useCallback(async () => {
    if (loadingRef.current || loading) return;
    if (!hasMoreGrants) return;

    setLoading(true);
    loadingRef.current = true;

    console.log("Loading sources...");

    try {
      const newGrants = await getGrants(grantPage, filters.grants);
      const newContracts = await getContracts(contractPage, filters.contracts);
      const newOpps = await getOpportunities(oppPage, filters.opportunities);

      const combinedFeed = [
        ...newOpps.map(o => ({ type: "opp" as const, data: o })),
        ...newContracts.map(c => ({ type: "contract" as const, data: c })),
        ...newGrants.map(g => ({ type: "grant" as const, data: g })),
      ];

      shuffleArray(combinedFeed);
      
      setFeed(feed => feed.concat(combinedFeed));
      setGrantPage(page => page + 1);
      setContractPage(page => page + 1);

    } catch (err) {
      console.log(`ERROR - loading ${err}`)
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [grantPage, contractPage, hasMoreGrants, loading, filters.grants, filters.contracts]);



  
  useEffect(() => {
    // Reset state
    setFeed([]);
    setGrantPage(0);
    sethasMoreGrants(true);
    setContractPage(1);
    sethasMoreContracts(true);
    
    loadingRef.current = false;
    
  }, [applyFilter]);



  useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const innerHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollY + innerHeight >= scrollHeight - 200) {
          loadSources();
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadSources]);



  return (
    <div className='Home'>
      {feed.map((item) => {
        switch (item.type) {
          case "opp":
            return (
              <Opportunity
                key={item.data.noticeId}
                opportunity={item.data}
              />
            );
          case "contract":
            return (
              <Contract
                key={item.data.internal_id}
                contract={item.data}
            />
          );
          case "grant":
            return (
              <Grant
                key={item.data.id}
                grant={item.data}
              />
            );
          default:
            return null;
        }
      })}

      {loading && <p>Loading more...</p>}
      {!hasMoreGrants && <p>No more grants found. Try a different filter!</p>}
    </div>
  )
}

export default Home;