import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import lottie from "lottie-web";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const [formValues,setFormValues]= useState({
    email:"",
    password:""
  });
  const handleChange = (e)=>{
     const {name,value}= e.target;
     setFormValues({...formValues,[name]:value})
  };
  const submithandler=async(e)=>{
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/login',{
      email:formValues.email,
      password: formValues.password
    });
    if(response.status === 200){
      navigate('/')
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
    <div className='main-wrapper'>
      <div className='img-div' ref={container}></div>
      <div className='form-wrapper'>
      <form className='form-div'  onSubmit={(e)=>submithandler(e)}>
        <div className='label-div'>
        <label>Email</label>
        <input
        name="email"
        value={formValues.email}
        onChange={handleChange}
        placeholder='Enter your email'/>
        </div>
        <div className='label-div'>
        <label>Password</label>
        <input 
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder='Enter your password'/>
        </div>
        <div className='login-btn'>
        <input  type='submit' value='Login' />
        </div>
        <div className='signup'>
        <p className='dont-account'>Don't Have a Account ?</p>
        <Link to='/signup'>SignUp</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login;