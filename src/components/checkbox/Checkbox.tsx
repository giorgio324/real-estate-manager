interface CheckboxProps {
  id: string;
  label: string;
}

const Checkbox = ({ id, label }: CheckboxProps) => {
  return (
    <div className='flex items-center gap-2 w-[190px]'>
      <input
        type='checkbox'
        className='accent-valid text-white w-5 h-5'
        id={id}
      />
      <label htmlFor={id} className='ml-2 font-firago text-sm'>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
