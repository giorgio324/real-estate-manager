import { twMerge } from 'tailwind-merge';

type Props = {
  is_rental: boolean;
  className?: string;
};
const ImageTag = ({ is_rental, className }: Props) => {
  return (
    <span
      className={twMerge(
        'absolute top-[23px] left-[23px] w-[90px] text-center font-firago font-medium text-xs text-white bg-secondary px-[10px] py-[6px] rounded-[15px]',
        className
      )}
    >
      {is_rental ? 'ქირავდება' : 'იყიდება'}
    </span>
  );
};

export default ImageTag;
