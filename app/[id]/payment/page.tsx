'use client'
import BackButton from '@/app/_components/BackButton'
import { useBooking } from '@/context/booking'
import { createBooking, fetchBookings } from '@/utils/bookings'
import calculateNights from '@/utils/calculateNights'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function PaymentPage() {
  const { bookingDetails, setBookingDetails } = useBooking();
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const nights = calculateNights(bookingDetails.startDate, bookingDetails.endDate)

  // Simulate payment confirmation after the user successfully pays
  const handlePaymentConfirmation = async () => {
    const { listingId, startDate, endDate, guestCount, totalPrice, userId } = bookingDetails;
  
    console.log("Booking Details:", bookingDetails);  // Log booking details
  
    if (!listingId || !startDate || !endDate || !guestCount || !totalPrice || !userId) {
      console.error('Missing booking details:', bookingDetails);  // Log missing details
      return;
    }
  
    // Proceed with booking creation
    const { error, booking } = await createBooking(
      userId,
      listingId,
      startDate,
      endDate,
      guestCount,
      totalPrice
    );
  
    if (booking) {
      fetchBookings(userId)
      router.push(`/${booking.id}/confirmation`);
    } else {
      console.error('Error during booking creation:', { error, booking });
    }
  };

  // Check if booking details are available
  useEffect(() => {
    if (!bookingDetails.listingId) {
      setLoading(true);
      return;
    }

    setLoading(false);
  }, [bookingDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mx-4 h-[calc(100vh-256px)] mt-8 md:mt-24">
       <div className="flex items-center justify-center relative w-full">
        <BackButton className="absolute left-0 md:hidden" />
        <h1 className="text-center font-semibold text-3xl">Payments</h1>
      </div>
      <div className="flex flex-col gap-4 bg-white mt-8 px-4 py-6 shadow-xl rounded-xl w-full max-w-lg">
        <div className="flex gap-4">
          <Image
            src={bookingDetails.images[0]}
            width={500}
            height={500}
            alt={`Image of ${bookingDetails.title}`}
            className="rounded-lg object-cover w-12 h-12"
            />
          <div>
            <h2 className="font-semibold">{bookingDetails.title}</h2>
            <p className="text-secondary">{bookingDetails.city}, {bookingDetails.country}</p>
          </div>
        </div>
        <p className="text-secondary">Booking Date: {new Date(bookingDetails.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(bookingDetails.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        <hr className="border-[#D8D5D5]"></hr>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Price Details</h2>
          <div className="flex justify-between">
            <p>€{bookingDetails.pricePerNight} x {nights} nights</p>
            <p>€{nights * (bookingDetails.pricePerNight ?? 0)}</p>
          </div>
          <div className="flex justify-between">
            <p>Cleaning fee</p>
            <p>€{bookingDetails.cleaningFee}</p>
          </div>
          <div className="flex justify-between">
            <p>Service fee</p>
            <p>€0</p>
          </div>

          <hr className="border-[#D8D5D5] mb-4 mt-16"></hr>
          <div className="flex justify-between">
            <p>Total (EUR) </p>
            <p>€{bookingDetails.totalPrice}</p>
          </div>
        </div>
      </div>
      <button
          onClick={handlePaymentConfirmation}
          className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-3 px-12 rounded-md mt-4"
        >
          Confirm Payment
        </button>
    </div>
    // <div>
    //   <div className="flex items-center justify-center relative mt-8">
    //     <BackButton className="absolute left-4" />
    //     <h1 className="text-center font-semibold text-3xl">Payment</h1>
    //   </div>
    //   <div className="m-16">
    //     <h1 className="text-xl font-semibold">{bookingDetails.title}</h1>
    //     <p>{bookingDetails.city}, {bookingDetails.country}</p>
    //     <p>Start Date: {bookingDetails.startDate}</p>
    //     <p>End Date: {bookingDetails.endDate}</p>
    //     <p>Guests: {bookingDetails.guestCount}</p>
    //     <p>Total Price: ${bookingDetails.totalPrice}</p>
    //     {bookingDetails.images[0] && (
    //       <Image
    //         src={bookingDetails.images[0]}
    //         width={500}
    //         height={500}
    //         alt={`Image of ${bookingDetails.title}`}
    //         className="rounded-lg object-cover w-full"
    //       />
    //     )}
    //     {/* Simulate payment confirmation */}
    //     <button
    //       onClick={handlePaymentConfirmation}
    //       className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
    //     >
    //       Confirm Payment
    //     </button>
    //   </div>
    // </div>
  );
}

export default PaymentPage;