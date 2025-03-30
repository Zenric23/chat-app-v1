import { createContext, useState } from 'react';
import { callPublicRoute } from '../helpers/axiosHelpers';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const handleLogin = async (loginDetails) => {
    const res = await callPublicRoute({
      url: '/auth/google/login',
      method: 'POST',
      data: loginDetails
    });
    localStorage.setItem('user', JSON.stringify({ ...res.data, isLoggedIn: true }));
    window.location.pathname = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.pathname = '/login';
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout, selectedRecipient, setSelectedRecipient }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
