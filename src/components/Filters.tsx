import { useFilter } from '../context/FilterContext';
import { useFetch } from '../hooks/useFetch';
import Button from './button/Button';
import Checkbox from './checkbox/Checkbox';
import Dropdown from './dropdown/Dropdown';
import { useEffect, useState } from 'react';
import NumberInput from './numberInput/NumberInput';

type Region = {
  id: number;
  name: string;
};

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
  const { data, error, isLoading } = useFetch<Region[]>('/regions');
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
  if (error) return <p>Error: {error}</p>;

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
      <div>
        <Button>
          <span>
            <img src='' alt='' />
          </span>
          ლისტინგის დამატება
        </Button>
        <Button>
          <span>
            <img src='' alt='' />
          </span>
          ლისტინგის დამატება
        </Button>
      </div>
    </section>
  );
};

export default Filters;
