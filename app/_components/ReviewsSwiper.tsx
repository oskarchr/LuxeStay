"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const CustomPrevArrow = ({ className, onClick }: any) => (
  <button
    className={`${className} !text-buttonPrimary !hover:buttonPrimaryHover`}
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const CustomNextArrow = ({ className, onClick }: any) => (
  <button
    className={`${className} !text-buttonPrimary !hover:buttonPrimaryHover`}
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const ReviewsSwiper = ({ reviews }: { reviews: Review[] }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
    dots: false,
    nextArrow: <CustomNextArrow to="next" />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="px-4 md:max-w-xl">
      <Slider {...settings}>
        {reviews.slice(0, 5).map((review) => (
          <div
            key={review.id}
            className="slick-item bg-white rounded-xl p-4 border border-buttonPrimary w-64 h-64 md:border-0"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold">{review.name}</h3>
              <p className="text-secondary">
                {new Date(review.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="text-sm line-clamp-[7] md:text-base">
              {review.comment}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsSwiper;
