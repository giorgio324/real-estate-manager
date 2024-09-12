import upIcon from '../../assets/images/DropdownIconUp.svg';
import downIcon from '../../assets/images/DropdownIconDown.svg';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  buttonTitle: string;
};

const Filter = ({ buttonTitle, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-selected rounded-md py-2 px-3 flex justify-center items-center gap-1'
      >
        {buttonTitle}
        <span>
          <img
            src={isOpen ? upIcon : downIcon}
            alt={isOpen ? 'menu open icon' : 'menu closed icon'}
          />
        </span>
      </button>
      {isOpen && (
        <div className='absolute left-0 mt-2 p-4 rounded-md border border-border bg-white z-50 min-w-[200px]'>
          <p>რეგიონის მიხედვით</p>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center'>
              <h1 className='mr-2'>tbilisi</h1>
              <input type='checkbox' />
            </div>
            {/* Add more content here as needed */}
            <div className='flex items-center'>
              <h1 className='mr-2'>another city</h1>
              <input type='checkbox' />
            </div>
            {/* More content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
