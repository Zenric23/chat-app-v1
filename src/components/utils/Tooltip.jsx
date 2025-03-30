import { useState } from 'react';

const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative flex items-center' onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}

      {isVisible && (
        <div
          className={`absolute whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md select-none
            ${position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
          `}
        >
          {text}
          {/* <div
            className={`absolute w-2 h-2 bg-gray-800 rotate-45 
            ${position === 'top' ? 'left-1/2 -translate-x-1/2 top-full' : ''}
            ${position === 'bottom' ? 'left-1/2 -translate-x-1/2 bottom-full' : ''}
            ${position === 'left' ? 'top-1/2 -translate-y-1/2 right-full' : ''}
            ${position === 'right' ? 'top-1/2 -translate-y-1/2 left-full' : ''}
          `}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
