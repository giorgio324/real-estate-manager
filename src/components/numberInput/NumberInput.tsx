import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  displayMessage?: boolean;
  validateOnBlur?: (value: string) => void;
  validateOnChange?: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
};

const NumberInput = ({
  label,
  name,
  placeholder,
  errorMessage,
  onChange,
  value,
  className,
  validateOnBlur,
  validateOnChange,
  icon,
}: Props) => {
  const id = useId();

  const handleBlur = () => {
    if (validateOnBlur) {
      validateOnBlur(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateOnChange) {
      validateOnChange(e.target.value);
    }
    onChange(e);
  };

  return (
    <div className='font-firago mr-[9px]'>
      {label && (
        <label htmlFor={id} className='font-medium text-text'>
          {label} *
        </label>
      )}
      <div className='relative'>
        {icon && (
          <span className='absolute top-1/2 right-[14px] transform -translate-y-1/2 text-sm'>
            {icon}
          </span>
        )}
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
    </div>
  );
};

export default NumberInput;
