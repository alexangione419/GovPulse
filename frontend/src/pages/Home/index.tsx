import { useState, useEffect } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/sam';
import type { Opportunity } from '../../api/sam';

const Home: React.FC = () => {
  const [opps, setOpps] = useState<Opportunity[]>([])

  useEffect(() => {
    getOpportunities()
    .then((data) => {
      console.log("we theoretically have opps")
      setOpps(data)
    })
    .catch((error) => {
      console.log(`ERROR - ${error}`)
    })
    
  }, []);
  

  return (
    <>
      <div>Pryzm Twitter Feed</div>
      
      {opps.length > 0 && <h2>Opps - {opps[0].title}</h2>}

    </>
  )
}

export default Home;
