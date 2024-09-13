import upIcon from '../../assets/images/DropdownIconUp.svg';
import downIcon from '../../assets/images/DropdownIconDown.svg';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  buttonTitle: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const DropdownButton = ({ isOpen, onClick, buttonTitle, buttonRef }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md py-2 px-3 flex justify-center items-center gap-1 transition-colors duration-200 ease-linear ${
        isOpen ? 'bg-selected' : ''
      }`}
      ref={buttonRef}
    >
      {buttonTitle}
      <span>
        <img
          src={isOpen ? upIcon : downIcon}
          alt={isOpen ? 'menu open icon' : 'menu closed icon'}
        />
      </span>
    </button>
  );
};

export default DropdownButton;
