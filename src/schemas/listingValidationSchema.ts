import * as Yup from 'yup';

export const listingValidationSchema = Yup.object().shape({
  image: Yup.string().required('სურათი სავალდებულოა'),
});
