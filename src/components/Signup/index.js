import React, { useEffect, useRef, useState } from 'react'
import lottie from "lottie-web";
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';

const SignUp = () => {
  const container = useRef(null);
  const Navigate =useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    email: '',
    gender:'',
    mobileNumber:''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const formHandler =async (e)=>{
    try {
      e.preventDefault();
      const response = await axios.post('https://newback-vc3e.onrender.com/signup',
      {
        username: formValues.username,
        password:formValues.password,
        email: formValues.email,
        gender:formValues.gender,
        mobileNumber: formValues.mobileNumber
      }
      );
      if(response.status === 200){
        toast.success("User Created Successfully", {
          position: "top-right", // Define the position here
        });
        Navigate('/login')
      }
    } catch (error) {
      console.log("************",error)
      toast.error("User Creation Failed", {
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
      animationData: require("../../Lotties/login.json"),
    });
    return () => {
      lottie.destroy();
    };
  }, []);
  return (
    <div className='signup-div'> 
      <div className='lottie-div' ref={container}></div>
      <div className='signup-form-div'>
      <form onSubmit={formHandler}>
        <div className='signup-form-content'>
          <label>Username</label>
          <input
           name='username'
           value={formValues.username}
           onChange={handleChange}
          placeholder='Enter Username' />
        </div>
        <div className='signup-form-content'>
          <label>Email</label>
          <input
          name='email'
          value={formValues.email}
          onChange={handleChange}
          placeholder='Enter Username' />
        </div>
        <div className='signup-form-content'>
          <label>Password</label>
          <input 
          name='password'
          value={formValues.password}
          onChange={handleChange}
          placeholder='Enter Username' />
        </div>
        <div className='signup-form-content'>
          <label>Mobile No</label>
          <input 
          name='mobileNumber'
          value={formValues.mobileNumber}
          onChange={handleChange}
          placeholder='Enter mobileNumber' />
        </div>
        <div className='select-div'>
          <label>Gender</label><br/>
          <select 
          name='gender'
          value={formValues.gender}
          onChange={handleChange}
          >
          <option value="" >Select</option>
            <option value="Male" >Male</option>
            <option value="Female" >Female</option>
          </select>
        </div>
        <div className='login-btn'>
        <input  type='submit' value='SignUp' />
        </div>
        <div className='already'>
          <p>Already Registered</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default SignUp