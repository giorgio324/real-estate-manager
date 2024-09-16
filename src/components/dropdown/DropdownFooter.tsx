import Button from '../button/Button';

type Props = {
  onClick: () => void;
};

const DropdownFooter = ({ onClick }: Props) => {
  return (
    <div className='flex justify-end mt-[32px]'>
      <Button
        className='bg-primary text-white py-2 px-[14px] rounded-lg font-firago font-medium transition-colors duration-200 ease-linear hover:bg-primaryHover'
        onClick={onClick}
      >
        არჩევა
      </Button>
    </div>
  );
};
export default DropdownFooter;
