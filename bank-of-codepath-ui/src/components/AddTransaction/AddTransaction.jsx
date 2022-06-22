import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction({isCreating, handleOnSubmit,form,setForm}) {
  const handleOnFormFieldChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
    console.log(form)
  }
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange} handleOnSubmit={handleOnSubmit} form={form} isCreating={isCreating}/>
    </div>
  )
}

export function AddTransactionForm({handleOnFormFieldChange,handleOnSubmit,form,isCreating}) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" placeholder="Description" name="description" onChange={handleOnFormFieldChange} value={form?.description}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" placeholder="Category" name="category" onChange={handleOnFormFieldChange} value={form?.category}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type="number" placeholder="Amount (cents)" name="amount" onChange={handleOnFormFieldChange} value={form?.amount}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit} >
          Add
        </button>
      </div>
    </div>
  )
}
