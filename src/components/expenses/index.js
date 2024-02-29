import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import {  toast } from 'react-toastify';


const Expenses = () => {
    
    const [user,setUser]=useState();
    const [expenseList,setExpenseList]= useState([]);
    const [totalAmount,setTotalAmount]= useState(0);
    const navigate = useNavigate();
   
    const expenseHandler=async()=>{
        const resp = await axios.get(`https://newback-vc3e.onrender.com/list-expenses/${user}`);
            setExpenseList(resp.data);
            const total = resp.data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
            setTotalAmount(total);
    };
 const editHandler =async(data)=>{
    console.log("id",data)
    navigate(`/edit-expenses/${data}`)
 };
 const delHandler =async(data)=>{
    const resp = await axios.delete(`https://newback-vc3e.onrender.com/delete-expense/${data}`)
    if(resp.status === 200){
        toast.success("Entry Deleted Successfully", {
            position: "top-right", // Define the position here
          });
      expenseHandler()
    }
    else{
        toast.error("Error Occured during deletion", {
            position: "top-right", // Define the position here
          });
        alert("error occured")
    }
 };
const  logoutHandler=()=>{
    localStorage.removeItem("token")
    navigate('/login')
};
 
  

  useEffect(()=>{
   const user= localStorage.getItem('user');
   if(user){
    setUser(user)
   }
  },[])
  useEffect(() => {
    if (user) {
        expenseHandler();
    }
}, [user]);
    
  return (
    <div className='expense-wrapper'>
        <div className='expense-nav'>
        <p className='hello'>Hello , <span>{user}</span></p>
        <button className='logout-btn' onClick={logoutHandler} ><RiLogoutCircleRLine color='red' size={20} /></button>
        </div>
        <div className='create-expense'>
            <p>This is the list of your Expenses. if you want to add new<span><Link to='/add-expense'>clickHere</Link></span></p>
        </div>
        <div className='expense-list'>
            <div className='btn-div'>
            <h1>Expenses List</h1>
            </div>
            <table>
                <thead>
                    <tr style={{color:"white"}}>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {expenseList && expenseList.map((val)=>{
                    function getDayName(date = new Date(val.date), locale = 'en-US') {
                        return date.toLocaleDateString(locale, {weekday: 'long'});
                      }
                      return<tr style={{color:"white"}}>
                       <td className='title-td'>{val.title}</td>
                        <td>{ new Date(val.date).toLocaleDateString()}</td>
                        <td>{getDayName()}</td>
                        <td>{val.amount}</td>
                        <td className='edit-wrapper'>
                            <button onClick={()=>editHandler(val._id)} className='edit-btn'>Edit</button>
                            <button onClick={()=>delHandler(val._id)} className='del-btn'>Delete</button>
                        </td>
                        </tr>
            })}
                </tbody>
            </table>
           
            <div className='total-tr'>
                <p>Grand Total</p>
                <p className='total-amount'>{totalAmount}</p>
            </div>
        </div>
    </div>
  )
}

export default Expenses