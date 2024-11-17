'use client'
import React, { createContext, useContext, useState } from 'react';

interface FilterCriteria {
  searchText: string;
  features: string[];
  services: string[];
  maxGuests: number | null;
  priceRange: [number | null, number | null];
}

interface FilterContextProps {
  filters: FilterCriteria;
  setFilters: React.Dispatch<React.SetStateAction<FilterCriteria>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchText: '',
    features: [],
    services: [],
    maxGuests: null,
    priceRange: [null, null],
  });

  const updateFilters = (newFilters: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within a FilterProvider');
  return context;
};
