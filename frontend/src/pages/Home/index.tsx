import { useState, useEffect } from 'react'
import "./styles.css"
import { getOpportunities } from '../../api/opportunities';
import { getGrants } from '../../api/grants';
import Grant from '../../components/Grant';

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
      <h1>GovPulse</h1>
      
      {opps.length > 0 && <h2>Opps - {opps[0].title}</h2>}
      {grants.length > 0 && (
        <div>
          {grants.map((grant) => (
            <Grant key={grant.id} grant={grant} />
          ))}
        </div>
      )}

    </>
  )
}

export default Home;
