import axios from 'axios';
import React, { useState } from 'react'

const VideoComponent = () => {
    const [isVideo,setIsVideo]= useState(false);
    const [videoData,setVideoData]= useState([]);
    const videoHandler=async()=>{
        try {
            
            const response = await axios.get('https://newback-vc3e.onrender.com/fetch-videos');
            console.log("RESP",response.data)
             setIsVideo(true)
             setVideoData(response.data)
        } catch (error) {
            console.log("error",error)
        }
    };


  return (
    <div>
        <button onClick={videoHandler}>fetchVideo</button>
        {isVideo ? videoData.map((val,index)=>{
            return (
                <div key={index}>
                    <p>{val.title}</p>
                    <p>{val.filename}</p>
                    <p>{val.description}</p>
                    <p>{val.uploader}</p>
                </div>
            )
        }): <p>no video found</p>} 
    </div>
  )
}

export default VideoComponent