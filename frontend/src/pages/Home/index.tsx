import { useState, useEffect } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import type { Opportunity } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import type { Grant } from '../../api/grants';

const Home: React.FC = () => {
  const [opps, setOpps] = useState<Opportunity[]>([])
  const [grants, setGrants] = useState<Grant[]>([])

  useEffect(() => {
    // getOpportunities()
    // .then((data) => {
    //   console.log("we theoretically have opps")
    //   setOpps(data)
    // })
    // .catch((error) => {
    //   console.log(`ERROR - ${error}`)
    // })
    
    getGrants()
    .then((data) => {
      console.log("we theoretically have grants")
      setGrants(data)
    })
    .catch((error) => {
      console.log(`ERROR - ${error}`)
    })

  }, []);
  

  return (
    <>
      <div>Pryzm Twitter Feed</div>
      
      {opps.length > 0 && <h2>Opps - {opps[0].title}</h2>}
      {grants.length > 0 && <h2>Opps - {grants[0].title}</h2>}

    </>
  )
}

export default Home;
