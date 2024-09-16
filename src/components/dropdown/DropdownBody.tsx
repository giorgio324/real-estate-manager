type DropdownBodyProps = {
  children?: React.ReactNode;
  position: { top: number; left: number };
  onClose: () => void;
};

const DropdownBody = ({ children, position, onClose }: DropdownBodyProps) => {
  return (
    <div className='fixed inset-0'>
      <div className='w-full h-full absolute inset-0 z-10' onClick={onClose} />
      <div
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        className='p-6 rounded-[10px] border border-border bg-white z-20'
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownBody;
