import upIcon from '../../assets/images/DropdownIconUp.svg';
import downIcon from '../../assets/images/DropdownIconDown.svg';
import Button from '../button/Button';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  buttonTitle: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const DropdownButton = ({ isOpen, onClick, buttonTitle, buttonRef }: Props) => {
  return (
    <Button
      onClick={onClick}
      className={`rounded-md py-2 px-[14px] flex justify-center items-center gap-1 text-text font-medium ${
        isOpen ? 'bg-selected' : 'bg-transparent'
      }`}
      type='button'
      ref={buttonRef}
    >
      {buttonTitle}
      <span>
        <img
          src={isOpen ? upIcon : downIcon}
          alt={isOpen ? 'menu open icon' : 'menu closed icon'}
        />
      </span>
    </Button>
  );
};

export default DropdownButton;
