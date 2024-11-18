'use client'
import { getFilteredListings } from '@/utils/listings';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  filteredCount: number;
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

  const [filteredCount, setFilteredCount] = useState(0);

  useEffect(() => {
    const calculateFilteredCount = async () => {
      const filteredListings = await getFilteredListings(filters);
      setFilteredCount(filteredListings.length);
    };

    calculateFilteredCount();
  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, filteredCount }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within a FilterProvider');
  return context;
};
