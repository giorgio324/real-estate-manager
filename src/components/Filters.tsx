import { useFilter } from '../context/FilterContext';
import { useEffect, useState } from 'react';
import NumberInput from './numberInput/NumberInput';
import RegisterAgentModal from './modal/RegisterAgentModal';
import { useRegionsData } from '../hooks/useRegionsData';
import Dropdown from './dropdown/Dropdown';
import ActionButtons from './button/ActionButtons';
import Loading from './loading/Loading';
import Error from './error/Error';
import PremadeButtons from './button/PremadeButtons';
import { FilterErrors, FilterValues } from '../types/filter';
import DropdownCheckboxes from './dropdown/DropdownCheckboxes';
import closeIcon from '../assets/images/CloseIcon2.svg';
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

  const handleRangeSubmit = (type: 'price' | 'area') => {
    if (!localFilters[type].min || !localFilters[type].max) {
      setLocalErros((prevState: FilterErrors) => ({
        ...prevState,
        [type]: true,
      }));
      return;
    }

    if (Number(localFilters[type].min) > Number(localFilters[type].max)) {
      setLocalErros((prevState: FilterErrors) => ({
        ...prevState,
        [type]: true,
      }));
      return;
    }

    if (localErrors[type]) return;

    setFilters(localFilters);
    localStorage.setItem('filters', JSON.stringify(localFilters));
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'price' | 'area'
  ) => {
    const { name, value } = e.target;

    setLocalFilters((prevState: FilterValues) => {
      const updatedRange = {
        ...prevState[type],
        [name]: value,
      };

      const minValue = Number(updatedRange.min);
      const maxValue = Number(updatedRange.max);

      const hasError = minValue >= maxValue;

      setLocalErros((prevErrors: FilterErrors) => ({
        ...prevErrors,
        [type]: hasError,
      }));

      return {
        ...prevState,
        [type]: updatedRange,
      };
    });
  };

  const handlePremadeRangeChange = (
    value: number,
    type: 'price' | 'area',
    name: 'min' | 'max'
  ) => {
    setLocalFilters((prevState: FilterValues) => {
      const updatedRange = {
        ...prevState[type],
        [name]: value,
      };

      const minValue = Number(updatedRange.min);
      const maxValue = Number(updatedRange.max);

      const hasError = minValue >= maxValue;

      setLocalErros((prevErrors: FilterErrors) => ({
        ...prevErrors,
        [type]: hasError,
      }));

      return {
        ...prevState,
        [type]: updatedRange,
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

    setLocalFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        region: updatedRegions,
      };
      localStorage.setItem('filters', JSON.stringify(updatedFilters));
      return updatedFilters;
    });
    setFilters((prevStete) => ({ ...prevStete, region: updatedRegions }));
  };

  const handleRangeDelete = (type: 'area' | 'price') => {
    setLocalFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        [type]: { min: '', max: '' },
      };
      localStorage.setItem('filters', JSON.stringify(updatedFilters));
      return updatedFilters;
    });

    setFilters((prevState) => ({
      ...prevState,
      [type]: { min: '', max: '' },
    }));
  };

  const premadePrices = [50000, 100000, 150000, 200000, 300000];
  const premadeAreas = [50, 100, 150, 200, 300];

  return (
    <>
      <section className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='flex shrink'>
            <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
              <DropdownCheckboxes
                localFilters={localFilters}
                setLocalFilters={setLocalFilters}
              />
              <Dropdown
                dropdownTitle='ფასის მიხედვით'
                buttonText='საფასო კატეგორია'
                onSubmit={() => handleRangeSubmit('price')}
                error={localErrors.price}
              >
                <div className='w-[334px]'>
                  <div className='flex gap-x-4'>
                    <NumberInput
                      placeholder='დან'
                      name='min'
                      value={localFilters.price.min}
                      icon={<>{'\u20BE'}</>}
                      onChange={(e) => handleRangeChange(e, 'price')}
                    />
                    <NumberInput
                      placeholder='დან'
                      name='max'
                      value={localFilters.price.max}
                      icon={<>{'\u20BE'}</>}
                      onChange={(e) => handleRangeChange(e, 'price')}
                    />
                  </div>
                  {localErrors.price && (
                    <p className='mt-2 font-firago text-sm text-error'>
                      ჩაწერეთ ვალიდური მონაცემები
                    </p>
                  )}
                  <div className='mt-6 font-firago text-sm flex justify-start gap-6'>
                    <PremadeButtons
                      name='min'
                      premadeValues={premadePrices}
                      type='price'
                      onClick={handlePremadeRangeChange}
                      title='მინ. ფასი'
                      icon={<>{'\u20BE'}</>}
                    />
                    <PremadeButtons
                      name='max'
                      premadeValues={premadePrices}
                      onClick={handlePremadeRangeChange}
                      type='price'
                      title='მაქს. ფასი'
                      icon={<>{'\u20BE'}</>}
                    />
                  </div>
                </div>
              </Dropdown>
              <Dropdown
                dropdownTitle='ფართობის მიხედვით'
                buttonText='ფართობი'
                onSubmit={() => handleRangeSubmit('area')}
                error={localErrors.area}
              >
                <div className='w-[334px]'>
                  <div className='flex gap-x-4'>
                    <NumberInput
                      placeholder='დან'
                      name='min'
                      value={localFilters.area.min}
                      icon={
                        <>
                          მ<sup className='text-[10px] align-super'>2</sup>
                        </>
                      }
                      onChange={(e) => handleRangeChange(e, 'area')}
                    />
                    <NumberInput
                      placeholder='დან'
                      name='max'
                      value={localFilters.area.max}
                      icon={
                        <>
                          მ<sup className='text-[10px] align-super'>2</sup>
                        </>
                      }
                      onChange={(e) => handleRangeChange(e, 'area')}
                    />
                  </div>
                  {localErrors.area && (
                    <p className='mt-2 font-firago text-sm text-error'>
                      ჩაწერეთ ვალიდური მონაცემები
                    </p>
                  )}
                  <div className='mt-6 font-firago text-sm flex justify-start gap-6'>
                    <PremadeButtons
                      name='min'
                      premadeValues={premadeAreas}
                      onClick={handlePremadeRangeChange}
                      type='area'
                      title='მინ. ფასი'
                      icon={
                        <>
                          მ<sup className='text-[10px] align-super'>2</sup>
                        </>
                      }
                    />
                    <PremadeButtons
                      name='max'
                      premadeValues={premadeAreas}
                      onClick={handlePremadeRangeChange}
                      type='area'
                      title='მაქს. ფასი'
                      icon={
                        <>
                          მ<sup className='text-[10px] align-super'>2</sup>
                        </>
                      }
                    />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        <ActionButtons />
      </section>
      <div className='flex mt-4 gap-2 flex-wrap'>
        {filters.region
          .filter((region) => region.checked)
          .map((checkedRegion) => {
            return (
              <div
                key={checkedRegion.id}
                className='border rounded-[43px] flex p-1 py-[6px] px-[10px] items-center font-firago text-sm'
              >
                <p>{checkedRegion.name}</p>
                <button onClick={() => handleRegionDelete(checkedRegion)}>
                  <img
                    src={closeIcon}
                    alt={`delete filter by region ${checkedRegion.name}`}
                    className='w-[14px] h-[14px]'
                  />
                </button>
              </div>
            );
          })}
        {filters.price.min && filters.price.max && (
          <div className='border rounded-[43px] flex gap-1 p-1 py-[6px] px-[10px] items-center font-firago text-sm'>
            <div className='flex gap-2 font-firago'>
              <p>
                {filters.price.min}
                {'\u20BE'}
              </p>
              <p>-</p>
              <p>
                {filters.price.max}
                {'\u20BE'}
              </p>
            </div>
            <button onClick={() => handleRangeDelete('price')}>
              <img
                src={closeIcon}
                alt={`delete price filter`}
                className='w-[14px] h-[14px]'
              />
            </button>
          </div>
        )}
        {filters.area.min && filters.area.max && (
          <div className='border rounded-[43px] flex gap-1 p-1 py-[6px] px-[10px] items-center font-firago text-sm'>
            <div className='flex gap-2'>
              <p>
                {filters.area.min}მ<sup className='text-[10px] '>2</sup>
              </p>
              <p>-</p>
              <p>
                {filters.area.max}მ<sup className='text-[10px]'>2</sup>
              </p>
            </div>
            <button onClick={() => handleRangeDelete('area')}>
              <img
                src={closeIcon}
                alt={`delete price filter`}
                className='w-[14px] h-[14px]'
              />
            </button>
          </div>
        )}
      </div>
      <RegisterAgentModal />
    </>
  );
};

export default Filters;
