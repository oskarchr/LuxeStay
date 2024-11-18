'use client'
import BackButton from "@/app/_components/BackButton";
import { fetchReviewsForListing } from "@/utils/reviews";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import moment from 'moment'

const ReviewsPage = ({ params }: { params: { id: string } }) => {
    const [reviews, setReviews] = useState<Review[]>([]); // Specify the type of reviews
    const [sortOrder, setSortOrder] = useState<'recent' | 'highest' | 'lowest'>('recent'); // Limit sortOrder to those 3 values
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    const fetchReviews = async () => {
        const reviewsData = await fetchReviewsForListing(params.id);
        
        // Sort reviews based on the sortOrder
        if (sortOrder === 'recent') {
            reviewsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === 'highest') {
            reviewsData.sort((a, b) => b.rating - a.rating);
        } else if (sortOrder === 'lowest') {
            reviewsData.sort((a, b) => a.rating - b.rating);
        }

        setReviews(reviewsData);
    };

    useEffect(() => {
        fetchReviews();
    }, [sortOrder]);

    const reviewCount = reviews.length;
  
    // Calculate the average rating
    const averageRating =
    reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

        const handleSortSelection = (order: 'recent' | 'highest' | 'lowest') => {
            setSortOrder(order);
            setIsModalOpen(false); // Close the modal after selection
        };
    
        // Close the modal if clicked outside of it
        const handleOutsideClick = (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                setIsModalOpen(false);
            }
        };

    return (
        <div className="flex justify-center min-h-[calc(100vh-256px)] mx-auto max-w-4xl mb-24 md:mb-0">
            <div className="relative m-6 md:mt-24 w-full">
                <BackButton className="md:hidden absolute" />
                <h1 className="mb-12 font-semibold text-3xl text-center">Reviews</h1>
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2 items-center">
                        <IoStarOutline size={"25"} className="bg-black text-white p-1 rounded-sm" />
                        <h2 className="text-2xl font-semibold">{averageRating.toFixed(1)} • {reviewCount} reviews</h2>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)} // Open the modal on button click
                        className="flex items-center gap-2 bg-white rounded-full px-2 border-4 border-buttonSecondary"
                    >
                        {sortOrder === 'recent' ? 'Most Recent' : sortOrder === 'highest' ? 'Highest Rated' : 'Lowest Rated'}
                        <FaChevronDown />
                    </button>
                </div>

                {/* Modal for selecting sort order */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        onClick={handleOutsideClick} // Close modal when clicking outside
                    >
                        <div className="flex flex-col gap-8 bg-white px-12 pb-12 pt-6 rounded-lg shadow-lg max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-2xl font-semibold text-center">Sort by</h3>
                            <hr className="border-[#D8D5D5]"></hr>
                            <div className="flex flex-col gap-6 mx-6">
                                <label className="flex justify-between items-center gap-2 cursor-pointer">
                                    <span>Most Recent</span>
                                    <input
                                        type="radio"
                                        name="sortOrder"
                                        value="recent"
                                        checked={sortOrder === 'recent'}
                                        onChange={() => handleSortSelection('recent')}
                                        className="bg-black border-8 border-black rounded-full appearance-none w-6 h-6 checked:bg-white  cursor-pointer"
                                    />
                                </label>
                                <label className="flex justify-between items-center gap-2 cursor-pointer">
                                    <span>Highest Rated</span>
                                    <input
                                        type="radio"
                                        name="sortOrder"
                                        value="highest"
                                        checked={sortOrder === 'highest'}
                                        onChange={() => handleSortSelection('highest')}
                                        className="bg-black border-8 border-black rounded-full appearance-none w-6 h-6 checked:bg-white  cursor-pointer"
                                    />
                                </label>
                                <label className="flex justify-between items-center gap-2 cursor-pointer">
                                    <span>Lowest Rated</span>
                                    <input
                                        type="radio"
                                        name="sortOrder"
                                        value="lowest"
                                        checked={sortOrder === 'lowest'}
                                        onChange={() => handleSortSelection('lowest')}
                                        className="bg-black border-8 border-black rounded-full appearance-none w-6 h-6 checked:bg-white  cursor-pointer"
                                    />
                                </label>
                            </div>
                            <hr className="border-[#D8D5D5]"></hr>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="">
                            <div className="flex">
                                <h3 className="font-semibold mr-2">{review.name}</h3>
                                <p className="text-secondary">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {Array(review.rating).fill(<IoStarOutline size={"15"} className="bg-black text-white p-0.5 rounded-sm" />)}
                                </div>
                                <span>•</span>
                                <p>{moment(new Date(review.date)).fromNow()}</p>
                            </div>
                            <p className="mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;