import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
const Expenses = () => {
    const [formValues,setFormValues]=useState({
        title:"",
        amount:"",
        date:"",
    });
    const [expenseList,setExpenseList]= useState([]);
    const [totalAmount,setTotalAmount]= useState(0);
    let list;
    const handleChange=(e)=>{
        const{value,name}= e.target;
        setFormValues({...formValues,[name]: value})
    };
    const submitHandler=async(e)=>{
        e.preventDefault();
        const resp = await axios.post('http://localhost:8080/add-expenses',{
            title:formValues.title,
            amount:formValues.amount,
            date:formValues.date,
        });
        if(resp){
        }
        setFormValues({title:"",amount:"",date:""})
    };
    const expenseHandler=async()=>{
        const resp = await axios.get('http://localhost:8080/list-expenses');
            setExpenseList(resp.data);
            const total = resp.data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
            setTotalAmount(total);
    };

    
  return (
    <div className='expense-wrapper'>
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
        <div className='expense-list'>
            <div className='btn-div'>
            <button onClick={expenseHandler}>List Expenses</button>
            </div>
            <table>
                <thead>
                    <tr style={{color:"white"}}>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Day</th>
                    </tr>
                </thead>
                <tbody>
                {expenseList && expenseList.map((val)=>{
                    function getDayName(date = new Date(val.date), locale = 'en-US') {
                        return date.toLocaleDateString(locale, {weekday: 'long'});
                      }
                      return<tr style={{color:"white"}}>
                       <td>{val.title}</td>
                        <td>{val.amount}</td>
                        <td>{ new Date(val.date).toLocaleDateString()}</td>
                        <td>{getDayName()}</td>
                        </tr>
            })}
            <tr style={{color:"white"}}>
                <td>Total</td>
                <td>{totalAmount}</td>
            </tr>

                </tbody>
            </table>
           
            
        </div>
    </div>
  )
}

export default Expenses