import Cards from '../components/cards/Cards';
import Error from '../components/error/Error';
import Filters from '../components/Filters';
import Loading from '../components/loading/Loading';
import { useFilter } from '../context/FilterContext';
import { useRealEstatesData } from '../hooks/useRealEstateData';

const Home = () => {
  const { data, isLoading, error } = useRealEstatesData();
  const { filters } = useFilter();
  let filteredRealEstates = data;

  if (filters.region.some((region) => region.checked)) {
    filteredRealEstates = filteredRealEstates?.filter((property) => {
      return filters.region.some((region) => {
        return region.checked && region.id === property.city.region_id;
      });
    });
  }

  const minPrice = parseFloat(filters.price.min);
  const maxPrice = parseFloat(filters.price.max);
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filteredRealEstates = filteredRealEstates?.filter((property) => {
      return property.price >= minPrice && property.price <= maxPrice;
    });
  }

  const minArea = parseFloat(filters.area.min);
  const maxArea = parseFloat(filters.area.max);
  if (!isNaN(minArea) && !isNaN(maxArea)) {
    filteredRealEstates = filteredRealEstates?.filter((property) => {
      return property.area >= minArea && property.area <= maxArea;
    });
  }

  if (filters.bedroom) {
    filteredRealEstates = filteredRealEstates?.filter((property) => {
      return property.bedrooms.toString() === filters.bedroom;
    });
  }

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
      <Filters />
      <Cards realEstates={filteredRealEstates} />
    </div>
  );
};
export default Home;
