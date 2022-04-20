import './App.css';
import Currency from './Currency'
import List from './List'
import {useEffect, useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom';

const BASE_URL = 'https://api.frankfurter.app/latest'


function App() {

  const [currOptions, setCurrOptions] = useState([])
  const [currValues, setCurrValues] = useState([])
  const [fromCurr, setFromCurr] = useState()
  const [toCurr, setToCurr] = useState()
  const [rate, setRate] = useState()
  const [amount, setAmount] = useState(1)
  const [inFromAmount, setInFromAmount] = useState(true)
  

  let toAmount, fromAmount
  if(inFromAmount){
    fromAmount = amount
    toAmount = Number.parseFloat(amount * rate).toFixed(3)
  }else{
    toAmount = amount 
    fromAmount = Number.parseFloat(amount / rate).toFixed(3)
  }
  
  
  useEffect(()=>{
    fetch(BASE_URL)
      .then(res=>res.json())
      .then(data=>{
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrOptions([data.base, ...Object.keys(data.rates)])
        setCurrValues([1, ...Object.values(data.rates)])
        setFromCurr(data.base)
        setToCurr(firstCurrency)
        setRate(data.rates[firstCurrency])
      })
  },[])

  useEffect(() => {
    if (fromCurr != null && toCurr != null) {
      fetch(`${BASE_URL}?amount=1&from=${fromCurr}&to=${toCurr}`)
        .then(res => res.json())
        .then(data => setRate(data.rates[toCurr]))
    }
  }, [fromCurr, toCurr])

  function handleFromAmount(e){
    setAmount(e.target.value)
    setInFromAmount(true)
  }

  function handleToAmount(e){
    setAmount(e.target.value)
    setInFromAmount(false)
  }

  return (
    <div className="parent">
      <header>
        <Link to="/">Home</Link>
        <Link to="/converter">Converter</Link>
        <Link to="/list">List</Link>
      </header>
      <h1  >Currencies Converter</h1>
      <Currency 
      currOptions={currOptions}
      selectCurr={fromCurr}
      onChangeCurr={e=>setFromCurr(e.target.value)}
      onChangeAmount={handleFromAmount}
      amount={fromAmount} /> 
      
      <h2>is equal to </h2>
      <Currency 
      currOptions={currOptions}
      selectCurr={toCurr}
      onChangeCurr={e=>setToCurr(e.target.value)}
      onChangeAmount={handleToAmount}
      amount={toAmount} />
      <Routes>      
        <Route path="/list" element={<List 
      currOptions={currOptions}
      currValues={currValues} />} />
      </Routes>

      
    </div>
  );
}

export default App;
