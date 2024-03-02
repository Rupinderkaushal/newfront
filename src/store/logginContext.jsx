import {createContext} from 'react';

export const LoggedInContext = createContext(
{isLoggedIn : localStorage.getItem('token')}
)