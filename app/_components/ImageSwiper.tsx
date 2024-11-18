// ImageSwiper.tsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageSwiperProps {
  images: string[];
  height?: string; // Optional height prop
  swiperStyle?: string; // Optional style prop
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images, swiperStyle }) => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10} // Space between slides
      slidesPerView={1} // Show one slide at a time
      pagination={{ clickable: true }} // Enable pagination dots
      className={swiperStyle} // Set a height for the Swiper container and merge styles
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            className="" // Use object-cover to fill the slide
            alt={`Image of ${image}`} // Use meaningful alt text
            placeholder="empty"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
