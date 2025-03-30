import { Route, Routes } from 'react-router-dom';
import Login from './layouts/Login';
import MainLayout from './layouts/Main';
import AuthGuard from './helpers/AuthGuard';
import GuestGuard from './helpers/GuestGuard';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route
          index
          element={
            <SocketProvider>
              <MainLayout />
            </SocketProvider>
          }
        />
      </Route>

      <Route path='login'>
        <Route element={<GuestGuard />}>
          <Route index element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
