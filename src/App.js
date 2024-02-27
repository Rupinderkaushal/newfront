import './App.css';
import Login from './components/Login';
import {Route,Routes,Navigate} from 'react-router-dom';
import SignUp from './components/Signup';
import HomePage from './components/homepage';
import Expenses from './components/expenses';
import EditExpenses from './components/editExpense';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin =async() => {
    const token = await localStorage.getItem('token');
    if(token){
    setIsLoggedIn(true)
    }
  };
  useEffect(()=>{
    handleLogin()
  },[])

  return (
    <div>
      <ToastContainer/>
      {!isLoggedIn && <Navigate to="/login" />}
      <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      {isLoggedIn && (
          <>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/expenses' element={<Expenses/>} />
        <Route path='/edit-expenses/:id' element={<EditExpenses/>}/>
        </>)}
      </Routes>
    </div>
  ); 
}

export default App;
