export type FilterValues = {
  region: {
    id: number;
    name: string;
    checked: boolean;
  }[];
  price: {
    min: string;
    max: string;
  };
  area: {
    min: string;
    max: string;
  };
  bedroom: string;
};

export type FilterErrors = {
  price: boolean;
  area: boolean;
  bedroom: boolean;
};
