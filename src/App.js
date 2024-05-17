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
import ProtectedRoutes from './privateRoutes';
import Todo from './components/toDo';
import NotFound from './components/notFound';
import VideoComponent from './components/videos';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/homepage" element={<HomePage/>} />
      <Route element={<ProtectedRoutes/>}>
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/edit-expenses/:id" element={<EditExpenses />} />
      <Route path="/add-expense" element={<AddExpense/>}/>
      <Route path="/notes" element={<Todo/>}/>
      <Route path='/fetch-videos' element={<VideoComponent/>} />
      </Route>
      <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
