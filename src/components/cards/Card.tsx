import bedIcon from '../../assets/images/BedIcon.svg';
import sizeIcon from '../../assets/images/SizeIcon.svg';
import postIcon from '../../assets/images/PostIcon.svg';
import locationIcon from '../../assets/images/LocationIcon.svg';
import { RealEstate } from '../../types/realEstate';
import { Link } from 'react-router-dom';

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
    <Link
      to={`/estate/${realEstate.id}`}
      key={realEstate.id}
      className='w-[384px] hover:shadow-cardShadow transition-all duration-300 rounded-[14px]'
    >
      <div className='relative rounded-tl-[14px] rounded-tr-[14px]'>
        <img
          src={realEstate.image}
          alt={`Estate in ${realEstate.city.name}`}
          className='w-[384px] h-[307px] rounded-tl-[14px] rounded-tr-[14px]'
        />
        <span className='absolute top-[23px] left-[23px] w-[90px] text-center font-firago font-medium text-xs text-white bg-secondary px-[10px] py-[6px] rounded-[15px]'>
          {realEstate.is_rental ? 'ქირავდება' : 'იყიდება'}
        </span>
      </div>
      <div className='font-firago py-[22px] px-[25px] border-l border-l-border border-r border-r-border border-b border-b-border rounded-bl-[14px] rounded-br-[14px]'>
        <p className='leading-8 text-[28px] font-bold'>{price}</p>
        <div className='flex text-secondaryText text-base font-firago items-center mt-[6px]'>
          <img
            src={locationIcon}
            alt='Location Icon'
            className='mr-1 w-[14px] h-[17px]'
          />
          <p>{`${realEstate.city.name}, ${realEstate.address}`}</p>
        </div>
        <div className='flex gap-8 mt-5'>
          <p className='flex gap-[5px] text-base justify-center items-center text-secondaryText'>
            <span>
              <img
                src={bedIcon}
                alt='Room amount Icon'
                className='w-[18px]  h-[18px]'
              />
            </span>
            {realEstate.bedrooms}
          </p>
          <p className='flex gap-[5px] text-base justify-center items-center text-secondaryText'>
            <span>
              <img
                src={sizeIcon}
                alt='Area amount Icon'
                className='w-[18px]  h-[18px]'
              />
            </span>
            {realEstate.area}
          </p>
          <p className='flex gap-[5px] text-base justify-center items-center text-secondaryText'>
            <span>
              <img
                src={postIcon}
                alt='Postal Code Icon'
                className='w-[18px]  h-[18px]'
              />
            </span>
            {realEstate.zip_code}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
