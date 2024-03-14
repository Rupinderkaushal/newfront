import React, { useEffect, useRef, useState } from 'react';
import "./style.css"
import lottie from "lottie-web";

const NotFound = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../Lotties/notfound.json"),
    });
    return () => {
      lottie.destroy();
    };
  }, []);
  return (
    <div className='notfound' ref={container}></div>
  )
}

export default NotFound