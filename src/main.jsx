import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GoogleOAuthProvider clientId='968812035435-prr2iin6us67pjh3d8frgft6fn2dd610.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
