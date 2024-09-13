import { useFetch } from '../hooks/useFetch';
import Checkbox from './checkbox/Checkbox';
import Dropdown from './dropdown/Dropdown';

const Filters = () => {
  const { data, error, isLoading } = useFetch('/regions');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className='flex justify-between'>
      <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
        <Dropdown buttonTitle='რეგიონი' headerTitle='რეგიონის მიხედვით'>
          <div className='flex w-[680px] flex-wrap gap-y-4 gap-x-[50px]'>
            {data &&
              data?.map((region: { id: number; name: string }) => (
                <Checkbox
                  key={region.id}
                  id={`region-${region.id}`}
                  label={region.name}
                />
              ))}
          </div>
        </Dropdown>
      </div>
    </section>
  );
};

export default Filters;
