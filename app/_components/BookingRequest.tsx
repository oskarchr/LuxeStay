'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Using next/navigation for client navigation
import { useBooking } from '@/context/booking';
import { FaChevronDown, FaChevronUp, FaMinus, FaPlus } from 'react-icons/fa6';
import calculateNights from '@/utils/calculateNights';
import { checkOverlappingBookings } from '@/utils/bookings';

interface BookingRequestProps extends BookingDetails {
    className?: string;
  }

const BookingRequest: React.FC<BookingRequestProps> = ({
  listingId,
  title,
  city,
  country,
  images,
  latitude,
  longitude,
  pricePerNight,
  cleaningFee,
  totalPrice,
  startDate,
  endDate,
  guestCount,
  maxGuests,
  userId,
  className 
}) => {

  const { setBookingDetails } = useBooking();  // Use context to set details
  const router = useRouter();

  // Local state for form values
  const [bookingData, setBookingData] = useState<BookingDetails>({
    listingId,
    title,
    city,
    country,
    images,
    latitude,
    longitude,
    pricePerNight: pricePerNight ?? 0,
    startDate: startDate ? startDate.split('T')[0] : '',
    endDate: endDate ? endDate.split('T')[0] : '',
    guestCount: guestCount ?? 1,
    cleaningFee,
    totalPrice: 0,
    maxGuests,
    userId
  });

  // Local state for calculated values
  const [nights, setNights] = useState(calculateNights(bookingData.startDate, bookingData.endDate));
  const [totalCost, setTotalCost] = useState(0);

  // Dropdown state and guest count state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [guestCountState, setGuestCountState] = useState(bookingData.guestCount);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the booking data
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If startDate or endDate changes, recalculate nights and total cost
    if (name === 'startDate' || name === 'endDate') {
      const updatedStartDate = name === 'startDate' ? value : bookingData.startDate;
      const updatedEndDate = name === 'endDate' ? value : bookingData.endDate;
      const calculatedNights = calculateNights(updatedStartDate, updatedEndDate);
      setNights(calculatedNights);

      // Calculate new total cost
      const price = pricePerNight ?? 0;
      const newTotalCost = calculatedNights * price + (cleaningFee ?? 0);
      setTotalCost(newTotalCost);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Increment and decrement functions
  const incrementGuestCount = () => {
    setGuestCountState(prev => Math.min(prev + 1, maxGuests));
    setBookingData(prev => ({
      ...prev,
      guestCount: Math.min(guestCountState + 1, maxGuests)
    }));
  };

  const decrementGuestCount = () => {
    setGuestCountState(prev => Math.max(prev - 1, 1));
    setBookingData(prev => ({
      ...prev,
      guestCount: Math.max(guestCountState - 1, 1)
    }));
  };

  // Function to handle navigation to the payment page
  const handleNext = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    // Check for overlapping bookings before proceeding
    const isOverlap = await checkOverlappingBookings(
      listingId,
      bookingData.startDate,
      bookingData.endDate
    );

    if (isOverlap) {
      setErrorMessage('This booking overlaps with another existing booking. Please choose different dates.');
      return
    }

    setBookingDetails((prev) => ({
      ...prev,
      ...bookingData,
      totalPrice: totalCost,
    }));

    router.push(`/${listingId}/payment`);
  };

  return (
    <div className={`${className} md:max-w-lg md:bg-white md:border md:rounded-2xl md:p-8`}>
      <div className="flex flex-col mb-24 mt-4 md:m-0">
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded max-w-md">
            {errorMessage}
          </div>
        )}
        <p className="text-center font-semibold md:hidden">CHECK-IN / CHECK-OUT</p>
        <h3 className="hidden text-2xl font-semibold md:block">€{pricePerNight} / night</h3>
        <div className="border-2 border-secondary rounded-lg shadow-lg m-4 md:border-0 md:flex md:flex-col md:gap-2 md:shadow-none md:mx-0">
            <div className="flex border-b-2 border-secondary md:border-0 md:gap-2">
                <div className="p-2 border-r-2 border-secondary md:border md:border-gray-200 md:flex-1">
                    <label className="">
                    <input 
                        type="date" 
                        name="startDate" 
                        value={bookingData.startDate || ''}  
                        onChange={handleInputChange}
                        className="bg-background outline-0 md:bg-white"
                    />
                    </label>
                </div>
                <div className="p-2 md:border md:flex-1">
                    <label>
                    <input 
                        type="date" 
                        name="endDate" 
                        value={bookingData.endDate || ''}  
                        onChange={handleInputChange}
                        className="bg-background outline-0 md:bg-white"
                    />
                    </label>
                </div>
            </div>
            <div className="md:border">
                <label className="mb-16">
                  <div className="relative flex flex-col p-2">
                    <button onClick={toggleDropdown} className="w-full cursor-pointer flex items-center justify-between">
                      {!isDropdownOpen && (
                        <p className="">{guestCountState} {guestCountState === 1 ? 'guest' : 'guests'}</p>
                      )}
                      {isDropdownOpen ? (
                        <FaChevronUp size={20} className="items-center mx-auto pointer-events-none"/>
                      ) : (
                        <FaChevronDown size={20} className="pointer-events-none" />
                      )}
                    </button>
                        {isDropdownOpen && (
                        <div className="flex justify-between bg-background p-2 mx-2 rounded md:bg-white">
                            <p className="">Guests</p>
                            <div className="flex gap-4">
                                <button onClick={decrementGuestCount} disabled={guestCountState <= 1}><FaMinus size={20}/></button>
                                <p className="font-semibold">{guestCountState}</p>
                                <button onClick={incrementGuestCount} disabled={guestCountState >= maxGuests}><FaPlus size={20}/></button>
                            </div>
                        </div>
                        )}
                  </div>
                </label>
            </div>
        <button 
          onClick={handleNext} 
          className="hidden bg-buttonPrimary hover:bg-buttonPrimaryHover md:bg-accent md:hover:bg-[#068488c2] text-white py-3 px-4 rounded-md mt-4 md:block"
          >
          Request
        </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="font-semibold md:text-xl">Price Details</h2>
          <div className="flex justify-between">
            <p>€{pricePerNight} x {nights} nights</p>
            <p>€{nights * (pricePerNight ?? 0)}</p>
          </div>
          <div className="flex justify-between">
            <p>Cleaning fee</p>
            <p>€{cleaningFee}</p>
          </div>
          <div className="flex justify-between">
            <p>Service fee</p>
            <p>€0</p>
          </div>

          <hr className="border-[#D8D5D5] mb-4 mt-16"></hr>
          <div className="flex justify-between">
            <p>Total (EUR) </p>
            <p>€{totalCost}</p>
          </div>
        </div>
        <button 
            onClick={handleNext} 
            className="bg-buttonPrimary hover:bg-buttonPrimaryHover md:bg-accent md:hover:bg-[#068488c2] text-white py-3 px-4 rounded-md mt-4 md:hidden"
        >
            Payment
        </button>
      </div>
    </div>
  );
};

export default BookingRequest;
