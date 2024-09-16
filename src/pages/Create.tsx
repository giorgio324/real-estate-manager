import { Form, Formik } from 'formik';
import ImageUpload from '../components/imageUpload/ImageUpload';
import { listingValidationSchema } from '../schemas/listingValidationSchema';
import Button from '../components/button/Button';
import RadioInput from '../components/radioInput/RadioInput';

type FormValues = {
  agreementType: 'rent' | 'sell';
  image: null | string;
};

/* FinalFormValues are values that get sent to server when validations pass */
type FinalFormValues = {
  image: File;
  is_rental: boolean;
};

const Create = () => {
  const initialValues: FormValues = {
    image: localStorage.getItem('image'),
    agreementType: 'sell',
  };

  const createFileFromBase64 = (
    base64String: string,
    newFileName: string
  ): File | undefined => {
    if (!base64String || !newFileName) return;
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const fileExtension = mime?.split('/')[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], `${newFileName}.${fileExtension}`, { type: mime });
  };

  const handleSubmit = (data: FormValues) => {
    const isRental = data.agreementType === 'rent';
    if (data.image) {
      const newImageFile = createFileFromBase64(data.image, 'uploaded-img');
      if (newImageFile) {
        const transformedData: FinalFormValues = {
          ...data,
          is_rental: isRental,
          image: newImageFile,
        };
        console.log(transformedData);
      }
    }
  };

  return (
    <div className='px-[404px] pt-16'>
      <h1 className='font-firago font-medium text-text text-3xl text-center'>
        ლისტინგის დამატება
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={listingValidationSchema}
      >
        {({ values, errors, touched }) => (
          <Form className='mt-[61px]'>
            <ImageUpload
              name='image'
              defaultImage={values.image}
              label='ატვირთეთ ფოტო'
            />
            <div className='flex flex-col gap-2'>
              <h2 className='font-helvetica font-medium text-listingTitleText'>
                გარიგების ტიპი
              </h2>
              <div className='flex gap-8'>
                <RadioInput label='იყიდება' name='agreementType' value='sell' />
                <RadioInput
                  label='ქირავდება'
                  name='agreementType'
                  value='rent'
                />
              </div>
            </div>
            <pre>{JSON.stringify({ values, errors, touched }, null, 4)}</pre>
            <Button type='submit'>დაამატე ლისტინგი</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
