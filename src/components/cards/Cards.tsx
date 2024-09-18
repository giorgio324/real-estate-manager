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
    <main className='mt-8 flex gap-5'>
      {realEstates?.map((item: RealEstate) => (
        <Card key={item.id} realEstate={item} />
      ))}
    </main>
  );
};

export default Cards;
