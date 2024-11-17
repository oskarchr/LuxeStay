'use client'
import { useFilters } from '@/context/filter';
import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { MdFilterList } from 'react-icons/md';
import FilterModal from './FilterModal';

const Searchbar: React.FC = () => {
  const { filters, setFilters } = useFilters();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchText: e.target.value }));
  };

  useEffect(() => {
    // Check if modal is opened from URL
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('modal') === 'filter') {
      setIsFilterModalOpen(true);
    }
  }, []);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('modal', 'filter');
    window.history.pushState(null, '', '?' + queryParams.toString());
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('modal');
    window.history.pushState(null, '', '?' + queryParams.toString());
  };

  return (
    <div className="relative z-20 flex items-center bg-white h-12 p-4 rounded-full drop-shadow-sm ">
      <IoMdSearch size={24} />
      <input
        type="text"
        placeholder="Where to?"
        value={filters.searchText}
        onChange={handleSearchChange}
        className="mx-2 focus:outline-none w-full"
      />
      <button
        className="ml-auto border rounded-full p-1.5"
        onClick={openFilterModal}
      >
        <MdFilterList size={24} />
      </button>

      {isFilterModalOpen && <FilterModal closeModal={closeFilterModal} />}
    </div>
  );
};

export default Searchbar;