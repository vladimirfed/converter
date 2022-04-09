import './App.css';
import Currency from './Currency'
import {useEffect, useState} from 'react'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=5d30bf6463063bd9f913b6bd184cf266'

function App() {

  const [currOptions, setCurrOptions] = useState([])
  console.log(currOptions)
  
  useEffect(()=>{
    fetch(BASE_URL)
      .then(res=>res.json())
      .then(data=>{
        setCurrOptions([data.base, ...Object.keys(data.rates)])
      })
  },[])

  return (
    <div className="App">
      <h1>App</h1>
      <Currency 
      currOptions={currOptions} />
      <h2>is equal to </h2>
      <Currency 
      currOptions={currOptions} />
    </div>
  );
}

export default App;
