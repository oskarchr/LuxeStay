"use client";

import { useEffect, useState } from "react";
import CancelBookingModal from "./CancelBookingModal";
import Link from "next/link";
import { fetchBookings } from "@/utils/bookings";
import ReviewModal from "./ReviewModal";

interface TripsListProps {
  userId: string; // Receive the userId as a prop
  initialBookings: any[]; // Receive the initialBookings as a prop
}

export default function TripsList({ userId, initialBookings }: TripsListProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [viewUpcoming, setViewUpcoming] = useState(true);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.start_date) > new Date()
  );

  // Include ongoing bookings (spanning the current date)
  const pastBookings = bookings.filter(
    (booking) =>
      new Date(booking.end_date) < new Date() ||
      new Date(booking.start_date) <= new Date()
  );

  const handleOpenReviewModal = (listingId: string) => {
    setSelectedListingId(listingId);
    setReviewModalOpen(true);
  };

  // Fetch bookings from the API
  const fetchAndSetBookings = async () => {
    const fetchedBookings = await fetchBookings(userId);
    setBookings(fetchedBookings);
  };

  // Use useEffect to fetch the bookings when the userId or initialBookings changes
  useEffect(() => {
    fetchAndSetBookings();
  }, [userId]); // Dependency on userId means it re-fetches when userId changes

  return (
    <>
      <div className="flex max-w-md w-full bg-buttonSecondary rounded-full">
        <button
          onClick={() => setViewUpcoming(true)}
          className={`flex-1 py-2 px-6 rounded-full ${
            viewUpcoming
              ? "bg-buttonPrimary text-white"
              : "bg-buttonSecondary text-[#333333]"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setViewUpcoming(false)}
          className={`flex-1 py-2 px-6 rounded-full ${
            !viewUpcoming
              ? "bg-buttonPrimary text-white"
              : "bg-buttonSecondary text-[#333333]"
          }`}
        >
          Done
        </button>
      </div>

      <div className="w-full max-w-lg mb-24 md:max-w-xl">
        {/* Conditional rendering: If no bookings, show placeholder card */}
        {(viewUpcoming ? upcomingBookings : pastBookings).length === 0 ? (
          <div className="flex flex-col gap-4 bg-white shadow-xl rounded-xl m-8 p-6 md:gap-8 md:p-8">
            <h2 className="font-semibold text-xl text-center">
              No Trips Found
            </h2>
            <p className="text-center">
              It looks like you haven't booked any trips yet. Find the perfect
              luxury escape today!
            </p>
            <Link href="/">
              <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 rounded-lg w-full">
                Explore Luxury Stays
              </button>
            </Link>
          </div>
        ) : (
          // If bookings exist, map through them and render the cards
          (viewUpcoming ? upcomingBookings : pastBookings).map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-4 bg-white shadow-xl rounded-xl m-8 p-4 md:gap-8 md:p-8"
            >
              <div>
                <p>Booking ID: {booking.id.split("-")[0]}</p>
                <p className="text-secondary">
                  Booking Date:{" "}
                  {new Date(booking.start_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(booking.end_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-4">
                <img
                  src={booking.listings.images[0]}
                  alt={`Image of ${booking.listings.title}`}
                  className="rounded-lg object-cover w-12 h-12 md:w-36 md:h-36"
                />
                <div>
                  <h2 className="font-semibold md:text-2xl">
                    {booking.listings.title}
                  </h2>
                  <p className="text-secondary md:text-xl md:font-title">
                    {booking.listings.city}, {booking.listings.country}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                {new Date(booking.end_date) < new Date() ||
                new Date(booking.start_date) <= new Date() ? (
                  <>
                    <button
                      onClick={() => handleOpenReviewModal(booking.listing_id)}
                      className="flex-1 bg-buttonSecondary hover:bg-buttonSecondaryHover text-[#333333] py-2 rounded-lg w-full"
                    >
                      Write a Review
                    </button>
                    <Link href={`/${booking.listing_id}`} className="flex-1">
                      <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 rounded-lg w-full">
                        Book Again
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <CancelBookingModal
                      bookingId={booking.id}
                      className={
                        "flex-1 bg-buttonSecondary hover:bg-buttonSecondaryHover text-[#333333] py-2 rounded-lg"
                      }
                    />
                    <Link href={`trips/${booking.id}`} className="flex-1">
                      <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 rounded-lg w-full">
                        View Details
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        listingId={selectedListingId!}
        userId={userId}
      />
    </>
  );
}
