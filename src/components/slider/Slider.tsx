import { useEffect } from 'react';
import { useRealEstatesData } from '../../hooks/useRealEstateData';
import Card from '../cards/Card';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import SlickSlider from 'react-slick';
import NextSlideButton from '../button/NextSlideButton';
import PrevSlideButton from '../button/PrevSlideButton';
type Props = {
  region: string;
  id: number;
};

const Slider = ({ region, id }: Props) => {
  const { data, isLoading, error } = useRealEstatesData();

  const filteredRealEstates = data?.filter(
    (realEstate) =>
      realEstate.city.region.name === region && realEstate.id !== id
  );

  const disableButtons =
    !filteredRealEstates?.length || filteredRealEstates.length < 4;

  const singleItem = filteredRealEstates && filteredRealEstates.length === 1;

  /* ერთ ნივთზე ბიბლიოთეკას აქვს ბაგი რის გამოც მიწევს ამ ეფექტით გვერდის შემოვლა */
  useEffect(() => {
    const track = document.querySelector('.slick-track');
    if (track && singleItem) {
      track.classList.add('workaround');
    }
  }, [data]);

  const settings = {
    dots: false,
    infinite: !singleItem,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextSlideButton disabled={disableButtons} />,
    prevArrow: <PrevSlideButton disabled={disableButtons} />,
    centerMode: false,
    swipe: false,
  };

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

  return (
    <div className='pt-[52px] relative'>
      <SlickSlider {...settings}>
        {filteredRealEstates.map((estate) => (
          <Card key={estate.id} realEstate={estate} />
        ))}
      </SlickSlider>
    </div>
  );
};

export default Slider;
