import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { useModal } from '../../context/ModalContext';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ children, className }: Props) => {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      {isOpen &&
        createPortal(
          <div className='fixed inset-0 flex justify-center items-center'>
            <div
              className='w-full h-full absolute inset-0 z-40 bg-overlay'
              onClick={() => setIsOpen(false)}
            />
            <div
              className={twMerge(
                'bg-white z-50 px-[105px] py-[87px] shadow-modalShadow rounded-[10px]',
                className
              )}
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
