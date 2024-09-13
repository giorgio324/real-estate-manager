import Dropdown from './dropdown/Dropdown';

const Filters = () => {
  return (
    <section className='flex justify-between'>
      <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
        <Dropdown buttonTitle='რეგიონი' headerTitle='რეგიონის მიხედვით'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='accent-valid text-white w-5 h-5'
              />
              <p className='ml-2 font-firago text-sm'>ქართლი</p>
            </div>
            <div className='flex items-center'>
              <h1>Another City</h1>
              <input type='checkbox' />
            </div>
          </div>
        </Dropdown>
        <Dropdown buttonTitle='რეგიონი' headerTitle='რეგიონის მიხედვით'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='accent-valid text-white w-5 h-5'
              />
              <p className='ml-2 font-firago text-sm'>ქართლი</p>
            </div>
            <div className='flex items-center'>
              <h1>Another City</h1>
              <input type='checkbox' />
            </div>
          </div>
        </Dropdown>
      </div>
    </section>
  );
};
export default Filters;
