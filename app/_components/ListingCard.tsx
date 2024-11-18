import Link from "next/link";
import React from "react";
import FavoriteButton from "./FavoriteButton";
import ImageSwiper from "./ImageSwiper";
import { IoStar } from "react-icons/io5";

interface ListingCardProps {
  id: string;
  title: string;
  images: string[];
  country: string;
  city: string;
  price_per_night: number;
  averageRating?: number | null;
  swiperStyle?: string; // Optional style prop for swiper
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  images,
  country,
  city,
  price_per_night,
  averageRating,
  swiperStyle,
}) => {
  return (
    <div className="relative overflow-hidden">
      <FavoriteButton
        listingId={id}
        iconSize="35"
        className="absolute top-8 right-4 z-10"
      />
      <Link href={`/${id}`} className="m-4 max-w-lg h-fit">
        <ImageSwiper images={images} swiperStyle={swiperStyle} />
        <div className="flex justify-between mt-2">
          <h2 className="font-semibold">{title}</h2>
          {averageRating !== null && averageRating !== undefined ? (
            <div className="flex items-center gap-1">
              <IoStar className="text-[#FF5A5F]" />
              <p>{averageRating.toFixed(1)}</p>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>
        <p>
          {city}, {country}
        </p>
        <p className="text-secondary">
          From €{Intl.NumberFormat("en-GB").format(price_per_night)} / night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
