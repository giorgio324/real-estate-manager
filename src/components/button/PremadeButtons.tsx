type Props = {
  title: string;
  premadeValues: number[];
  onClick: (value: number, name: 'min' | 'max') => void;
  icon: React.ReactNode;
  name: 'min' | 'max';
};
const PremadeButtons = ({
  onClick,
  premadeValues,
  title,
  icon,
  name,
}: Props) => {
  return (
    <div className='flex flex-col items-start w-full'>
      <h3 className='font-medium'>{title}</h3>
      <div className='flex gap-2 mt-4 flex-col items-start'>
        {premadeValues.map((value) => (
          <button
            key={value}
            onClick={() => onClick(value, name)}
            className={'text-filterText mt-2'}
          >
            {value.toLocaleString()} {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PremadeButtons;
