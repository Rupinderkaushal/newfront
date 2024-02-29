import './App.css';
import Login from './components/Login';
import {Route,Routes,Navigate,Outlet} from 'react-router-dom';
import SignUp from './components/Signup';
import HomePage from './components/homepage';
import Expenses from './components/expenses';
import EditExpenses from './components/editExpense';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AddExpense from './components/addExpense';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const PrivateRoutes = () => {
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
} 
  useEffect(()=>{
    const checkLoginStatus = async () => {
      const token = await localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  },[])

  console.log("isuserLogegdiN",isLoggedIn)
 

  return (
    <div>
      <ToastContainer/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route element={<PrivateRoutes/>}>
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/edit-expenses/:id" element={<EditExpenses />} />
      <Route path="/add-expense" element={<AddExpense/>}/>
      </Route>
      </Routes>
    </div>
  ); 
}

export default App;
