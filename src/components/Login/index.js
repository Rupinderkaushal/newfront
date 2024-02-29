import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import lottie from "lottie-web";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Spin } from 'antd';

const Login = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const [formValues,setFormValues]= useState({
    email:"",
    password:""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading,setLoading]=useState(false);
  const handleChange = (e)=>{
     const {name,value}= e.target;
     setFormValues({...formValues,[name]:value})
  };
  const submithandler=async(e)=>{
    try {
      setLoading(true)
      e.preventDefault();
    const response = await axios.post('https://newback-vc3e.onrender.com/login',{
      email:formValues.email,
      password: formValues.password
    });
    if(response.status === 200){
      toast.success("Login Success", {
        position: "top-right", // Define the position here
      });
      navigate('/expenses')
      sessionStorage.setItem("token",response.data.accessToken)
      localStorage.setItem("token",response.data.accessToken)
      localStorage.setItem("user",response.data.message.userName)
      setLoading(false)
    }
    } catch (error) {
      setLoading(false)
      toast.error('Login Error',{
        position:"top-right"
      })
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
  useEffect(() => {
    // Check if both email and password are not empty
    setIsFormValid(formValues.email.trim() !== '' && formValues.password.trim() !== '');
  }, [formValues.email, formValues.password])

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
        <input  type='submit' value='Login' disabled={!isFormValid}  />
        </div>
        <div className='signup'>
        <p className='dont-account'>Don't Have a Account ?</p>
        <Link to='/signup'>SignUp</Link>
        </div>
      </form>
      </div>
      {loading && <div className='loader-div'>
        <Spin/> 
        </div>}
    </div>
  )
}

export default Login;