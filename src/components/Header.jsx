import useAuth from '../hooks/useAuth';

const Header = () => {
  const { selectedRecipient: selectedUser } = useAuth();

  return (
    <div className='px-2 h-[65px] border-b flex items-center w-full'>
      <div className='flex gap-2'>
        <img src={selectedUser?.profile_pic} className='w-8 h-8 rounded-full border-2 border-indigo-300' />
        <div className='grid items-center'>
          <span className='font-semibold text-gray-600 text-sm'>{selectedUser?.name}</span>
          <div className='flex gap-1 items-center'>
            <div className='w-[6px] h-[6px] bg-red-600 rounded-full' />
            <span className='text-gray-600 text-xs'>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
