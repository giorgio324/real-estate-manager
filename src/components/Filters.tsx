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
          {/* this is where i display token of result and where user can reset the fields */}
          <div>
            {/* this needs to be filter not map i only need to display what is checked */}
            {filters.region
              .filter((region) => region.checked)
              .map((checkedRegion) => {
                return (
                  <button
                    key={checkedRegion.id}
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
