import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

// components
import { callPublicRoute } from '../helpers/axiosHelpers';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import { PaperAirplaneIcon, HandRaisedIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';

// ===================================== || Chat Section || ===================================== //

const ChatSection = () => {
  const { user, selectedRecipient: selectedUser } = useAuth();
  const { socket } = useSocket();

  const textareaRef = useRef(null);
  const chatConRef = useRef(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const adjustHeight = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto'; // Reset height
    const textareaNewHeight = textarea.scrollHeight;

    // Ensure it doesn't exceed 400px
    textarea.style.height = textareaNewHeight > 150 ? '150px' : `${textareaNewHeight}px`;

    if (textareaNewHeight > 150) {
      textarea.classList.remove('hide-scroll');
    } else {
      textarea.classList.add('hide-scroll');
    }
  };

  const handleSendMessage = () => {
    if (!message) {
      return;
    }
    const payload = {
      recipientId: selectedUser?._id,
      // recipientSocketId: selectedUser?.socketId,
      senderId: user?._id,
      message: message
    };
    socket.emit('private-message', payload, (response) => {
      setMessages((prev) => [...prev, response]);
    });
    setMessage('');
  };

  const getMessages = useCallback(async () => {
    if (!user?._id || !selectedUser?._id) {
      setLoading(false);
      return;
    }

    try {
      const res = await callPublicRoute({
        url: '/message/private-conversation',
        method: 'GET',
        params: {
          senderId: user?._id,
          recieverId: selectedUser?._id
        }
      });
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?._id, setMessages, user?._id]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('private-message', (msgData) => {
      setMessages((prev) => [...prev, msgData]);
    });

    // event registration cleanup
    // to prevent event duplicate registrations
    // clean-up function runs when component unmounts or before the effect re-runs
    return () => {
      socket.off('private-message');
    };
  }, [socket]);

  return (
    <div className='flex flex-col gap-5 h-[700px] pb-2'>
      <div className='flex-1 overflow-auto' ref={chatConRef}>
        {!loading && messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <div className='flex items-center gap-2 opacity-30'>
              <HandRaisedIcon className='w-10 h-10' />
              <span className='text-nowrap font-semibold'>Say Hi to this person!</span>
            </div>
          </div>
        ) : (
          <>
            {!loading ? (
              <div className='p-4 grid gap-3'>
                {messages.map((m) => (
                  <Fragment key={m._id}>
                    {m.senderId !== user?._id ? (
                      <div>
                        <div className='flex gap-2 items-end'>
                          <img
                            src={selectedUser?.profile_pic}
                            className='w-6 h-6 rounded-full border-2 border-indigo-300 items-end'
                          />
                          <div className='p-3 text-gray-600 rounded-md w-2/4 text-sm bg-gray-100 text rounded-bl-none'>
                            <p>{m.message}</p>
                          </div>
                        </div>
                        <p className='text-gray-400 text-xs ml-8 mt-2'>{format(new Date(m?.sent), 'eeee p')}</p>
                      </div>
                    ) : (
                      <div className='w-2/4 ml-auto'>
                        <div className='p-3 rounded-md bg-indigo-600 text-gray-100  text-sm'>
                          <p>{m.message}</p>
                        </div>
                        <p className='text-gray-400 text-xs mt-2 text-end'>{format(new Date(m?.sent), 'eeee p')}</p>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className='border h-full flex items-center justify-center'>
                <div className='w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
          </>
        )}
      </div>
      <div className={`px-4 flex gap-2 items-center ${loading && 'pointer-events-none opacity-40'}`}>
        <div>
          <button
            onClick={handleSendMessage}
            className='bg-indigo-600 text-indigo-50 p-2 rounded-md transition-colors hover:bg-indigo-700'
          >
            <PaperAirplaneIcon className='w-8 h-8' />
          </button>
        </div>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={textareaRef}
          className={`w-full text-gray-800 p-2 border border-gray-300 rounded-md resize-none overflow-auto outlined outline-none`}
          rows='2'
          placeholder='Type here...'
          onInput={adjustHeight}
        />
      </div>
    </div>
  );
};

export default ChatSection;
