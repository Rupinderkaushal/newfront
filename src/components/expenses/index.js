import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import lottie from "lottie-web";
import maleIcon from "../../assets/images.png";
import pic from "../../assets/female.jpg";
import { AiOutlineFolderAdd, AiFillSignal } from "react-icons/ai";
import { GiTargetDummy,GiHamburgerMenu } from "react-icons/gi";
import AddExpense from "../addExpense";
import ViewExpense from "../viewExpense";
import BarGraph from "../charts/barGrapgh";

const Expenses = () => {
  const [user, setUser] = useState();
  const [gender, setGender] = useState();
  const [currentPage, setCurrentPage] = useState("viewExpense");
  const [isHamOpen,setIsHamOpen]=useState(false);
  const navigate = useNavigate();
  const container = useRef(null);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const homepageHandler = () => {
    navigate("/homepage");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "addExpense":
        return <AddExpense />;
      case "viewExpense":
        return <ViewExpense user={user} />;
        case"expensebars" : 
        return <BarGraph/>
      default:
        return null;
    }
  };
  const hamHandler=()=>{
    setIsHamOpen(!isHamOpen)
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const gender = localStorage.getItem("gender");
    if (user) {
      setUser(user);
      setGender(gender);
    }
  }, []);

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
    <div className="expense-wrapper">
      <div className="expense-nav">
        <div className="expense-nav-link">
          <p className="hello">
            Hello,<span> {user}</span>
            <span className="yeti">
              <img src={gender === "male" ? maleIcon : pic} />
            </span>
          </p>
          <div className="homepagelogout">
            <button onClick={homepageHandler}>HomePage</button>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout{" "}
              <RiLogoutCircleRLine
                style={{ marginLeft: "10px" }}
                color="red"
                size={20}
              />
            </button>
          </div>
          <div className="mobile-ham"><GiHamburgerMenu size={25} onClick={hamHandler} /></div>
          {isHamOpen && <div className="ham-content">
          <button  onClick={homepageHandler}>HomePage</button>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
            </div>}
        </div>
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-div">
        <p onClick={() => setCurrentPage("viewExpense")}>
            {" "}
            <span className="pre-list-icon">
              <AiFillSignal size={30} />
            </span>{" "}
            View Expense
          </p>
          <p onClick={() => setCurrentPage("addExpense")}>
            {" "}
            <span className="pre-list-icon">
              <AiOutlineFolderAdd size={30} />
            </span>
            Add Expense
          </p>
          
          <p onClick={() => setCurrentPage("expensebars")}>
            
            <span className="pre-list-icon">
              <GiTargetDummy size={30} />
            </span>{" "}
            Expense Bars
          </p>
          <p>
            <span className="pre-list-icon">
              <GiTargetDummy size={30} />
            </span>
            Dummy Bars
          </p>
          <p>
            <span className="pre-list-icon">
              <GiTargetDummy size={30} />
            </span>
            Dummy Bars
          </p>
          <p>
            <span className="pre-list-icon">
              <GiTargetDummy size={30} />
            </span>
            Dummy Bars
          </p>
          <p>
            <span className="pre-list-icon">
              <GiTargetDummy size={30} />
            </span>
            Dummy Bars
          </p>
        </div>
        <div className="mob-nav"><p onClick={() => setCurrentPage("viewExpense")}>View </p>
        <p onClick={() => setCurrentPage("addExpense")}>Add</p>
        <p onClick={() => setCurrentPage("expensebars")}>Bars</p></div>
        <div className="content-div">{renderPage()}</div>
      </div>
    </div>
  );
};

export default Expenses;
