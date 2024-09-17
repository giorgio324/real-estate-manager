import { useField } from 'formik';
import { useId } from 'react';

type RadioInputProps = {
  label: string;
  name: string;
  value: string;
};

const RadioInput = ({ label, name, value }: RadioInputProps) => {
  const id = useId();
  const [field, _meta, helpers] = useField({ name, type: 'radio', value });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value);
    localStorage.setItem(name, value);
  };

  return (
    <div className='flex items-center gap-3 font-firago text-sm w-[134px]'>
      <input
        {...field}
        id={id}
        type='radio'
        onChange={handleChange}
        value={value}
        className='w-[17px] h-[17px]'
      />
      <label
        htmlFor={id}
        className='ml-2 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
