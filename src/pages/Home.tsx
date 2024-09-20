import Cards from '../components/cards/Cards';
import Error from '../components/error/Error';
import Filters from '../components/Filters';
import Loading from '../components/loading/Loading';
import { FilterProvider } from '../context/FilterContext';
import { useRealEstatesData } from '../hooks/useRealEstateData';

const Home = () => {
  const { data, isLoading, error } = useRealEstatesData();
  if (isLoading)
    return (
      <Loading className='mt-[77px]'>
        იტვირთება მონაცემები გთხოვთ დაელოდოთ...
      </Loading>
    );
  if (error)
    return (
      <Error className='mt-[77px]'>დაფიქსირდა შეცდობა {error.message}</Error>
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
