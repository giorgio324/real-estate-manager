import { useModal } from '../../context/ModalContext';
import Modal from './Modal';
import Button from '../button/Button';
import { useDeleteRealEstate } from '../../hooks/useDeleteRealEstate';

const ConfirmDeleteModal = ({ id }: { id: string }) => {
  const { setIsOpen } = useModal();
  const { mutate } = useDeleteRealEstate(id);
  return (
    <Modal className='py-[58px] px-[170px] relative rounded-[20px]'>
      <button
        className='absolute right-[13px] top-[6px] text-filterText hover:text-text transition-colors duration-200 ease-linear'
        onClick={() => setIsOpen(false)}
      >
        <svg
          width='47'
          height='47'
          viewBox='0 0 47 47'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M23.5011 23.4999L29.0401 29.0389M17.9622 29.0389L23.5011 23.4999L17.9622 29.0389ZM29.0401 17.9609L23.5011 23.4999L29.0401 17.9609ZM23.5011 23.4999L17.9622 17.9609L23.5011 23.4999Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <h3 className='font-firago text-xl'>გსურთ წაშალოთ ლისტინგი?</h3>
      <div className='flex gap-4 mt-[49px]'>
        <Button
          className='text-primary bg-white border border-primary hover:text-white hover:bg-primary'
          onClick={() => setIsOpen(false)}
        >
          გაუქმება
        </Button>
        <Button className='hover:bg-primaryHover' onClick={() => mutate()}>
          დადასტურება
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
