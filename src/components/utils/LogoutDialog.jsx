import useAuth from '../../hooks/useAuth';

const LogoutDialog = ({ open, setOpen }) => {
  const { handleLogout } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all`}
      >
        {/*form */}
        <div className='bg-white rounded-md w-[400px] p-4 space-y-4'>
          <div className='text-xl font-semibold text-gray-800 '>Confirm logout</div>
          <p className='text-gray-500'>Are you sure you want to logout?</p>
          <div className='flex items-center gap-3 w-fit ml-auto pt-2'>
            <button
              className='font-medium px-4 py-1 text-gray-800 hover:bg-gray-100 transition-colors rounded-md'
              onClick={handleClose}
            >
              No
            </button>
            <button
              className='bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-1 font-medium text-gray-50 rounded-md'
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`bg-[rgba(0,0,0,0.6)] fixed inset-0 z-40 ${open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all`}
        onClick={handleClose}
      />
    </>
  );
};

export default LogoutDialog;
