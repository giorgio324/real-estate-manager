import ArrowIcon from '../../assets/images/BackIcon.svg';
import { useRealEstatesData } from '../../hooks/useRealEstateData';
import Card from '../cards/Card';

type Props = {
  region: string;
  id: number;
};

const Slider = ({ region, id }: Props) => {
  const { data, isLoading, error } = useRealEstatesData();
  const fiteredRealEstates = data?.filter(
    (realEstate) =>
      realEstate.city.region.name === region && realEstate.id !== id
  );
  return (
    <div className='relative mt-[52px]'>
      <button className='absolute top-1/2 -left-[65px]'>
        <img src={ArrowIcon} alt='Slider Left Icon' />
      </button>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] self-stretch gap-4'>
        {fiteredRealEstates?.map((realEstate) => (
          <Card key={realEstate.id} realEstate={realEstate} />
        ))}
      </div>
      <button className='absolute top-1/2 right-[65px]'>
        <img src={ArrowIcon} alt='Slider Right Icon' className='rotate-180' />
      </button>
    </div>
  );
};

export default Slider;
