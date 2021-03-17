import Filter from './components/Filter'
import Maat from './components/Maat'
import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

  const [maaData, setMaaData] = useState([])
  const [filter, setFilter] = useState('')


  useEffect( () => {
    axios.get('https://restcountries.eu/rest/v2/all').then( res => {
      console.log("Data saatu. ", res.data)
      setMaaData(res.data)
    })
  }, [])

  return (
  <div>
    <h1>Maa-info</h1>
    <Filter filter={setFilter} />
    <Maat filter={filter} maaData={maaData} setFilter={setFilter}/>
  </div>
  );
}

export default App;
