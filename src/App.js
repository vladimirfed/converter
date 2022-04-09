import './App.css';
import Currency from './Currency'
import {useEffect, useState} from 'react'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=5d30bf6463063bd9f913b6bd184cf266'

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
    toAmount = amount * rate
  }else{
    toAmount = amount 
    fromAmount = amount / rate
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
      fetch(`${BASE_URL}?base=${fromCurr}&symbols=${toCurr}`)
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
    <div className="App">
      <h1>App</h1>
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
