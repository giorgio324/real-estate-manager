import { Link, useNavigate, useParams } from 'react-router-dom';
import BackIcon from '../assets/images/BackIcon.svg';
import { useSingleEstateData } from '../hooks/useSingleEstateData';
import LocationIcon from '../assets/images/LocationIcon.svg';
import SizeIcon from '../assets/images/SizeIcon.svg';
import BedIcon from '../assets/images/BedIcon.svg';
import PostIcon from '../assets/images/PostIcon.svg';
import EmailIcon from '../assets/images/EmailIcon.svg';
import PhoneIcon from '../assets/images/PhoneIcon.svg';
import Button from '../components/button/Button';
import { useMemo } from 'react';
const RealEstate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate('/');
    return;
  }
  const { data, isLoading, error } = useSingleEstateData(id);

  const price = useMemo(() => {
    return (
      data?.price
        .toString()
        .split('')
        .reverse()
        .map((char, index) =>
          index !== 0 && index % 3 === 0 ? char + ' ' : char
        )
        .reverse()
        .join('') + ' \u20BE'
    );
  }, [data?.price]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading real estate details</div>;

  if (!data) return <div>No real estate found</div>;

  const date = new Date(data.created_at);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100;

  return (
    <main className='mt-[64px] flex flex-col'>
      <Link to='/' className='flex-shrink w-[32px] h-[32px]'>
        <img src={BackIcon} alt='Return to home Icon' />
      </Link>
      <section className='mt-[29px] flex gap-[68px] items-center'>
        <div className='flex flex-col items-end'>
          <div className='w-[839px] h-[670px]'>
            <img src={data.image} alt='Real Estate Image' className='w-full' />
          </div>
          <p className='font-firago text-silver mt-[11px] mb-[14px]'>{`გამოქვეყნების თარიღი ${month}/${day}/${year}`}</p>
        </div>
        <div className='pt-[30px] pb-[42px]'>
          <h1 className='font-firago font-bold text-5xl'>{price}</h1>
          <div className='mt-6 flex flex-col gap-4 font-firago text-silver'>
            <div className='flex items-center gap-1'>
              <img
                src={LocationIcon}
                alt='Location Icon'
                className='w-[22px] h-[22px]'
              />
              <p className='text-2xl'>
                {data.city.name}, {data.address}
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <img
                src={SizeIcon}
                alt='Area Icon'
                className='w-[22px] h-[22px]'
              />
              <p className='text-2xl'>
                ფართი {data.area} მ
                <sup className='text-[10px] align-super'>2</sup>
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <img
                src={BedIcon}
                alt='Bedroom Icon'
                className='w-[22px] h-[22px]'
              />
              <p className='text-2xl'>საძინებელი {data.bedrooms}</p>
            </div>
            <div className='flex items-center gap-1'>
              <img
                src={PostIcon}
                alt='Post Icon'
                className='w-[22px] h-[22px]'
              />
              <p className='text-2xl'>საფოსტო ინდექსი {data.zip_code}</p>
            </div>
          </div>
          <div className='mt-[40px] font-firago text-silver max-w-[503px]'>
            <p>{data.description}</p>
          </div>
          <div className='mt-[50px] border border-border rounded-lg px-5 py-6 font-firago w-[503px]'>
            <div className='flex gap-[14px]'>
              <img
                src={data.agent.avatar}
                alt='agent avatar photo'
                className='w-[72px] h-[72px] rounded-full'
              />
              <div>
                <h3 className='text-base text-text'>
                  {data.agent.name} {data.agent.surname}
                </h3>
                <p className='text-sm text-delete mt-1'>აგენტი</p>
              </div>
            </div>
            <div className='mt-4 font-firago text-silver text-sm'>
              <div className='flex gap-[5px]'>
                <img src={EmailIcon} alt='Email Icon' />
                <p>{data.agent.email}</p>
              </div>
              <div className='flex gap-[5px]'>
                <img src={PhoneIcon} alt='Phone Icon' />
                <p>{data.agent.phone}</p>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <Button className='bg-white text-silver border rounded-lg border-silver hover:bg-silver hover:text-white p-[10px] text-xs'>
              ლისტინგის წაშლა
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RealEstate;
