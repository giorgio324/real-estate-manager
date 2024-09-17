import * as Yup from 'yup';

export const agentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'მინიმუმ ორი სიმბოლო')
    .required('მინიმუმ ორი სიმბოლო'),
  surname: Yup.string()
    .min(2, 'მინიმუმ ორი სიმბოლო')
    .required('მინიმუმ ორი სიმბოლო'),
  email: Yup.string()
    .email('გამოიყენეთ @redberry.ge ფოსტა')
    .matches(
      /^[a-zA-Z0-9._%+-]+@redberry\.ge$/,
      'გამოიყენეთ @redberry.ge ფოსტა'
    )
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^5\d{8}$/, 'მხოლოდ რიცხვები')
    .length(9, 'მხოლოდ რიცხვები')
    .required('მხოლოდ რიცხვები'),
  avatar: Yup.string().required('სურათი სავალდებულოა'),
});
