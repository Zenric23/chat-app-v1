import { useCallback, useEffect, useState } from 'react';

// components
import SideBar from '../components/SideBar';
import ChatSection from '../components/ChatSection';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import Tooltip from '../components/utils/Tooltip';

// hooks
import useLogoutDialog from '../hooks/useLogoutDialog';
import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

import logo from '../assets/chat-nato-ni-logo.png';
import { callPublicRoute } from '../helpers/axiosHelpers';

const Main = () => {
  const { user } = useAuth();
  const { socketId } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);

  const { LogoutDialog, setOpenLogoutDialog } = useLogoutDialog();

  const updateUserSocketId = useCallback(async () => {
    if (!socketId && !user?._id) {
      return;
    }

    try {
      if (user._id && socketId) {
        await callPublicRoute({
          url: `/user/${user._id}`,
          method: 'PUT',
          data: {
            socketId: socketId
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [socketId, user?._id]);

  useEffect(() => {
    updateUserSocketId();
  }, [updateUserSocketId]);

  if (!user) {
    return <div></div>;
  }

  return (
    <div className='bg-gradient-to-b from-indigo-500 to-indigo-600 p-10 h-screen'>
      <div className='shadow-sm max-w-[1750px] mx-auto h-[780px]'>
        <div className='rounded-md p-1 bg-white'>
          <div className='h-16 bg-white border-b flex items-center px-3'>
            <img src={logo} className='h-10' />
            <div className='flex-grow' />
            <div className='flex gap-2'>
              <Tooltip text='Logout' position='bottom'>
                <div
                  className='hover:bg-gray-100 transition-colors p-2 rounded-full cursor-pointer'
                  onClick={() => setOpenLogoutDialog(true)}
                >
                  <ArrowRightStartOnRectangleIcon className='w-6 h-6 text-gray-600' />
                </div>
              </Tooltip>
              <Tooltip text={user?.name} position='bottom'>
                <img className='w-10 h-10 rounded-full border-2 border-indigo-300' src={user?.profile_pic} />
              </Tooltip>
            </div>
          </div>
          <div className='bg-white grid grid-cols-[minmax(60px,_60px)_minmax(200px,_400px)_1fr] divide-x h-full'>
            <LeftMenu />
            <SideBar setSelectedUser={setSelectedUser} />
            <div className='w-full'>
              <Header />
              <ChatSection selectedUser={selectedUser} />
            </div>
          </div>
        </div>
      </div>
      {/* Logout dialog */}
      {LogoutDialog}
    </div>
  );
};

export default Main;
