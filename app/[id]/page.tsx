
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link';
import { FaTemperatureHigh, FaUmbrellaBeach, FaUser } from 'react-icons/fa'
import { IoChevronBackCircle, IoStarOutline } from 'react-icons/io5';
import FavoriteButton from '../_components/FavoriteButton';
import MapComponent from '../_components/MapComponent';
import ImageSwiper from '../_components/ImageSwiper';
import BookingRequest from '../_components/BookingRequest';
import { fetchReviewsForListing } from '@/utils/reviews';
import ReviewsSwiper from '../_components/ReviewsSwiper';
import { FaWifi } from 'react-icons/fa6';
import { TbPlayVolleyball, TbToolsKitchen2 } from 'react-icons/tb';
import { CiParking1 } from 'react-icons/ci';
import { PiPawPrint } from 'react-icons/pi';
import { MdOutlinePool } from 'react-icons/md';
import { GiSoccerField } from 'react-icons/gi';


async function DetailsPage ({ params }: { params: { id: string } }) { 
    const supabase = createClient()

    const { data: user, error: userError } = await supabase.auth.getUser();
    
    const userId = userError || !user?.user ? null : user?.user?.id;

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single()

        // Handle error
    if (error) {
        console.error('Error fetching listing:', error);
        return <div>Error fetching listing</div>;
    }

    // Check if data exists
    if (!data) {
        return <div>No listing found.</div>;
    }

    // Fetch reviews for the current listing
    const reviews = await fetchReviewsForListing(params.id);
    const averageRating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;
    const reviewCount = reviews.length;

    return (
        <div className="mb-24 md:mx-16 md:mt-[85px] xl:max-w-6xl xl:mx-auto">
            <h1 className="hidden font-semibold text-2xl md:block">{data.title}</h1>
            <div className="relative">
                <ImageSwiper
                    images={data.images}
                    swiperStyle="h-80"
                />
                <Link href="/" className="fixed z-10 top-4 left-4 inline-block w-[45px] h-[45px] m-2 rounded-full overflow-hidden md:hidden">
                    <IoChevronBackCircle size={45} className="bg-white"/>
                </Link>
                <FavoriteButton listingId={params.id} iconSize="35" className="fixed top-4 right-4 z-10 md:absolute"/>
            </div>
            <div className="md:grid md:grid-cols-2 m-6 md:my-4 md:mx-0 md:w-full">
                    <div className="md:mr-4">
                        <div>
                            <h1 className="font-semibold text-2xl md:hidden">{data.title}</h1>
                            <p className="md:hidden">{data.city}, {data.country}</p>
                            <h2 className="hidden font-semibold text-2xl md:block">{data.city}, {data.country}</h2>

                            <p>€{Intl.NumberFormat('en-GB').format(data.price_per_night)} / night</p>
                            <p className="text-sm text-[#777777]">
                                {data.guests}<span> guests • </span>
                                {data.bedrooms}<span> bedrooms • </span>
                                {data.beds}<span> beds • </span>
                                {data.bathrooms}<span> bathrooms</span>
                            </p>
                            <div className="hidden gap-2 items-center md:flex md:w-full mt-2">
                                    <IoStarOutline size={"25"} className="bg-black text-white p-1 rounded-sm" />
                                    <p className="font-medium">{averageRating.toFixed(1)} • {reviewCount} reviews</p>
                                </div>
                            <hr className="border-[#D8D5D5] my-4"></hr>
                            <div className="flex items-center">
                                <FaUser size={28} className="mx-3"/>
                                <p>Hosted by {data.host_name}</p>
                            </div>
                            <hr className="border-[#D8D5D5] my-4"></hr>

                            <p>{data.description}</p>
                            
                            <hr className="border-[#D8D5D5] my-4"></hr>
                                <h2 className="font-semibold text-2xl mb-4">Where you'll be</h2>
                                <MapComponent latitude={data.latitude} longitude={data.longitude} />
                            <hr className="border-[#D8D5D5] my-4"></hr>
                        </div>

                        <div className="md:bg-white md:border md:grid md:grid-cols-2 md:rounded-2xl md:p-8 md:gap-8 md:max-w-lg">
                            {/* What this place offers */}
                            <div className="md:hidden">
                                <h2 className="font-semibold text-2xl mb-4">What this place offers</h2>
                                {data.property_offers.map((offer: string, index: number) => (
                                    <div key={index} className="flex items-center mb-1">
                                    {offer === "Wifi" && <FaWifi className="mr-2 text-2xl" />}
                                    {offer === "Kitchen" && (
                                        <TbToolsKitchen2 className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Free parking" && (
                                        <CiParking1 className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Pets allowed" && (
                                        <PiPawPrint className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Pool" && (
                                        <MdOutlinePool className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Sauna" && (
                                        <FaTemperatureHigh className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Football field" && (
                                        <GiSoccerField className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Beach Volleyball" && (
                                        <TbPlayVolleyball className="mr-2 text-2xl" />
                                    )}
                                    {offer === "Private beach" && (
                                        <FaUmbrellaBeach className="mr-2 text-2xl" />
                                    )}
                                    <p>{offer}</p>
                                    </div>
                                ))}
                                <hr className="border-[#D8D5D5] my-4 md:hidden"></hr>
                            </div>    
                            <div>
                                <h2 className="font-semibold text-2xl mb-4">House rules</h2>
                                    <p>{data.house_rules.map((item: String, index: number)=> <span key={index}>{item}<br /></span>)}</p>
                                <hr className="border-[#D8D5D5] my-4 md:hidden"></hr>
                            </div>
                            
                            <div>
                                <h2 className="font-semibold text-2xl mb-4">Safety</h2>
                                <p>{data.safety_information.map((item: String, index: number)=> <span key={index}>{item}<br /></span>)}</p>
                                <hr className="border-[#D8D5D5] my-4 md:hidden"></hr>
                            </div>
                            <div>
                                <h2 className="font-semibold text-2xl mb-4">Property features</h2>
                                <p>{data.property_features.map((item: String, index: number)=> <span key={index}>{item}<br /></span>)}</p>
                                <hr className="border-[#D8D5D5] my-4 md:hidden"></hr>
                            </div>
                            <div>
                                <h2 className="font-semibold text-2xl mb-4">Services</h2>
                                <p>{data.property_services.map((item: String, index: number)=> <span key={index}>{item}<br /></span>)}</p>
                                <hr className="border-[#D8D5D5] my-4 md:hidden"></hr>
                            </div>  
                        </div>
                        {/* REVIEWS */}
                        <div className="flex flex-col gap-4 md:bg-white md:max-w-lg md:mt-4 md:border md:rounded-2xl md:p-8">
                            <h3 className="font-semibold text-2xl">Showing 1 of {reviewCount} reviews</h3>
                            <div className="flex gap-2 items-center md:hidden">
                                <IoStarOutline size={"25"} className="bg-black text-white p-1 rounded-sm" />
                                <p className="font-medium">{averageRating.toFixed(1)} • {reviewCount} reviews</p>
                            </div>
                            <ReviewsSwiper reviews={reviews} />
                            <Link href={`${params.id}/reviews`} className="px-8 py-4 rounded-xl border border-buttonPrimary text-center mx-auto md:p-0 md:border-0 md:underline md:font-medium md:ml-0">
                                Show all reviews
                            </Link>
                        </div>
                    </div>

             
                <div className="fixed flex h-[80px] justify-center items-center bg-[#F0F0F0] border bottom-0 left-0 w-full md:hidden">
                    <Link href={`${params.id}/request`} className="px-12 py-4 rounded-xl bg-accent hover:bg-[#068488c2] text-white">
                        Request
                    </Link>
                </div>
                <BookingRequest 
                    listingId={params.id} // Passing the listingId
                    title={data.title} 
                    city={data.city} 
                    country={data.country} 
                    images={data.images} 
                    latitude={data.latitude} 
                    longitude={data.longitude} 
                    pricePerNight={data.price_per_night ?? 0}  // Default to 0 if price_per_night is null
                    cleaningFee={data.cleaning_fee}
                    totalPrice={null}
                    startDate={null} // Start date and end date could be initially null
                    endDate={null}
                    guestCount={1} // Assuming a default guest count of 1
                    maxGuests={data.guests} // Add the maxGuests prop
                    userId={userId}  // Set the userId in the context
                    className="hidden md:block md:max-h-fit md:ml-auto"
                />
            </div>
        </div>
    )
 }

export default DetailsPage