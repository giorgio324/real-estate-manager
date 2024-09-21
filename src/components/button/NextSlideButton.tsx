import nextIcon from '../../assets/images/NextSliderIcon.svg';
type Props = {
  className?: string;
  onClick?: () => void;
  disabled: boolean;
};
const NextSlideButton = ({ className, onClick, disabled }: Props) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <img src={nextIcon} alt='next slide arrow' />
    </button>
  );
};

export default NextSlideButton;
