import Link from "next/link";
import React from "react";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import { IoStar } from "react-icons/io5";

interface FavoriteCardProps {
  id: string;
  listing_id: string;
  title: string;
  image: string;
  country: string;
  city: string;
  price_per_night: number;
  averageRating?: number;
  review_count?: number;
  onRemoveFavorite: (listingId: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  id,
  listing_id,
  title,
  image,
  country,
  city,
  price_per_night,
  averageRating,
  review_count,
  onRemoveFavorite,
}) => {
  return (
    <div className="relative bg-white m-4 shadow-xl rounded-lg max-h-48 overflow-hidden">
      <Link href={`/${listing_id}`} className="flex items-center">
        {image && (
          <Image
            src={image}
            width={150}
            height={192}
            alt={`Image of ${title}`}
            className="rounded-s-lg object-cover h-48"
          />
        )}
        <div className="flex flex-col m-4">
          {averageRating !== null && averageRating !== undefined ? (
            <div className="flex items-center gap-1">
              <IoStar className="text-[#FABF35]" />
              <p className="text-secondary">
                {averageRating.toFixed(1)} (
                {review_count === 0 ? "0" : review_count})
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
          <h2 className="font-semibold">{title}</h2>
          <p className="mb-10 text-[#777777]">
            {city}, {country}
          </p>
          <p className="mt-auto mb-0">
            €{Intl.NumberFormat("en-GB").format(price_per_night)} / night
          </p>
        </div>
      </Link>
      <FavoriteButton
        listingId={listing_id}
        iconSize="24"
        className="absolute top-2 right-2"
        onFavoriteChange={(isFavorited) => {
          if (!isFavorited) {
            onRemoveFavorite(listing_id);
          }
        }}
      />
    </div>
  );
};

export default FavoriteCard;
