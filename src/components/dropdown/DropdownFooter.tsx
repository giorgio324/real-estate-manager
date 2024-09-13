type Props = {
  onClick: () => void;
};

const DropdownFooter = ({ onClick }: Props) => {
  return (
    <div className='flex justify-end'>
      <button
        className='bg-primary text-white py-2 px-[14px] mt-[32px] rounded-lg font-firago font-medium'
        onClick={onClick}
      >
        არჩევა
      </button>
    </div>
  );
};
export default DropdownFooter;
