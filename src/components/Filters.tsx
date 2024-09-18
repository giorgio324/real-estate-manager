import { useFilter } from '../context/FilterContext';
import Button from './button/Button';
import Checkbox from './checkbox/Checkbox';
import Dropdown from './dropdown/Dropdown';
import { useEffect, useState } from 'react';
import NumberInput from './numberInput/NumberInput';
import { useModal } from '../context/ModalContext';
import RegisterAgentModal from './modal/RegisterAgentModal';
import { useRegionsData } from '../hooks/useRegionsData';

type FilterValues = {
  region: {
    id: number;
    name: string;
    checked: boolean;
  }[];
  price: {
    min: number | string;
    max: number | string;
  };
};

type Props = {};

const Filters = ({}: Props) => {
  const { setIsOpen } = useModal();
  const { data, error, isLoading } = useRegionsData();
  const [localFilters, setLocalFilters] = useState<FilterValues>({
    price: { min: '', max: '' },
    region: [],
  });
  const [filterErrors, setFilterErrors] = useState({
    price: false,
    size: false,
  });
  const { filters, setFilters } = useFilter();

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters) as FilterValues;
      setLocalFilters(parsedFilters);
      setFilters(parsedFilters);
    }
  }, [setFilters]);

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (data && !savedFilters) {
      const regionData = data.map((region) => ({
        id: region.id,
        name: region.name,
        checked: false,
      }));
      setLocalFilters((prevState) => ({
        ...prevState,
        region: regionData,
      }));
    }
  }, [data, setLocalFilters]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleConfirmButtonClick = () => {
    setFilters(localFilters);
    localStorage.setItem('filters', JSON.stringify(localFilters));
    console.log(filters);
  };

  const handlePriceConfirmClick = () => {
    console.log('i run');
    priceValidation(localFilters.price.min, localFilters.price.max);
    if (filterErrors.price) return;
    setFilters(localFilters);
    localStorage.setItem('filters', JSON.stringify(localFilters));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setLocalFilters((prevState) => ({
      ...prevState,
      region: prevState.region.map((region) =>
        region.name === name ? { ...region, checked } : region
      ),
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    priceValidation(localFilters.price.min, localFilters.price.max);
    setLocalFilters((prevState) => ({
      ...prevState,
      price: {
        ...prevState.price,
        [name]: value,
      },
    }));
  };

  const priceValidation = (min: number | string, max: number | string) => {
    console.log('i also run');
    console.log(min === '', max);
    /* when the input is empty it goes to empty string but i won't let user set it */
    if (min === '' || max === '' || min > max) {
      setFilterErrors((prevState) => ({
        ...prevState,
        price: true,
      }));
      console.log('set');
    } else {
      setFilterErrors((prevState) => ({
        ...prevState,
        price: false,
      }));
      console.log('not set');
    }
  };

  return (
    <>
      <section className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='flex shrink'>
            <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
              <Dropdown
                buttonTitle='რეგიონი'
                headerTitle='რეგიონის მიხედვით'
                onConfirmButtonClick={handleConfirmButtonClick}
              >
                <div className='flex w-[680px] flex-wrap gap-y-4 gap-x-[50px]'>
                  {localFilters.region.map((region) => (
                    <Checkbox
                      key={region.id}
                      name={region.name}
                      checked={region.checked}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </div>
              </Dropdown>
              <Dropdown
                buttonTitle='საფასო კატეგორია'
                headerTitle='ფასის მიხედვით'
                onConfirmButtonClick={handlePriceConfirmClick}
                error={filterErrors.price}
              >
                <div>
                  <div className='flex w-[334px] gap-x-4'>
                    <NumberInput
                      placeholder='დან'
                      name='min'
                      value={localFilters.price.min as number}
                      onChange={handlePriceChange}
                    />
                    <NumberInput
                      placeholder='დან'
                      name='max'
                      value={localFilters.price.max as number}
                      onChange={handlePriceChange}
                    />
                  </div>

                  {filterErrors.price && (
                    <p className='mt-2 font-firago text-sm text-error'>
                      ჩაწერეთ ვალიდური მონაცემები
                    </p>
                  )}
                </div>
              </Dropdown>
            </div>
          </div>
          {/* this is where i display token of result and where user can reset the fields */}
          <div>
            {/* this needs to be filter not map i only need to display what is checked */}
            {filters.region
              .filter((region) => region.checked)
              .map((checkedRegion) => {
                return <p key={checkedRegion.id}>{checkedRegion.name}</p>;
              })}
          </div>
        </div>
        <div className='flex items-center gap-4 '>
          {/* svg-ის პირდაპირ შემოგდება მიწებს რადგან currentcolor არ აქვს შემოიმპორტირებისას... */}
          <Button className='flex gap-[2px] items-center justify-center border border-primary text-white hover:text-white bg-primary hover:bg-primaryHover'>
            <span>
              <svg
                width='22'
                height='23'
                viewBox='0 0 22 23'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.5 12.4144H11.9166V16.9977C11.9166 17.2408 11.8201 17.474 11.6482 17.6459C11.4763 17.8178 11.2431 17.9144 11 17.9144C10.7569 17.9144 10.5237 17.8178 10.3518 17.6459C10.1799 17.474 10.0833 17.2408 10.0833 16.9977V12.4144H5.49998C5.25686 12.4144 5.02371 12.3178 4.8518 12.1459C4.67989 11.974 4.58331 11.7408 4.58331 11.4977C4.58331 11.2546 4.67989 11.0214 4.8518 10.8495C5.02371 10.6776 5.25686 10.5811 5.49998 10.5811H10.0833V5.99772C10.0833 5.75461 10.1799 5.52145 10.3518 5.34954C10.5237 5.17763 10.7569 5.08105 11 5.08105C11.2431 5.08105 11.4763 5.17763 11.6482 5.34954C11.8201 5.52145 11.9166 5.75461 11.9166 5.99772V10.5811H16.5C16.7431 10.5811 16.9763 10.6776 17.1482 10.8495C17.3201 11.0214 17.4166 11.2546 17.4166 11.4977C17.4166 11.7408 17.3201 11.974 17.1482 12.1459C16.9763 12.3178 16.7431 12.4144 16.5 12.4144Z'
                  fill='currentColor'
                />
              </svg>
            </span>
            ლისტინგის დამატება
          </Button>
          <Button
            className='flex gap-[2px] items-center justify-center border border-primary text-primary hover:text-white bg-white hover:bg-primary'
            onClick={() => setIsOpen(true)}
          >
            <span>
              <svg
                width='22'
                height='23'
                viewBox='0 0 22 23'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.5 12.4144H11.9166V16.9977C11.9166 17.2408 11.8201 17.474 11.6482 17.6459C11.4763 17.8178 11.2431 17.9144 11 17.9144C10.7569 17.9144 10.5237 17.8178 10.3518 17.6459C10.1799 17.474 10.0833 17.2408 10.0833 16.9977V12.4144H5.49998C5.25686 12.4144 5.02371 12.3178 4.8518 12.1459C4.67989 11.974 4.58331 11.7408 4.58331 11.4977C4.58331 11.2546 4.67989 11.0214 4.8518 10.8495C5.02371 10.6776 5.25686 10.5811 5.49998 10.5811H10.0833V5.99772C10.0833 5.75461 10.1799 5.52145 10.3518 5.34954C10.5237 5.17763 10.7569 5.08105 11 5.08105C11.2431 5.08105 11.4763 5.17763 11.6482 5.34954C11.8201 5.52145 11.9166 5.75461 11.9166 5.99772V10.5811H16.5C16.7431 10.5811 16.9763 10.6776 17.1482 10.8495C17.3201 11.0214 17.4166 11.2546 17.4166 11.4977C17.4166 11.7408 17.3201 11.974 17.1482 12.1459C16.9763 12.3178 16.7431 12.4144 16.5 12.4144Z'
                  fill='currentColor'
                />
              </svg>
            </span>
            აგენტის დამატება
          </Button>
        </div>
      </section>
      <RegisterAgentModal />
    </>
  );
};

export default Filters;
