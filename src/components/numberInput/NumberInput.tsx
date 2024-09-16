import { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  displayMessage?: boolean;
  validateOnBlur?: (value: number) => void;
  validateOnChange?: (value: number) => void;
  className?: string;
};

const NumberInput = ({
  label,
  name,
  placeholder,
  displayMessage = true,
  errorMessage,
  onChange,
  value,
  className,
  validateOnBlur,
  validateOnChange,
}: Props) => {
  const [touched, setTouched] = useState(false);
  const id = useId();

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      validateOnBlur(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (validateOnChange) {
      validateOnChange(Number(e.target.value));
    }
  };

  return (
    <div className='font-firago mr-[9px]'>
      {label && (
        <label htmlFor={id} className='font-medium text-text'>
          {label} *
        </label>
      )}
      <div className='relative'>
        <span className='absolute top-1/2 right-[14px] transform -translate-y-1/2 text-sm'>
          {'\u20BE'}
        </span>
        <input
          type='number'
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={twMerge(
            `text-sm text-filterText placeholder:text-placeholder pl-[10px] pr-[26px] py-[12px] border border-silver rounded-md w-full ${
              errorMessage ? 'border-error' : ''
            }`,
            className
          )}
        />
      </div>
      {touched && errorMessage && displayMessage && (
        <p className={`${errorMessage ? 'text-error ' : ''}`}>error</p>
      )}
      {touched && !errorMessage && displayMessage && (
        <p className={`${errorMessage ? 'text-valid ' : ''}`}>error</p>
      )}
    </div>
  );
};

export default NumberInput;
