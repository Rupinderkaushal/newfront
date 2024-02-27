import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import lottie from "lottie-web";

const Expenses = () => {
  const container = useRef(null);
    const [formValues,setFormValues]=useState({
        title:"",
        amount:"",
        date:"",
    });
    const [user,setUser]=useState();
    const [expenseList,setExpenseList]= useState([]);
    const [totalAmount,setTotalAmount]= useState(0);
    const navigate = useNavigate();
    const handleChange=(e)=>{
        const{value,name}= e.target;
        setFormValues({...formValues,[name]: value})
    };
    const submitHandler=async(e)=>{
        e.preventDefault();
        const resp = await axios.post('https://newback-vc3e.onrender.com/add-expenses',{
            title:formValues.title,
            amount:formValues.amount,
            date:formValues.date,
        });
        if(resp){
        }
        setFormValues({title:"",amount:"",date:""})
    };
    const expenseHandler=async()=>{
        const resp = await axios.get('https://newback-vc3e.onrender.com/list-expenses');
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
      alert("entry deleted successfully")
      expenseHandler()
    }
    else{
        alert("error occured")
    }
 };
const  logoutHandler=()=>{
    localStorage.removeItem("token")
    navigate('/login')
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
  
  useEffect(()=>{
    expenseHandler()
  },[delHandler,editHandler]);
  useEffect(()=>{
   const user= localStorage.getItem('user');
   if(user){
    setUser(user)
   }
  },[])
    
  return (
    <div className='expense-wrapper'>
        <div className='expense-nav'>
        <p className='hello'>Hello , <span>{user}</span></p>
        <button onClick={logoutHandler} >Logout</button>
        </div>
        <h1 className='header'>Create Your Expense List</h1>
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