import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: React.ReactNode;
};
const Error = ({ children, className }: Props) => {
  return (
    <div className={twMerge(className)}>
      <p className='text-red-500 text-xl font-medium'>{children}</p>
    </div>
  );
};

export default Error;
