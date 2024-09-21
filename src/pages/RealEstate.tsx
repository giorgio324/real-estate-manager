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
import { useModal } from '../context/ModalContext';
import ConfirmationModal from '../components/modal/ConfirmDeleteModal';
import ImageTag from '../components/imageTag/ImageTag';
import IconItem from '../components/iconItem/IconItem';
import Slider from '../components/slider/Slider';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';

const RealEstate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsOpen } = useModal();
  if (!id) {
    navigate('/');
    return;
  }
  const { data, isLoading, error } = useSingleEstateData(id);

  const price =
    data?.price
      .toString()
      .split('')
      .reverse()
      .map((char, index) =>
        index !== 0 && index % 3 === 0 ? char + ' ' : char
      )
      .reverse()
      .join('') + ' \u20BE';
  const phone = data?.agent.phone
    ?.split('')
    .map((char, index) => (index !== 0 && index % 3 === 0 ? ' ' + char : char))
    .join('');

  if (isLoading)
    return (
      <Loading className='pt-[64px]'>
        იტვირთება მონაცემები გთხოვთ დაელოდოთ...
      </Loading>
    );
  if (error)
    return (
      <Error className='pt-[64px]'>დაფიქსირდა შეცდობა {error.message}</Error>
    );

  if (!data)
    return (
      <div className='pt-[64px] text-secondary text-xl font-medium'>
        ასეთი საკუთრება ვერ მოიძებნა
      </div>
    );

  const date = new Date(data.created_at);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100;
  return (
    <>
      <main className='pt-[64px] pb-[220px] flex flex-col'>
        <Link to='/' className='flex-shrink w-[32px] h-[32px]'>
          <img src={BackIcon} alt='Return to home Icon' />
        </Link>
        <section className='mt-[29px] flex gap-[68px]'>
          <div className='flex flex-col items-end'>
            <div className='relative w-[839px] h-[670px] rounded-tl-[14px] rounded-tr-[14px] overflow-hidden'>
              <img
                src={data.image}
                alt='Real Estate Image'
                className='w-[839px] h-[670px] object-cover'
              />
              <ImageTag
                is_rental={Boolean(data.is_rental)}
                className='text-xl p-[6px] w-[142px] rounded-[20px]'
              />
            </div>
            <p className='font-firago text-silver mt-[11px] mb-[14px]'>{`გამოქვეყნების თარიღი ${month}/${day}/${year}`}</p>
          </div>
          <div className='pt-[30px] pb-[42px]'>
            <h1 className='font-firago font-bold text-5xl'>{price}</h1>
            <div className='mt-6 flex flex-col gap-4 font-firago text-silver'>
              <IconItem iconSrc={LocationIcon} altText='Location Icon'>
                {data.city.region.name}, {data.address}
              </IconItem>
              <IconItem iconSrc={SizeIcon} altText='Area Icon'>
                ფართი {data.area} მ
                <sup className='text-[10px] align-super'>2</sup>
              </IconItem>
              <IconItem iconSrc={BedIcon} altText='Bedroom Icon'>
                საძინებელი {data.bedrooms}
              </IconItem>
              <IconItem iconSrc={PostIcon} altText='Post Icon'>
                საფოსტო ინდექსი {data.zip_code}
              </IconItem>
            </div>
            <div className='mt-[40px] font-firago text-silver max-w-[503px]'>
              <p>{data.description}</p>
            </div>
            <div className='mt-[50px] border border-border rounded-lg px-5 py-6 font-firago w-[503px]'>
              <div className='flex gap-[14px]'>
                <img
                  src={data.agent.avatar}
                  alt='agent avatar photo'
                  className='w-[72px] h-[72px] rounded-full object-cover'
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
                  <p>{phone}</p>
                </div>
              </div>
            </div>
            <div className='mt-5'>
              <Button
                className='bg-white text-silver border rounded-lg border-silver hover:bg-silver hover:text-white p-[10px] text-xs'
                onClick={() => setIsOpen(true)}
              >
                ლისტინგის წაშლა
              </Button>
            </div>
          </div>
        </section>
        <section className='mt-[52px] font-firago text-text'>
          <h2 className='text-3xl font-medium'>ბინები მსგავს ლოკაციაზე</h2>
          <Slider region={data.city.region.name} id={data.id} />
        </section>
      </main>
      <ConfirmationModal id={id} />
    </>
  );
};

export default RealEstate;
