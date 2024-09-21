import { useFilter } from '../../context/FilterContext';
import { FilterValues } from '../../types/filter';
import Checkbox from '../checkbox/Checkbox';
import Dropdown from './Dropdown';
type Props = {
  localFilters: FilterValues;
  setLocalFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};
const DropdownCheckboxes = ({ setLocalFilters, localFilters }: Props) => {
  const { setFilters } = useFilter();

  const handleRegionSubmit = () => {
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

  return (
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
  );
};

export default DropdownCheckboxes;
