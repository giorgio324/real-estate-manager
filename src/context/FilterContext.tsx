import { createContext, useContext, useState } from 'react';

type FilterValues = {
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

type FilterContextType = {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const savedFilters = localStorage.getItem('filters');
  const parsedFilters: FilterValues = savedFilters
    ? JSON.parse(savedFilters)
    : {
        price: { min: '', max: '' },
        region: [],
        area: { min: '', max: '' },
        bedroom: '',
      };

  const [filters, setFilters] = useState<FilterValues>({
    price: {
      min: parsedFilters.price.min || '',
      max: parsedFilters.price.max || '',
    },
    region: parsedFilters.region || [],
    area: {
      min: parsedFilters.area.min || '',
      max: parsedFilters.area.max || '',
    },
    bedroom: parsedFilters.bedroom || '',
  });

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
