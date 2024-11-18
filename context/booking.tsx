"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    startDate: null,
    endDate: null,
    guestCount: 1,
    title: "",
    country: "",
    city: "",
    images: [],
    latitude: null,
    longitude: null,
    listingId: undefined,
    pricePerNight: null,
    totalPrice: null,
    maxGuests: 1,
    userId: null,
    cleaningFee: null
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
