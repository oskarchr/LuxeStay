"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { useFilters } from "@/context/filter";
import { getFilteredListings } from "@/utils/listings";

const ItemList = ({ initialListings }: { initialListings: any[] }) => {
  const { filters } = useFilters();
  const [listings, setListings] = useState(initialListings);

  useEffect(() => {
    const fetchFilteredListings = async () => {
      const updatedListings = await getFilteredListings(filters);
      setListings(updatedListings);
    };

    fetchFilteredListings();
  }, [filters]);

  return (
    <div className="justify-center mx-4 mb-24 md:mx-16 md:mt-24 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-[calc(100vh-256px)]">
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
        <h3 className="font-semibold mt-4">No listings found</h3>
      )}
    </div>
  );
};

export default ItemList;
