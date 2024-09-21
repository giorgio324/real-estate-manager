import { useFilter } from '../context/FilterContext';
import Checkbox from './checkbox/Checkbox';
import { useEffect, useState } from 'react';
import NumberInput from './numberInput/NumberInput';
import RegisterAgentModal from './modal/RegisterAgentModal';
import { useRegionsData } from '../hooks/useRegionsData';
import Dropdown from './dropdown/Dropdown';
import ActionButtons from './button/ActionButtons';
import Loading from './loading/Loading';
import Error from './error/Error';

type FilterValues = {
  region: {
    id: number;
    name: string;
    checked: boolean;
  }[];
  price: {
    min: string;
    max: string;
  };
  area: {
    min: string;
    max: string;
  };
  bedroom: string;
};

type FilterErrors = {
  price: boolean;
  area: boolean;
  bedroom: boolean;
};

const Filters = () => {
  const { data, error, isLoading } = useRegionsData();
  const { filters, setFilters } = useFilter();

  const [localFilters, setLocalFilters] = useState<FilterValues>({
    price: { min: '', max: '' },
    region: [],
    area: { min: '', max: '' },
    bedroom: '',
  });

  const [localErrors, setLocalErros] = useState<FilterErrors>({
    area: false,
    bedroom: false,
    price: false,
  });

  console.log(localFilters.price);
  console.log(localErrors);

  /* this useffect initilizes local filter regions to look like a object {id,name,checked} */
  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      const filterData = JSON.parse(savedFilters) as FilterValues;
      setLocalFilters(filterData);
    } else if (data) {
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

  if (isLoading)
    return <Loading>იტვირთება მონაცემები გთხოვთ დაელოდოთ...</Loading>;
  if (error) return <Error>დაფიქსირდა შეცდომა {error.message}</Error>;

  const handleRegionSubmit = () => {
    setFilters(localFilters);
    localStorage.setItem('filters', JSON.stringify(localFilters));
  };

  const handlePriceConfirmClick = () => {
    if (!localFilters.price.min || !localFilters.price.max) {
      setLocalErros((prevState) => ({
        ...prevState,
        price: true,
      }));
      return;
    }

    if (Number(localFilters.price.min) > Number(localFilters.price.max)) {
      setLocalErros((prevState) => ({
        ...prevState,
        price: true,
      }));
      return;
    }
    if (localErrors.price) return;
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

    setLocalFilters((prevState) => {
      const updatedPrice = {
        ...prevState.price,
        [name]: value,
      };

      const minPrice = Number(updatedPrice.min);
      const maxPrice = Number(updatedPrice.max);

      const hasError = minPrice >= maxPrice;

      setLocalErros((prevErrors) => ({
        ...prevErrors,
        price: hasError,
      }));

      return {
        ...prevState,
        price: updatedPrice,
      };
    });
  };

  const handleRegionDelete = (checkedRegion: {
    id: number;
    name: string;
    checked: boolean;
  }) => {
    const updatedRegions = localFilters.region.map((region) => {
      if (region.id === checkedRegion.id) {
        return { ...region, checked: false };
      }
      return region;
    });

    setLocalFilters({ ...localFilters, region: updatedRegions });
    setFilters((prevStete) => ({ ...prevStete, region: updatedRegions }));
  };

  return (
    <>
      <section className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='flex shrink'>
            <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
              <Dropdown
                dropdownTitle='რეგიონის მიხედვით'
                buttonText='რეგიონი'
                onSubmit={handleRegionSubmit}
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
                dropdownTitle='ფასის მიხედვით'
                buttonText='საფასო კატეგორია'
                onSubmit={handlePriceConfirmClick}
                error={localErrors.price}
              >
                <div className='flex w-[334px] gap-x-4'>
                  <NumberInput
                    placeholder='დან'
                    name='min'
                    value={localFilters.price.min}
                    onChange={handlePriceChange}
                  />
                  <NumberInput
                    placeholder='დან'
                    name='max'
                    value={localFilters.price.max}
                    onChange={handlePriceChange}
                  />
                </div>
                {localErrors.price && (
                  <p className='mt-2 font-firago text-sm text-error'>
                    ჩაწერეთ ვალიდური მონაცემები
                  </p>
                )}
              </Dropdown>
            </div>
          </div>
          {/* this is where i display token of result and where user can reset the fields */}
          <div>
            {/* this needs to be filter not map i only need to display what is checked */}
            {filters.region
              .filter((region) => region.checked)
              .map((checkedRegion) => {
                return (
                  <button
                    className='border rounded-full flex p-1'
                    onClick={() => handleRegionDelete(checkedRegion)}
                  >
                    <p key={checkedRegion.id}>{checkedRegion.name}</p>X
                  </button>
                );
              })}
            <p>{filters.price.min}</p>
            <p>{filters.price.max}</p>
          </div>
        </div>
        <ActionButtons />
      </section>
      <RegisterAgentModal />
    </>
  );
};

export default Filters;
