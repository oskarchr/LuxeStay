'use client';

import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '@/utils/favorites';
import FavoriteCard from './FavoriteCard';


interface FavoritesListProps {
  initialFavorites: Favorite[];
  userId: string;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ initialFavorites, userId }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(initialFavorites);

  useEffect(() => {
      const fetchData = async () => {
          const updatedFavorites = await fetchFavorites(userId);
          setFavorites(updatedFavorites);
      };

      fetchData();
  }, [userId]);

  // Callback to handle when an item is unfavorited
  const handleRemoveFavorite = (listingId: string) => {
      setFavorites((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite.listing_id !== listingId)
      );
  };

  return (
    <div className="flex flex-col items-center mx-6 mt-6 md:mt-24 min-h-[calc(100vh-256px)]">
        <h1 className="font-semibold text-3xl text-center mb-8">Favorites</h1>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full">
            
            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">No favorites yet.</p>
            ) : (
                favorites.map((favorite) => (
                    <FavoriteCard
                        id={favorite.id}
                        listing_id={favorite.listing_id}
                        key={favorite.id}
                        title={favorite.title}
                        image={favorite.image}
                        country={favorite.country}
                        city={favorite.city}
                        price_per_night={favorite.price_per_night}
                        averageRating={favorite.average_rating}
                        review_count={favorite.review_count}
                        onRemoveFavorite={handleRemoveFavorite}
                    />
                ))
            )}
        </div>
      </div>
  );
};

export default FavoritesList;