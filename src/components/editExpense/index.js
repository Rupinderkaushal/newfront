import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const EditExpenses = () => {
 const {id}= useParams();
   const  submitHandler=async()=>{
    alert("huu")
   };
   const fetchData =async()=>{
    const dbResponse = await axios.get(`https://newback-vc3e.onrender.com/fetch-by-id/${id}`)
   };
  return (
    <div>
        <h1>Edit Your Expenses</h1>
        <form onSubmit={submitHandler}>
            <label>Title</label><br/>
            <input value={"title"} /><br/>
            <label>Amount</label><br/>
            <input value={"amount"} /><br/>
            <button type='submit'>update</button>
        </form>
    </div>
  )
}

export default EditExpenses;