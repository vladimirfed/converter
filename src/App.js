import './App.css';
import Currency from './Currency'
import {useEffect, useState} from 'react'

// const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=5d30bf6463063bd9f913b6bd184cf266'

const BASE_URL   = 'https://free.currconv.com/api/v7/currencies?apiKey=1dbfb5b829c15c1df18f'

function App() {

  const [currOptions, setCurrOptions] = useState([])
  const [fromCurr, setFromCurr] = useState()
  const [toCurr, setToCurr] = useState()
  const [rate, setRate] = useState()
  const [amount, setAmount] = useState(1)
  const [inFromAmount, setInFromAmount] = useState(true)

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
        const firstCurrency = Object.keys(data.results)[2]
        setCurrOptions([ ...Object.keys(data.results)])
        setFromCurr(firstCurrency)
        setToCurr(Object.keys(data.results)[2])
        setRate(data.results[firstCurrency])
        // console.log(data)
      })
      
  },[])

  useEffect(()=>{
    fetch(`https://free.currconv.com/api/v7/convert?q=${fromCurr}_${toCurr}&compact=ultra&apiKey=3f79e0653d720734ff61`)
      .then(res=>res.json())
      .then(data=>{
        setRate(Object.values(data))
      })
      
  },[fromCurr, toCurr])

  useEffect(() => {
    if (fromCurr != null && toCurr != null) {
      fetch(`https://free.currconv.com/api/v7/convert?q=${fromCurr}_${toCurr}&compact=ultra&apiKey=3f79e0653d720734ff61`)
        .then(res => res.json())
        .then(data => setRate(Object.values(data.results)[toCurr]))
    }
    console.log(`https://free.currconv.com/api/v7/convert?q=${fromCurr}_${toCurr}&compact=ultra&apiKey=3f79e0653d720734ff61`)
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
