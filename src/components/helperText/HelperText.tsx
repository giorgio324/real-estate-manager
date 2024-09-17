import validationIcon from '../../assets/images/validationIcon.svg';
import errorIcon from '../../assets/images/ErrorIcon.svg';
import validIcon from '../../assets/images/ValidIcon.svg';

type Props = {
  hintText?: string;
  errorText?: string;
  displayIcon?: boolean;
  state: 'valid' | 'error' | 'info';
};

const HelperText = ({
  hintText,
  errorText,
  displayIcon,
  state = 'info',
}: Props) => {
  // Determine the text color class based on the state
  const textColorClass = {
    valid: 'text-valid',
    error: 'text-error',
    info: 'text-text',
  }[state];

  // Determine the icon source based on the state
  const iconSrc = {
    valid: validIcon,
    error: errorIcon,
    info: validationIcon,
  }[state];

  return (
    <div className={`font-firago text-sm mt-2 flex ${textColorClass}`}>
      {displayIcon && (
        <img src={iconSrc} alt='helper icon' className='mr-[7px]' />
      )}
      {/* Display error text if the state is error, else show hint text */}
      {state === 'error' && errorText && <p>{errorText}</p>}
      {(state === 'valid' || state === 'info') && hintText && <p>{hintText}</p>}
    </div>
  );
};

export default HelperText;
