import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';
import lottie from "lottie-web";
import { Navigate, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';



const AddExpense = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
    const [formValues,setFormValues]=useState({
        title:"",
        amount:"",
        date:"",
    });
    const handleChange=(e)=>{
        const{value,name}= e.target;
        setFormValues({...formValues,[name]: value})
    };
    const navigateHandler=()=>{
        navigate('/expenses')
    };
    const submitHandler=async(e)=>{
        try {
            e.preventDefault();
            const resp = await axios.post('https://newback-vc3e.onrender.com/add-expenses',{
                title:formValues.title,
                amount:formValues.amount,
                date:formValues.date,
                addedBy:user
            });
            if(resp.status === 200){
                toast.success("added Successfully", {
                    position: "top-right", // Define the position here
                  });
                navigateHandler();
            }
            setFormValues({title:"",amount:"",date:""})
        } catch (error) {
            toast.success("Error during creation", {
                position: "top-right", // Define the position here
              });
        }
       
    };
    
    useEffect(() => {
        lottie.loadAnimation({
          container: container.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../Lotties/money.json"),
        });
        return () => {
          lottie.destroy();
        };
      }, []);
  return (
    <div className='conatine'>
        <h1>Create Your Expense List</h1>
        <div className='form-lottie-div'>
        <div className='expense-form'>
        <form onSubmit={submitHandler}>
            <div className='form-text'>
                <label>Title</label><br/>
                <input
                 name='title'
                 value={formValues.title}
                 onChange={handleChange}
                placeholder='Enter Expense Title' />
            </div>
            <div className='form-text'>
                <label>Amount</label><br/>
                <input 
                name='amount'
                value={formValues.amount}
                onChange={handleChange}
                placeholder='Enter Expense Amount' />
            </div>
            <div className='form-text'>
                <label>Date</label><br/>
                <input 
                name='date'
                value={formValues.date}
                onChange={handleChange}
                type='datetime-local'
                placeholder='Enter Expense Amount' />
            </div>
            <div className='btn-div'>
                <button type='submit'>Add Expenses</button>
            </div>
        </form>
        </div>
        <div className='lottie-div' ref={container}></div>
        </div>
    </div>
  )
}

export default AddExpense