import { Form, Formik } from 'formik';
import ImageUpload from '../components/imageUpload/ImageUpload';
import { listingValidationSchema } from '../schemas/listingValidationSchema';
import Button from '../components/button/Button';
import RadioInput from '../components/radioInput/RadioInput';
import TextInput from '../components/textInput/TextInput';
import TextAreaInput from '../components/textAreaInput/TextAreaInput';
import { base64ToFile } from '../utils/base64ToFile';
import { useCitiesData } from '../hooks/useCitiesData';
import { useRegionsData } from '../hooks/useRegionsData';
import GroupedSelect from '../components/select/GroupedSelect';
import { useAgentsData } from '../hooks/useAgentData';
import {
  CreateListingFormFinalValues,
  CreateListingFormValues,
} from '../types/formValues';
import SelectAgent from '../components/select/SelectAgent';
import { useCreateRealEstate } from '../hooks/useCreateRealEstate';
import { useNavigate } from 'react-router-dom';
import RegisterAgentModal from '../components/modal/RegisterAgentModal';

const Create = () => {
  const navigate = useNavigate();

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesLoading,
  } = useCitiesData();

  const {
    data: regions,
    error: regionsError,
    isLoading: regionsLoading,
  } = useRegionsData();

  const {
    data: agents,
    error: agentsError,
    isLoading: agentsLoading,
  } = useAgentsData();

  const { mutate } = useCreateRealEstate();

  const initialValues: CreateListingFormValues = {
    image: localStorage.getItem('image'),
    is_rental: localStorage.getItem('is_rental') || '0',
    address: localStorage.getItem('address') || '',
    zip_code: localStorage.getItem('zip_code') || '',
    price: localStorage.getItem('price') || '',
    area: localStorage.getItem('area') || '',
    bedrooms: localStorage.getItem('bedrooms') || '',
    description: localStorage.getItem('description') || '',
    region: JSON.parse(localStorage.getItem('region') || 'null'),
    city: JSON.parse(localStorage.getItem('city') || 'null'),
    agent: JSON.parse(localStorage.getItem('agent') || 'null'),
  };

  const handleSubmit = (data: CreateListingFormValues) => {
    const region_id = data.region?.id.toString();
    const city_id = data.city?.id.toString();
    const agent_id = data.agent?.id.toString();
    if (data.image) {
      const newImageFile = base64ToFile(data.image, 'uploaded-img');
      if (newImageFile) {
        if (city_id && region_id && agent_id) {
          const transformedData: CreateListingFormFinalValues = {
            address: data.address,
            area: data.area,
            bedrooms: data.bedrooms,
            description: data.description,
            is_rental: data.is_rental,
            price: data.price,
            zip_code: data.zip_code,
            city_id,
            region_id,
            agent_id,
            image: newImageFile,
          };
          mutate(transformedData);
        }
      }
    }
  };

  const handleCancelButtonClick = () => {
    localStorage.removeItem('address');
    localStorage.removeItem('agent');
    localStorage.removeItem('area');
    localStorage.removeItem('bedrooms');
    localStorage.removeItem('description');
    localStorage.removeItem('image');
    localStorage.removeItem('is_rental');
    localStorage.removeItem('price');
    localStorage.removeItem('zip_code');
    localStorage.removeItem('city');
    localStorage.removeItem('region');
    navigate('/');
  };

  return (
    <div className='px-[404px] pt-16 pb-[87px]'>
      <h1 className='font-firago font-medium text-text text-3xl text-center'>
        ლისტინგის დამატება
      </h1>
      <Formik
        validateOnChange
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={listingValidationSchema}
      >
        {({ values }) => {
          const filteredCities = cities?.filter(
            (city) => city.region_id === values.region?.id
          );
          return (
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
                <GroupedSelect
                  isLoading={regionsLoading || citiesLoading}
                  error={regionsError?.message || citiesError?.message}
                  cities={filteredCities}
                  regions={regions}
                />
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
              <div className='mt-5'>
                <TextAreaInput
                  label='აღწერა *'
                  name='description'
                  hintText='მინიმუმ ხუთი სიტყვა'
                />
              </div>
              <div className='mt-5'>
                <ImageUpload
                  name='image'
                  defaultImage={values.image}
                  label='ატვირთეთ ფოტო'
                />
              </div>
              <SelectAgent
                agents={agents}
                isLoading={agentsLoading}
                error={agentsError?.message}
              />
              <div className='mt-[90px] flex justify-end gap-[15px]'>
                <Button
                  onClick={handleCancelButtonClick}
                  type='button'
                  className='border border-primary text-primary bg-white hover:bg-primary hover:text-white'
                >
                  გაუქმება
                </Button>
                <Button
                  type='submit'
                  className='border border-primary hover:bg-primaryHover'
                >
                  დაამატე ლისტინგი
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <RegisterAgentModal />
    </div>
  );
};

export default Create;
