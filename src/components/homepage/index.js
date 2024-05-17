import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import lottie from "lottie-web";
import PremiumPic from "../../assets/premium_photo-1678823283274-358b3676fe5e.avif";
import { GiHamburgerMenu } from "react-icons/gi";
import works from "../../assets/homeage.jpg";
import benefits from "../../assets/benefits.jpeg";
import Carousel from 'react-bootstrap/Carousel';
import { GiProgression } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";



const content = ["Not Easy With Writting","Add Your Expense Online", "And Stay Relax", "Because Tree are usefull for oxygen"];
const speed = 150;
let isDeleting = false;
let index = 0;
let currentContentIndex = 0;
export function typeWriter() {
  const demoElement = document.getElementById("demo-div");
  if (!demoElement) return; // Check if the demo element exists

  if (isDeleting) {
    // If deleting, remove the last character
    demoElement.innerHTML = content[currentContentIndex].substring(0, index - 1);
    index--;

    // Check if all characters are deleted
    if (index <= 0) {
      isDeleting = false;
      index = 0;
      currentContentIndex = (currentContentIndex + 1) % content.length; // Move to the next content
      setTimeout(typeWriter, 1000); // Pause before starting to type new content
    } else {
      // Continue deleting with a delay
      setTimeout(typeWriter, speed);
    }
  } else {
    // If typing, add the next character
    demoElement.innerHTML = content[currentContentIndex].substring(0, index + 1);
    index++;

    // Check if we reached the end of the current content
    if (index >= content[currentContentIndex].length) {
      // Start deleting after a short pause
      isDeleting = true;
      setTimeout(typeWriter, 1000); // Pause before deleting
    } else {
      // Continue typing with a delay
      setTimeout(typeWriter, speed);
    }
  }
}
const HomePage = () => {
  const container = useRef(null);
  const [isOpen,setIsOpen] = useState(false);
  const hamHandler=()=>{
    setIsOpen(!isOpen)
  };
 
  
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
  useEffect(()=>{
    typeWriter()
  },[])
  return (
    <div className='homepage-wrapper'>
        <div className='logo-link-div'>
          <div className='logo-div'>
            <img src={Logo} alt="Logo"/>
          </div>
          <div className='web-links'>
            <NavLink to='/expenses'>Expenses</NavLink>
            <NavLink to='/notes'>Notes</NavLink>
            <NavLink to='/suggestions'>Suggestions</NavLink>
            <NavLink to='/fetch-videos'>Goals</NavLink>
          </div>
          <div className='mobile-ham' onClick={hamHandler}>
          <GiHamburgerMenu size={30} />
          </div>
          {isOpen && <div className='ham-links'>
          <NavLink to='/expenses'>Expenses</NavLink>
            <NavLink to='/todo'>Todo</NavLink>
            <NavLink to='/suggestions'>Suggestions</NavLink>
            <NavLink to='/fetch-videos'>Goals</NavLink>
            </div>}
        </div>
        <div className='text-lottie-div'>
          <div className='text-div'>
            <p id="demo-div"></p>
          </div>
          <div className='home-lottie-div' ref={container}></div>
        </div>
        <div className='howitworks'>
          <h1>How it works <GiProgression/></h1>
          <div className='how-works-text'>
          <div className='how-work-img-div'>
              <img src={works} alt="works"/>
            </div>
            <ul>
              <li>
                we Keep Track of your expenses. In a Modern Day World time is everything.Then why waste time on finding a notebook for adding expenses visit our site and add your daily expenses.
              </li>
              <li>For that you have to create your account here which is free of cost.Then after login you will redirect to homepage where you can see add and update your expenses list.</li>
            </ul>
            
          </div>
        </div>
        <div className='howitworks beenfits'>
          <h1>Benefits <GrMoney/></h1>
          <div className='how-works-text'>
            <ul>
              <li>
                we Keep Track of your expenses. In a Modern Day World time is everything.Then why waste time on finding a notebook for adding expenses visit our site and add your daily expenses.
              </li>
              <li>For that you have to create your account here which is free of cost.Then after login you will redirect to homepage where you can see add and update your expenses list.</li>
            </ul>
            <div className='how-work-img-div'>
              <img src={benefits} alt="works"/>
            </div>
          </div>
        </div>

        
        
    </div>
  )
}

export default HomePage;