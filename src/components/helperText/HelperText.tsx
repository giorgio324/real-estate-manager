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
  return (
    <div
      className={`font-firago text-sm mt-2 flex ${
        state === 'valid' ? 'text-valid' : ''
      } ${state === 'error' ? 'text-error' : ''} ${
        state === 'info' ? 'text-text' : ''
      }`}
    >
      {displayIcon && (
        <img
          src={`${state === 'valid' ? validIcon : ''} ${
            state === 'error' ? errorIcon : ''
          } ${state === 'info' ? validationIcon : ''}`}
          alt='helper icon'
          className={`mr-[7px]`}
        />
      )}
      {state === 'error' && errorText && <p>{errorText}</p>}
      {(state === 'valid' || state === 'info') && hintText && <p>{hintText}</p>}
    </div>
  );
};

export default HelperText;
