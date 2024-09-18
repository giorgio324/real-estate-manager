import Cards from '../components/cards/Cards';
import Filters from '../components/Filters';
import { FilterProvider } from '../context/FilterContext';
import { useRealEstatesData } from '../hooks/useRealEstateData';

const Home = () => {
  const { data, isLoading, error } = useRealEstatesData();
  if (isLoading)
    return (
      <div className='mt-[77px]'>
        <p className='text-secondary text-xl font-medium'>Loading Data...</p>
      </div>
    );
  if (error)
    return (
      <div className='mt-[77px]'>
        <p className='text-secondary'>{error.message}</p>
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
