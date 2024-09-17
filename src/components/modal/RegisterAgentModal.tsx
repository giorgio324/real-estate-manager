import { Form, Formik } from 'formik';
import Modal from './Modal';
import { agentValidationSchema } from '../../schemas/agentValidationSchema';
import { Agent, FinalAgent } from '../../types/agent';
import { base64ToFile } from '../../utils/base64ToFile';
import TextInput from '../textInput/TextInput';
import ImageUpload from '../imageUpload/ImageUpload';
import Button from '../button/Button';
import { useModal } from '../../context/ModalContext';

const RegisterAgentModal = () => {
  const { setIsOpen } = useModal();

  const initialValues: Agent = {
    avatar: localStorage.getItem('avatar'),
    email: localStorage.getItem('email') || '',
    name: localStorage.getItem('name') || '',
    surname: localStorage.getItem('surname') || '',
    phone: localStorage.getItem('phone') || '',
  };

  const handleSubmit = (data: Agent) => {
    const phone = Number(data.phone);
    if (data.avatar) {
      const newImageFile = base64ToFile(data.avatar, 'uploaded-img');
      if (newImageFile) {
        const transformedData: FinalAgent = {
          ...data,
          phone: phone,
          avatar: newImageFile,
        };
        console.log(transformedData);
      }
    }
  };

  return (
    <Modal>
      <h1 className='font-firago font-medium text-3xl text-center text-text'>
        აგენტის დამატება
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={agentValidationSchema}
      >
        {({ values }) => (
          <Form className='mt-[61px] text-text'>
            <div className='flex gap-8'>
              <TextInput
                label='სახელი *'
                name='name'
                hintText='მინიმუმ ორი სიმბოლო'
              />
              <TextInput
                label='გვარი'
                name='surname'
                hintText='მინიმუმ ორი სიმბოლო'
              />
            </div>
            <div className='flex gap-8 mt-7'>
              <TextInput
                label='ელ-ფოსტა*'
                name='email'
                hintText='გამოიყენეთ @redberry.ge ფოსტა'
              />
              <TextInput
                label='ტელეფონის ნომერი'
                name='phone'
                hintText='მხოლოდ რიცხვები'
              />
            </div>
            <div className='mt-7'>
              <ImageUpload
                defaultImage={values.avatar}
                label='ატვირთეთ ფოტო *'
                name='avatar'
              />
            </div>
            <div className='mt-[90px] flex justify-end gap-[15px]'>
              <Button
                type='button'
                className='border border-primary text-primary bg-white hover:bg-primary hover:text-white'
                onClick={() => setIsOpen(false)}
              >
                გაუქმება
              </Button>
              <Button
                type='submit'
                className='border border-primary hover:bg-primaryHover'
              >
                დაამატე აგენტი
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegisterAgentModal;
