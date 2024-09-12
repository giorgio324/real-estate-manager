import upIcon from '../../assets/images/DropdownIconUp.svg';
import downIcon from '../../assets/images/DropdownIconDown.svg';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children?: React.ReactNode;
  buttonTitle: string;
};

const Filter = ({ buttonTitle, children }: Props) => {
  /* position პოულობს ღილაკის ადგილს ref ით და ამის მიხედვით გამომაქვს მოდალის მსგავსი dropdown რომელიც fixed არის ეკრანის მიმართ */
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const position = buttonRef.current?.getBoundingClientRect();
  let bottom = 0;
  let left = 0;
  if (position) {
    bottom = position?.bottom + 10;
    left = position.left - 6;
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-selected rounded-md py-2 px-3 flex justify-center items-center gap-1'
        ref={buttonRef}
      >
        {buttonTitle}
        <span>
          <img
            src={isOpen ? upIcon : downIcon}
            alt={isOpen ? 'menu open icon' : 'menu closed icon'}
          />
        </span>
      </button>
      {isOpen &&
        createPortal(
          <div className='fixed inset-0'>
            <div
              className='w-full h-full absolute inset-0 z-10'
              onClick={() => setIsOpen(false)}
            />
            <div>
              <div
                style={{
                  position: 'fixed',
                  top: `${bottom}px`,
                  left: `${left}px`,
                }}
                className='p-4 rounded-md border border-border bg-white z-20 min-w-[200px]'
              >
                <p>რეგიონის მიხედვით</p>
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center'>
                    <h1 className='mr-2'>tbilisi</h1>
                    <input type='checkbox' />
                  </div>
                  <div className='flex items-center'>
                    <h1 className='mr-2'>another city</h1>
                    <input type='checkbox' />
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Filter;
