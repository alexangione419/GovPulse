import { useState, useEffect, useCallback } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import Grant from '../../components/Grant';

const Home: React.FC = () => {
  const [opps, setOpps] = useState<Opportunity[]>([])

  const [grants, setGrants] = useState<Grant[]>([])
  const [grantPage, setGrantPage] = useState(0)

  const [loading, setLoading] = useState(false)
  const [hasMore, sethasMore] = useState(true)



  const loadGrants = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newGrants = await getGrants(grantPage);
      console.log(newGrants)
      setGrants(grants.concat(newGrants));
      setGrantPage(grantPage+1);

      if (newGrants.length = 0) {
        sethasMore(false)
      }
    } catch (err) {
      console.log(`ERROR - Grant loading ${err}`)
    } finally {
      setLoading(false)
    }

  }, [grantPage, loading, hasMore])


  useEffect(() => {
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
      
      {opps.length > 0 && <h2>Opps - {opps[0].title}</h2>}
      {grants.length > 0 && (
        <div>
          {grants.map((grant) => (
            <Grant key={grant.id} grant={grant} />
          ))}
        </div>
      )}

      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more grants found. Try a different filter!</p>}

    </>
  )
}

export default Home;
