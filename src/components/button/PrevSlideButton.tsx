import ArrowIcon from '../../assets/images/BackIcon.svg';
type Props = {
  className?: string;
  onClick?: () => void;
  disabled: boolean;
};

const PrevSlideButton = ({ className, onClick, disabled }: Props) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <img src={ArrowIcon} alt='previous slide arrow' />
    </button>
  );
};

export default PrevSlideButton;
