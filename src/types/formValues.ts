import { City } from './city';
import { Region } from './region';

export type CreateListingFormValues = {
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

export type CreateAgentFormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: null | string;
};

export type CreateAgentFormFinalValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: File;
};
