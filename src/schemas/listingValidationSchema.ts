import * as Yup from 'yup';

export const listingValidationSchema = Yup.object().shape({
  image: Yup.string().required('სურათი სავალდებულოა'),
  address: Yup.string()
    .min(2, 'მინიმუმ ორი სიმბოლო')
    .required('მინიმუმ ორი სიმბოლო'),
  zip_code: Yup.string()
    .matches(/^\d+$/, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
  price: Yup.string()
    .matches(/^[1-9]\d*$/, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
  area: Yup.string()
    .matches(/^\d+(\.\d+)?$/, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
  bedrooms: Yup.string()
    .matches(/^\d+$/, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
  description: Yup.string()
    .required('მინიმუმ ხუთი სიტყვა')
    .test('lengthCheck', 'მინიმუმ ხუთი სიტყვა', (value) => {
      if (!value) {
        return false;
      }
      return value.trim().split(/\s+/).length >= 5;
    }),
  region: Yup.object()
    .nullable()
    .required('სავალდებულო')
    .shape({
      id: Yup.number().required('სავალდებულო'),
      name: Yup.string().required('სავალდებულო'),
    }),
  city: Yup.object()
    .nullable()
    .required('სავალდებულო')
    .shape({
      id: Yup.number().required('სავალდებულო'),
      name: Yup.string().required('სავალდებულო'),
    }),
});
