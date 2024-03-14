import React, { useEffect, useRef } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import lottie from "lottie-web";
import PremiumPic from "../../assets/premium_photo-1678823283274-358b3676fe5e.avif";


const HomePage = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../Lotties/expenses.json"),
    });
    return () => {
      lottie.destroy();
    };
  }, []);
  return (
    <div className='homepage-wrapper'>
        <div className='logo-link-div'>
          <div className='logo-div'>
            <img src={Logo} alt="Logo"/>
          </div>
          <div className='web-links'>
            <NavLink to='/expenses'>Expenses</NavLink>
            <NavLink to='/todo'>Todo</NavLink>
            <NavLink to='/suggestions'>Suggestions</NavLink>
            <NavLink to='/goals'>Goals</NavLink>
          </div>
        </div>
        <div className='text-lottie-div'>
          <div className='text-div'>
            <h1>A Special Place </h1>
            <h1>For Keep </h1>
            <h1>Track of Expenses</h1>
          </div>
          <div className='home-lottie-div' ref={container}></div>
        </div>
        <div className='middle_div'>
          <img src={PremiumPic} />
        </div>
    </div>
  )
}

export default HomePage;