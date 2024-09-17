import { Form, Formik } from 'formik';
import ImageUpload from '../components/imageUpload/ImageUpload';
import { listingValidationSchema } from '../schemas/listingValidationSchema';
import Button from '../components/button/Button';
import RadioInput from '../components/radioInput/RadioInput';
import TextInput from '../components/textInput/TextInput';

type FormValues = {
  is_rental: string;
  image: null | string;
  address: string;
  zip_code: string;
  price: string;
  area: string;
  bedrooms: string;
};

/* FinalFormValues are values that get sent to server when validations pass */
type FinalFormValues = {
  image: File;
  is_rental: number;
  address: string;
  zip_code: number;
  price: number;
  area: number;
  bedrooms: number;
};

const Create = () => {
  const initialValues: FormValues = {
    image: localStorage.getItem('image'),
    is_rental: localStorage.getItem('is_rental') || '0',
    address: localStorage.getItem('address') || '',
    zip_code: localStorage.getItem('zip_code') || '',
    price: localStorage.getItem('price') || '',
    area: localStorage.getItem('area') || '',
    bedrooms: localStorage.getItem('bedrooms') || '',
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
    const rent = Number(data.is_rental);
    const price = Number(data.price);
    const area = Number(data.area);
    const bedrooms = Number(data.bedrooms);
    const zip_code = Number(data.zip_code);

    if (data.image) {
      const newImageFile = createFileFromBase64(data.image, 'uploaded-img');
      if (newImageFile) {
        const transformedData: FinalFormValues = {
          ...data,
          area,
          zip_code,
          bedrooms,
          price,
          is_rental: rent,
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
        {({ values }) => (
          <Form className='mt-[61px]'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-helvetica font-medium text-listingTitleText'>
                გარიგების ტიპი
              </h2>
              <div className='flex gap-8'>
                <RadioInput label='იყიდება' name='is_rental' value='0' />
                <RadioInput label='ქირავდება' name='is_rental' value='1' />
              </div>
            </div>
            <div className='mt-[80px]'>
              <h2 className='font-helvetica font-medium text-listingTitleText'>
                მდებარეობა
              </h2>
              <div className='flex gap-5 mt-[22px]'>
                <TextInput
                  label='მისამართი *'
                  name='address'
                  hintText='მინიმუმ ორი სიმბოლო'
                />
                <TextInput
                  label='საფოსტო ინდექსი *'
                  name='zip_code'
                  hintText='მხოლოდ რიცხვები'
                />
              </div>
            </div>
            <div className='mt-[80px]'>
              <h2 className='font-helvetica font-medium text-listingTitleText'>
                ბინის დეტალები
              </h2>
              <div className='flex gap-5 mt-[22px]'>
                <TextInput
                  label='ფასი'
                  name='price'
                  hintText='მხოლოდ რიცხვები'
                />
                <TextInput
                  label='ფართობი'
                  name='area'
                  hintText='მხოლოდ რიცხვები'
                />
              </div>
              <div className='mt-[20px]'>
                <TextInput
                  label='საძინებლების რაოდენობა*'
                  name='bedrooms'
                  hintText='მხოლოდ რიცხვები'
                />
              </div>
            </div>
            <ImageUpload
              name='image'
              defaultImage={values.image}
              label='ატვირთეთ ფოტო'
            />
            <Button type='submit'>დაამატე ლისტინგი</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
