import './App.css';
import Currency from './Currency'
import {useEffect, useState} from 'react'

const BASE_URL = 'https://api.frankfurter.app/latest'

// https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=1dbfb5b829c15c1df18f  - second open API

function App() {

  const [currOptions, setCurrOptions] = useState([])
  const [fromCurr, setFromCurr] = useState()
  const [toCurr, setToCurr] = useState()
  const [rate, setRate] = useState()
  const [amount, setAmount] = useState(1)
  const [inFromAmount, setInFromAmount] = useState(true)
  console.log(1)

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
        setFromCurr(data.base)
        setToCurr(firstCurrency)
        setRate(data.rates[firstCurrency])
      })
  },[])

  useEffect(() => {
    if (fromCurr != null && toCurr != null) {
      fetch(`https://api.frankfurter.app/latest?amount=1&from=${fromCurr}&to=${toCurr}`)
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
    <div >
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
      
    </div>
  );
}

export default App;
