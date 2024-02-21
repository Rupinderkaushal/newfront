import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
  const [response,setResponse]= useState(false);
  const [data,setData] = useState("");
  const clickhandler =async()=>{
  const resp = await axios.get("https://rupinder.onrender.com/");
  if(resp.data){
    setResponse(true);
    setData(resp.data.name)
  }
  }
  return (
    <div className="App">
      <button onClick={clickhandler}>click</button>
      {response && <p>{data}</p>}
    </div>
  ); 
}

export default App;
