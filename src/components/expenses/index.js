import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import {  toast } from 'react-toastify';
import lottie from "lottie-web";
import maleIcon from "../../assets/images.png";
import pic from "../../assets/female.jpg";
import { AiOutlineFolderAdd, AiFillSignal } from "react-icons/ai";
import { GiTargetDummy } from "react-icons/gi";




const Expenses = () => {
    
    const [user,setUser]=useState();
    const [expenseList,setExpenseList]= useState([]);
    const [totalAmount,setTotalAmount]= useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [gender,setGender] =useState();
    const navigate = useNavigate();
  const container = useRef(null);
   
   
    const expenseHandler=async()=>{
        setIsLoading(true)
        const resp = await axios.get(`https://newback-vc3e.onrender.com/list-expenses/${user}`);
            setExpenseList(resp.data);
            const total = resp.data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
            setTotalAmount(total);
            setIsLoading(false)
    };
 const editHandler =async(data)=>{
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
    navigate('/')
};
 
  useEffect(()=>{
   const user= localStorage.getItem('user');
   const gender= localStorage.getItem('gender');
   if(user){
    setUser(user)
    setGender(gender)
   }
  },[])
  useEffect(() => {
    if (user) {
        expenseHandler();
    }
}, [user]);
useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../Lotties/loading.json"),
    });
    return () => {
      lottie.destroy();
    };
  }, []);


    
  return (
    <div className='expense-wrapper'>
        <div className='expense-nav'>
        <p className='hello'>Hello,<span> {user}</span><span className='yeti' ><img  src={gender ==='male' ? maleIcon : pic } /></span></p>
        <button className='logout-btn' onClick={logoutHandler} >Logout  <RiLogoutCircleRLine style={{marginLeft:'10px'}} color='red' size={20} /></button>
        </div>
        <div className='create-expense'>
            <p>This is the list of your Expenses. if you want to add new<span><Link to='/add-expense'>clickHere</Link></span></p>
        </div>
        <div className='sidebar-wrapper'>
          <div className='sidebar-div'>
            <p> <span className='pre-list-icon'><AiOutlineFolderAdd size={30} /></span>Add Expense</p>
            <p> <span className='pre-list-icon'><AiFillSignal size={30} /></span> View Expense</p>
            <p><span className='pre-list-icon'><GiTargetDummy size={30} /></span>  Dummy Bars</p>
            <p><span className='pre-list-icon'><GiTargetDummy size={30} /></span>Dummy Bars</p>
            <p><span className='pre-list-icon'><GiTargetDummy size={30} /></span>Dummy Bars</p>
            <p><span className='pre-list-icon'><GiTargetDummy size={30} /></span>Dummy Bars</p>
            <p><span className='pre-list-icon'><GiTargetDummy size={30} /></span>Dummy Bars</p>
          </div>
          <div className='content-div'>
            <p>this is my dummy area </p>
          </div>
        </div>
        <div className='expense-list'>
            <div className='btn-div'>
            <h1>Expenses List</h1>
            </div>
            <div className='table-div-wrapper'>
            <table className='table-wrapper'>
                <thead>
                    <tr style={{color:"white"}}>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                {expenseList && expenseList.slice(0,15).map((val)=>{
                    function getDayName(date = new Date(val.date), locale = 'en-US') {
                        return date.toLocaleDateString(locale, {weekday: 'long'});
                      }
                      return<tr style={{color:"white"}}>
                       <td className='title-td'>{val.title}</td>
                       <td>{val.amount}</td>
                        <td>{getDayName()}</td>
                        <td>{ new Date(val.date).toLocaleDateString()}</td>
                        <td className='edit-wrapper'>
                            <button onClick={()=>editHandler(val._id)} className='edit-btn'>Edit</button>
                            <button onClick={()=>delHandler(val._id)} className='del-btn'>Delete</button>
                        </td>
                        </tr>
            })}
                </tbody>
            </table>
            </div>
           
            <div className='total-tr'>
                <p>Grand Total</p>
                <p className='total-amount'>{totalAmount}</p>
            </div>
        </div>
    </div>
  )
}

export default Expenses