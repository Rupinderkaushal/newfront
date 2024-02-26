import './App.css';
import Login from './components/Login';
import {Route,Routes} from 'react-router-dom';
import SignUp from './components/Signup';
import HomePage from './components/homepage';
import Expenses from './components/expenses';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/expenses' element={<Expenses/>} />
      </Routes>
    </div>
  ); 
}

export default App;
