import bedIcon from '../../assets/images/BedIcon.svg';
import sizeIcon from '../../assets/images/SizeIcon.svg';
import postIcon from '../../assets/images/PostIcon.svg';
import locationIcon from '../../assets/images/LocationIcon.svg';
import { RealEstate } from '../../types/realEstate';
import { Link } from 'react-router-dom';
import ImageTag from '../imageTag/ImageTag';
import IconItem from '../iconItem/IconItem';

type Props = {
  realEstate: RealEstate;
};

const Card = ({ realEstate }: Props) => {
  const price =
    realEstate.price
      .toString()
      .split('')
      .reverse()
      .map((char, index) => {
        return index !== 0 && index % 3 === 0 ? char + ' ' : char;
      })
      .reverse()
      .join('') + ' \u20BE';

  return (
    <Link className='group w-[380px]' to={`/estate/${realEstate.id}`}>
      <div className='relative w-full rounded-tl-[18px] rounded-tr-[18px] overflow-hidden'>
        <img
          src={realEstate.image}
          alt='Real estate image'
          className='w-full h-full object-cover aspect-[4/3]'
        />
        <ImageTag is_rental={realEstate.is_rental} />
      </div>
      <div className='group-hover:shadow-cardShadow w-full border py-[22px] px-[25px] rounded-bl-[18px] rounded-br-[18px] font-firago'>
        <h1 className=' font-bold text-text text-[28px]'>{price}</h1>
        <div className='mt-[6px] flex'>
          <IconItem
            iconSrc={locationIcon}
            altText='Location Icon'
            classname='text-base text-secondaryText'
            iconClassname='w-[20px] h-[20px]'
          >
            {`${realEstate.city.region.name}, ${realEstate.address}`}
          </IconItem>
        </div>
        <div className='font-firago text-secondaryText flex gap-4 mt-5'>
          <IconItem
            iconSrc={bedIcon}
            altText='bed icon'
            classname='text-base'
            iconClassname='w-[24px] h-[24px]'
          >
            {realEstate.bedrooms}
          </IconItem>
          <IconItem
            iconSrc={sizeIcon}
            altText='bed icon'
            classname='text-base'
            iconClassname='w-[24px] h-[24px]'
          >
            {realEstate.area} მ<sup className='text-[10px] align-super'>2</sup>
          </IconItem>
          <IconItem
            iconSrc={postIcon}
            altText='bed icon'
            classname='text-base'
            iconClassname='w-[24px] h-[24px]'
          >
            {realEstate.zip_code}
          </IconItem>
        </div>
      </div>
    </Link>
  );
};
export default Card;
