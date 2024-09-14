export type City = {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
};

export type RealEstate = {
  id: number;
  address: string;
  area: number;
  bedrooms: number;
  city: City;
  city_id: number;
  image: string;
  is_rental: boolean;
  price: number;
  zip_code: string;
};
