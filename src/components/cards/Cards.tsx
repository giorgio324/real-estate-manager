import { RealEstate } from '../../types/realEstate';
import Card from './Card';

type Props = {
  realEstates?: RealEstate[];
};

const Cards = ({ realEstates }: Props) => {
  if (realEstates?.length === 0) {
    return (
      <main className='mt-[65px]'>
        <h2 className='font-firago text-xl text-emptyText'>
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </h2>
      </main>
    );
  }
  return (
    <main className='my-8 grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] self-stretch gap-4'>
      {realEstates?.map((item: RealEstate) => (
        <Card key={item.id} realEstate={item} />
      ))}
    </main>
  );
};

export default Cards;
