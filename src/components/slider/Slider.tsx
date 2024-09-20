import { useState } from 'react';
import ArrowIcon from '../../assets/images/BackIcon.svg';
import { useRealEstatesData } from '../../hooks/useRealEstateData';
import Card from '../cards/Card';
import Loading from '../loading/Loading';
import Error from '../error/Error';

type Props = {
  region: string;
  id: number;
};

const ITEMS_TO_SHOW = 4;

const Slider = ({ region, id }: Props) => {
  const { data, isLoading, error } = useRealEstatesData();

  const filteredRealEstates = data?.filter(
    (realEstate) =>
      realEstate.city.region.name === region && realEstate.id !== id
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading)
    return (
      <Loading className='pt-[52px]'>
        იტვირთება მონაცემები გთხოვთ დაელოდოთ...
      </Loading>
    );
  if (error)
    return (
      <Error className='pt-[52px]'>დაფიქსირდა შეცდობა {error.message}</Error>
    );

  if (!filteredRealEstates?.length)
    return (
      <div className='pt-[52px] text-secondary text-xl font-medium'>
        ბინა მსგავს ლოკაციაზე ვერ მოიძებნა
      </div>
    );

  const nextSlide = () => {
    if (filteredRealEstates.length <= 4) {
      return;
    }
    if (currentIndex + ITEMS_TO_SHOW < filteredRealEstates.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (filteredRealEstates.length <= 4) {
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className='pt-[52px] relative'>
      <button className='absolute top-1/2 -left-[60px]' onClick={prevSlide}>
        <img
          src={ArrowIcon}
          alt={'slider back button'}
          className='w-[30px] h-[30px]'
        />
      </button>
      <div className='flex gap-5'>
        {filteredRealEstates
          .slice(currentIndex, currentIndex + ITEMS_TO_SHOW)
          .map((estate) => (
            <Card key={estate.id} realEstate={estate} />
          ))}
      </div>
      <button
        className='absolute top-1/2 -right-[40px] rotate-180'
        onClick={nextSlide}
      >
        <img
          src={ArrowIcon}
          alt={'slider forward button'}
          className='w-[30px] h-[30px]'
        />
      </button>
    </div>
  );
};

export default Slider;
