import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios";
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home({transactions,setTransactions,transfers,setTransfers,error,setError,isLoading, setIsLoading, filterInputValue, newTransactionForm, setNewTransactionForm, isCreating, setIsCreating}) {
  let filteredTransactions=[];
  useEffect(() => {
      setIsLoading(true)
      try {
        const transactionsRes = axios.get("http://localhost:3001/bank/transactions")
        if (transactionsRes?.data?.transactions) {
          setTransactions(transactionsRes.data.transactions)
        }

        const transfersRes = axios.get("http://localhost:3001/bank/transfers")
        if (transfersRes?.data?.transfers) {
          setTransfers(transfersRes.data.transfers)
        }
      } catch (error) {
        console.log({error})
        setError(error)
      }

      setIsLoading(false)
  }, [])

  if (filterInputValue){
    filteredTransactions= transactions.filter((current) =>{
      return(current.description.toLowerCase().includes(filterInputValue.toLowerCase()))
    }
    )
  }
  else{
    filteredTransactions=transactions
  }


  async function handleOnSubmitNewTransaction(){
    setIsCreating(true);
    axios.post("http://localhost:3001/bank/transactions"),
    {"transaction":{newTransactionForm}}
    setIsCreating(false);

  }
  return (
    <div className="home">
      
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating} form={newTransactionForm} setForm={setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
      {isLoading ? <h1>Loading...</h1>:<BankActivity transactions={filteredTransactions} />}
      {error ? <h2 className="error">{error}</h2>: null}
      
    </div>
  )
}
