import { ArchiveBoxIcon, ChatBubbleOvalLeftIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import Tooltip from './utils/Tooltip';
import useLogoutDialog from '../hooks/useLogoutDialog';

const LeftMenu = () => {
  const { LogoutDialog, setOpenLogoutDialog } = useLogoutDialog();

  return (
    <>
      <div className='flex flex-col items-center py-2 gap-2'>
        {/* <div className='h-16 flex p-1 justify-center items-center'>
        <img
          className='w-10 h-10 rounded-full border-2 border-indigo-300'
          src='https://pics.craiyon.com/2023-10-28/5ad22761b9cf4196abba9a20dcc50c61.webp'
        />
      </div> */}
        <Tooltip text='Archive (coming soon)' position='right'>
          <div className='transition-colors p-2 rounded-full opacity-50'>
            <ChatBubbleOvalLeftIcon className='w-6 h-6 text-gray-600' />
          </div>
        </Tooltip>
        <Tooltip text='Request (coming soon)' position='right'>
          <div className='transition-colors p-2 rounded-full opacity-50'>
            <ArchiveBoxIcon className='w-6 h-6 text-gray-600' />
          </div>
        </Tooltip>
        <div className='flex-grow' />
        <div className='h-16 flex p-1 justify-center items-center'>
          <Tooltip text='Logout' position='right'>
            <div
              className='hover:bg-gray-100 transition-colors p-2 rounded-full cursor-pointer'
              onClick={() => setOpenLogoutDialog(true)}
            >
              <ArrowRightStartOnRectangleIcon className='w-6 h-6 text-gray-600' />
            </div>
          </Tooltip>
        </div>
      </div>
      {/* Logout dialog */}
      {LogoutDialog}
    </>
  );
};

export default LeftMenu;
