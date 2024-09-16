import { Form, Formik, FormikHelpers } from 'formik';
import ImageUpload from '../components/imageUpload/ImageUpload';
import { listingValidationSchema } from '../schemas/listingValidationSchema';

type FormValues = {
  image: null | string;
};
type FinalFormValues = {
  image: File;
};
const Create = () => {
  const initialValues: FormValues = {
    image: null || localStorage.getItem('image')!,
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
    if (data.image) {
      const newImageFile = createFileFromBase64(data.image, 'uploaded-img');
      if (newImageFile) {
        const transformedData: FinalFormValues = {
          ...data,
          image: newImageFile,
        };
        console.log(transformedData);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={listingValidationSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <ImageUpload
              name='image'
              defaultImage={values.image}
              label='ატვირთეთ ფოტო'
            />
            <pre>{JSON.stringify({ values, errors, touched }, null, 4)}</pre>
            <button type='submit'>send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
