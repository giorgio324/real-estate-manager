import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import dropdownIcon from '../../assets/images/DropdownIconDown.svg';
import { useModal } from '../../context/ModalContext';
import PlusIcon from '../../assets/images/ImagePlaceholder.svg';

type Option<T> = {
  id: number;
  name: string;
} & T;

type Props<T> = {
  options: Option<T>[] | undefined;
  placeholder: string;
  name: string;
  label: string;
  onChange?: (item: Option<T>) => void;
  onClick?: () => void;
  isLoading: boolean;
  error?: string;
  createAgent?: boolean;
};

const Select = <T,>({
  options,
  placeholder,
  error: dataError,
  isLoading,
  name,
  label,
  onChange,
  onClick,
  createAgent = false,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_field, meta] = useField<Option<T>>(name);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setIsOpen: setModalOpen } = useModal();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
    if (options?.length === 0 && !createAgent) {
      if (onClick) {
        onClick();
      }
      return;
    }
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (item: Option<T>) => {
    if (onChange) {
      onChange(item);
    }
    setIsOpen(false);
  };

  const handleAgentAdd = () => {
    setModalOpen(true);
    setIsOpen(false);
  };

  const touched = meta.touched;
  const error = meta.error;

  return (
    <div
      ref={dropdownRef}
      className='relative flex flex-col font-firago w-[384px] text-sm cursor-pointer'
    >
      <p className='block text-sm font-medium text-text'>{label}</p>
      <div
        onClick={handleClick}
        className={`border mt-[5px] px-[10px] py-[12px] w-full text-sm flex justify-between ${
          isOpen
            ? 'rounded-tl-md rounded-tr-md border-b-transparent'
            : 'rounded-md'
        } ${touched && error ? 'border-error' : 'border-silver'}`}
      >
        {isLoading ? (
          <p>იტვირთება მონაცემები...</p>
        ) : (
          meta.value?.name || placeholder
        )}
        {dataError && <p>{dataError}</p>}
        <img src={dropdownIcon} alt='dropdown icon' />
      </div>
      {isOpen && (
        <div className='absolute bottom-0 transform translate-y-full left-0 rounded-bl-md rounded-br-md bg-white w-full z-10'>
          {createAgent && (
            <div
              onClick={handleAgentAdd}
              className='border bordermd border-silver px-[10px] py-[12px] w-full text-sm border-b-0 last:border-b last:rounded-bl-md last:rounded-br-md flex gap-2 items-center'
            >
              <img src={PlusIcon} alt='Add agent Icon' />
              დაამატე აგენტი
            </div>
          )}
          {options?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className='border bordermd border-silver px-[10px] py-[12px] w-full text-sm border-b-0 last:border-b last:rounded-bl-md last:rounded-br-md'
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
