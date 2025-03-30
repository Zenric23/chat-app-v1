import { IoSearch } from 'react-icons/io5';
import { truncateString } from '../utils/string';
import { callPublicRoute } from '../helpers/axiosHelpers';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { format } from 'date-fns';
import { HandRaisedIcon } from '@heroicons/react/16/solid';
import { useDebounce } from 'use-debounce';

const SideBar = () => {
  const sidebarRef = useRef(null);

  const { user: loggedInUser, selectedRecipient, setSelectedRecipient } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const getUsers = useCallback(async () => {
    try {
      const res = await callPublicRoute({
        url: '/user',
        method: 'GET',
        params: {
          excludedUserId: loggedInUser?._id,
          searchText: debouncedSearchText
        }
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loggedInUser?._id, debouncedSearchText]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className='w-full divide-y h-full' ref={sidebarRef}>
      <div className='px-4 h-16 flex items-center'>
        <div className='flex bg-gray-100 rounded-lg w-full'>
          {/* Search button */}
          <button className=' text-gray-500 hover:bg-gray-300 w-10 flex justify-center items-center rounded-s'>
            <IoSearch />
          </button>
          {/* Search input */}
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='p-2 rounded-e text-sm w-full outline-none bg-gray-100 text-gray-600'
            placeholder='Search user...'
          />
        </div>
      </div>
      {/* Users */}
      <div className='overflow-auto max-h-[680px]'>
        {!loading && users.length === 0 ? (
          <p className='text-gray-500 text-center mt-10'>No users found</p>
        ) : (
          <>
            {!loading ? (
              <div className='grid divide-y'>
                {users.map((user) => (
                  <div
                    className={`flex justify-between gap-2 items-start py-2 px-4 cursor-pointer hover:bg-gray-100 ${selectedRecipient?._id === user?._id && 'bg-indigo-50 hover:bg-indigo-50'}`}
                    onClick={() => setSelectedRecipient(user)}
                    key={user?.name}
                  >
                    <div className='flex gap-3'>
                      <img className='w-10 h-10 rounded-full border-2 border-indigo-300' src={user?.profile_pic} />
                      <div className='grid gap-1'>
                        <span className='text-sm font-semibold text-gray-600'>{user?.name}</span>
                        {user?.lastMessage ? (
                          <span className='text-xs text-gray-400'>{format(new Date(user?.lastMessage?.sent), 'p')}</span>
                        ) : (
                          <div />
                        )}
                        {user?.lastMessage ? (
                          <p className='text-sm text-gray-600'>
                            {user?.lastMessage?.senderId === loggedInUser._id && 'You: '}
                            {truncateString(user?.lastMessage?.message, 38)}
                          </p>
                        ) : (
                          <p className='text-sm text-gray-600 flex gap-2 items-center'>
                            <HandRaisedIcon className='w-4 h-4' />
                            Say Hi to this person!
                          </p>
                        )}
                      </div>
                    </div>
                    {/* {user.unreadMessageCount > 0 ? (
                    <div className='bg-indigo-600 text-xs font-medium text-white p-1 w-4 h-4 flex rounded-full justify-center items-center'>
                      {user.unreadMessageCount}
                    </div>
                  ) : (
                    <div className='w-5' />
                  )} */}
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid divide-y py-2 px-4'>
                {[...Array(10)].map((item) => (
                  <Fragment key={item}>
                    <div className='flex animate-pulse space-x-4 py-3'>
                      <div className='size-10 rounded-full bg-gray-200'></div>
                      <div className='flex-1 space-y-3 py-1'>
                        <div className='h-2 rounded bg-gray-200 w-[30%]' />
                        <div className='h-2 rounded bg-gray-200 w-[30%]' />
                        <div className='h-2 rounded bg-gray-200 w-[90%]' />
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </>
        )}
        {/* loading... */}
      </div>
    </div>
  );
};

export default SideBar;
