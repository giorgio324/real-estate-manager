import { useFormikContext } from 'formik';
import { City } from '../../types/city';
import { Region } from '../../types/region';
import LinkedSelect from './LinkedSelect';
type Props = {
  cities?: City[];
  regions?: Region[];
  error?: string;
  isLoading: boolean;
};
const GroupedSelect = ({ cities, regions, isLoading, error }: Props) => {
  const { setFieldValue } = useFormikContext();
  const handleRegionChange = (item: { id: number; name: string }) => {
    setFieldValue('region', item);
    setFieldValue('city', null, false);
    localStorage.setItem('region', JSON.stringify(item));
  };

  const handleCityChange = (item: { id: number; name: string }) => {
    setFieldValue('city', item);
    localStorage.setItem('city', JSON.stringify(item));
  };
  return (
    <div className='flex items-center gap-5'>
      <LinkedSelect
        isLoading={isLoading}
        error={error}
        label='რეგიონი'
        options={regions}
        placeholder='აირჩიე რეგიონი'
        name='region'
        onChange={handleRegionChange}
      />
      <LinkedSelect
        isLoading={isLoading}
        error={error}
        label='ქალაქი'
        options={cities}
        placeholder='აირჩიე ქალაქი'
        name='city'
        onChange={handleCityChange}
      />
    </div>
  );
};

export default GroupedSelect;
