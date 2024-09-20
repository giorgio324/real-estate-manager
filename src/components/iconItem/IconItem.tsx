import { twMerge } from 'tailwind-merge';

type Props = {
  iconSrc: string;
  altText?: string;
  children: React.ReactNode;
  classname?: string;
  iconClassname?: string;
};

const IconItem = ({
  children,
  iconSrc,
  altText,
  classname,
  iconClassname,
}: Props) => {
  return (
    <div className={twMerge('flex items-center gap-1 text-2xl', classname)}>
      <img
        src={iconSrc}
        alt={altText}
        className={twMerge('w-[22px] h-[22px]', iconClassname)}
      />
      <p>{children}</p>
    </div>
  );
};

export default IconItem;
