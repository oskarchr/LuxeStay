"use client";
import { useFilters } from "@/context/filter";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import FilterModal from "./FilterModal";

const Searchbar: React.FC = () => {
  const { filters, setFilters } = useFilters();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
    const queryParams = new URLSearchParams(window.location.search);

    if (isFilterModalOpen) {
      queryParams.delete("modal");
    } else {
      queryParams.set("modal", "filter");
    }

    window.history.pushState(null, "", "?" + queryParams.toString());
  };

  return (
    <div className="z-20 relative">
      <div className="flex items-center bg-white h-12 p-4 rounded-full drop-shadow-sm mx-4">
        <IoMdSearch size={24} />
        <input
          type="text"
          placeholder="Where to?"
          value={filters.searchText}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchText: e.target.value }))
          }
          className="mx-2 focus:outline-none w-full"
        />
        <button
          className="ml-auto border border-[#CCCCCC] rounded-full p-1.5"
          onClick={toggleFilterModal}
        >
          <MdFilterList size={24} />
        </button>
      </div>

      {isFilterModalOpen && (
        <FilterModal
          closeModal={toggleFilterModal}
          toggleModal={toggleFilterModal}
        />
      )}
    </div>
  );
};

export default Searchbar;
