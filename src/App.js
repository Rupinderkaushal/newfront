import './App.css';
import Login from './components/Login';
import {Route,Routes,Navigate,Outlet} from 'react-router-dom';
import SignUp from './components/Signup';
import HomePage from './components/homepage';
import Expenses from './components/expenses';
import EditExpenses from './components/editExpense';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AddExpense from './components/addExpense';
import { LoggedInContext } from './store/logginContext';
import ProtectedRoutes from './privateRoutes';

function App() {

 

  return (
    <div>
      <ToastContainer/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoutes/>}>
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/edit-expenses/:id" element={<EditExpenses />} />
      <Route path="/add-expense" element={<AddExpense/>}/>
      </Route>
      </Routes>
    </div>
  ); 
}

export default App;
