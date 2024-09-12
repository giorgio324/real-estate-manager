import Filter from './Filter';

const Filters = () => {
  return (
    <section className='flex justify-between'>
      <div className='border border-border rounded-xl p-[6px] font-firago font-medium flex gap-4'>
        <Filter buttonTitle='ქალაქი' />
        <Filter buttonTitle='ფასი' />
      </div>
    </section>
  );
};
export default Filters;
