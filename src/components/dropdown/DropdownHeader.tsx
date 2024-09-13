type Props = {
  title: string;
};

const DropdownHeader = ({ title }: Props) => {
  return <p className='font-firago font-medium mb-6'>{title}</p>;
};

export default DropdownHeader;
