import { useField } from 'formik';
import { useId } from 'react';
import HelperText from '../helperText/HelperText';

type TextInputProps = {
  label: string;
  name: string;
  hintText?: string;
};

const TextInput = ({ label, name, hintText }: TextInputProps) => {
  const id = useId();
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true);
    helpers.setValue(e.target.value);
    localStorage.setItem(name, e.target.value);
  };

  const touched = meta.touched;
  const error = meta.error;
  return (
    <div className='flex flex-col font-firago w-[384px] text-sm'>
      <label htmlFor={id} className='block text-sm font-medium text-text'>
        {label}
      </label>
      <input
        {...field}
        id={id}
        type='text'
        onChange={handleChange}
        className={`border mt-[5px] px-[10px] py-[12px] rounded-md shadow-sm w-full text-sm ${
          touched && error ? 'border-error' : 'border-silver'
        }`}
      />

      <HelperText
        state={touched ? (error ? 'error' : 'valid') : 'info'}
        errorText={meta.error}
        hintText={hintText}
        displayIcon
      />
    </div>
  );
};

export default TextInput;
