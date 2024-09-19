import { City } from './city';
import { Region } from './region';

export type CreateForm = {
  is_rental: string;
  image: null | string;
  address: string;
  zip_code: string;
  price: string;
  area: string;
  bedrooms: string;
  description: string;
  city: City | null;
  region: Region | null;
};
