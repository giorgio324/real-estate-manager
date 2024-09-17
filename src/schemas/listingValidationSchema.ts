import * as Yup from 'yup';

export const listingValidationSchema = Yup.object().shape({
  image: Yup.string().required('სურათი სავალდებულოა'),
  address: Yup.string()
    .min(2, 'მინიმუმ ორი სიმბოლო')
    .required('მინიმუმ ორი სიმბოლო'),
  zip_code: Yup.string()
    .matches(/^\d+$/, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
});
