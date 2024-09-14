interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ name, onChange, checked }: CheckboxProps) => {
  return (
    <div className='flex items-center gap-2 w-[190px]'>
      <input
        id={`checkbox-${name}`}
        type='checkbox'
        className='accent-valid text-white w-5 h-5'
        name={name}
        value={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`checkbox-${name}`} className='ml-2 font-firago text-sm'>
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
