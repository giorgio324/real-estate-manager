import { useEffect, useRef, useState } from 'react';
import upIcon from '../../assets/images/DropdownIconUp.svg';
import downIcon from '../../assets/images/DropdownIconDown.svg';
import Button from '../button/Button';

type Props = {
  children: React.ReactNode;
  buttonText: string;
  dropdownTitle: string;
  onSubmit: () => void;
};

const NewDropdown = ({
  children,
  dropdownTitle,
  buttonText,
  onSubmit,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* content outside of dropdown will trigger setIsOpen(false) */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSubmit = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`rounded-md py-2 px-[14px] flex justify-center items-center gap-1 text-text font-medium ${
          isOpen ? 'bg-selected' : 'bg-transparent'
        }`}
      >
        {buttonText}
        <span>
          <img
            src={isOpen ? upIcon : downIcon}
            alt={isOpen ? 'menu open icon' : 'menu closed icon'}
          />
        </span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className='absolute bottom-0 transform translate-y-full left-0 p-6 rounded-[10px] border border-border bg-white z-20'
        >
          <p className='font-firago font-medium mb-6'>{dropdownTitle}</p>
          {children}
          <div className='flex justify-end mt-[32px]'>
            <Button
              className='bg-primary text-white py-2 px-[14px] rounded-lg font-firago font-medium transition-colors duration-200 ease-linear hover:bg-primaryHover'
              onClick={handleSubmit}
            >
              არჩევა
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDropdown;
