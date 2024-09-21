import { useField } from 'formik';
import { useId } from 'react';
import HelperText from '../helperText/HelperText';

type TextAreaInputProps = {
  label: string;
  name: string;
  hintText?: string;
};

const TextAreaInput = ({ label, name, hintText }: TextAreaInputProps) => {
  const id = useId();
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    helpers.setTouched(true);
    helpers.setValue(e.target.value);
    localStorage.setItem(name, e.target.value);
  };

  const touched = meta.touched;
  const error = meta.error;

  return (
    <div className='flex flex-col font-firago text-sm'>
      <label htmlFor={id} className='block text-sm font-medium text-text'>
        {label}
      </label>
      <textarea
        style={{ resize: 'none' }}
        {...field}
        id={id}
        onChange={handleChange}
        className={`border mt-[5px] px-[10px] py-[12px] w-full h-[135px] rounded-md shadow-sm text-sm ${
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

export default TextAreaInput;
