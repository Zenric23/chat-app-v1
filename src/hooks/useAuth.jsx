import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useAuth = () => useContext(UserContext);
export default useAuth;
