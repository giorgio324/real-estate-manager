import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'rounded-[10px] py-[10px] px-[16px] transition-colors duration-200 ease-linear text-base bg-primary text-white font-firago font-medium',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
