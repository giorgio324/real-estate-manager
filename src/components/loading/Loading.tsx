import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: React.ReactNode;
};
const Loading = ({ className, children }: Props) => {
  return (
    <div className={twMerge(className)}>
      <p className='text-secondary text-xl font-medium'>{children}</p>
    </div>
  );
};

export default Loading;
