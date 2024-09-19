import { twMerge } from 'tailwind-merge';

type Props = {
  iconSrc: string;
  altText?: string;
  children: React.ReactNode;
  classname?: string;
};

const IconItem = ({ children, iconSrc, altText, classname }: Props) => {
  return (
    <div className={twMerge('flex items-center gap-1', classname)}>
      <img src={iconSrc} alt={altText} className='w-[22px] h-[22px]' />
      <p className='text-2xl'>{children}</p>
    </div>
  );
};

export default IconItem;
