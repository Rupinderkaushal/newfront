import {Navigate,Outlet} from 'react-router-dom';
import {isUserLoggedIn} from '../config/userSession';

const ProtectedRoutes=()=>{
    return(
        isUserLoggedIn ? <Outlet/> : <Navigate to='/login'/>
    )
};

export default ProtectedRoutes;