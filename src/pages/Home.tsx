import Cards from '../components/cards/Cards';
import Filters from '../components/Filters';
import { useFetch } from '../hooks/useFetch';
import { FilterProvider } from '../context/FilterContext';

type City = {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
};

type RealEstate = {
  id: number;
  address: string;
  area: number;
  bedrooms: number;
  city: City;
  city_id: number;
  image: string;
  is_rental: boolean;
  price: number;
  zip_code: string;
};

const Home = () => {
  const { data, error, isLoading } = useFetch<RealEstate[]>('/real-estates');
  if (isLoading)
    return (
      <div className='mt-[77px]'>
        <p className='text-secondary'>Loading Data...</p>
      </div>
    );
  if (error)
    return (
      <div className='mt-[77px]'>
        <p className='text-secondary'>{error}</p>
      </div>
    );
  return (
    <div className='mt-[77px]'>
      <FilterProvider>
        <Filters />
        <Cards realEstates={data} />
      </FilterProvider>
    </div>
  );
};
export default Home;
