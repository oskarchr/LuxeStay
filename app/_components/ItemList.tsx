'use client'
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import { useFilters } from '@/context/filter';
import { getFilteredListings } from '@/utils/listings';

const ItemList = ({ initialListings }: { initialListings: any[] }) => {
  const { filters } = useFilters();
  const [listings, setListings] = useState(initialListings);

  useEffect(() => {
    console.log('Filters applied in ItemList:', filters); // Log the filters
    const fetchFilteredListings = async () => {
      const updatedListings = await getFilteredListings(filters);
      console.log('Updated Listings:', updatedListings);
      setListings(updatedListings);
    };

    fetchFilteredListings();

  }, [filters]);


  return (
    <div className="justify-center mx-4 mb-24 md:mb-64 md:mx-16 xl:mx-32 md:mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       {listings && listings.length > 0 ? (
        listings.map((item) => (
          <ListingCard
            id={item.id}
            key={item.id}
            title={item.title}
            images={item.images}
            country={item.country}
            city={item.city}
            price_per_night={item.price_per_night}
            averageRating={item.average_rating}
            swiperStyle="rounded-xl h-80"
          />
        ))
      ) : (
        <div>No listings found.</div>  // Display a fallback message if no listings are found
      )}
    </div>
  );
};

export default ItemList;