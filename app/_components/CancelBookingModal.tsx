"use client";

import { deleteBooking } from "@/utils/bookings";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface CancelBookingModalProps {
  bookingId: string;
  className?: string;
}

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  bookingId,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfirmed(false);
  };

  const handleConfirmClick = async () => {
    const result = await deleteBooking(bookingId);

    if (result.error) {
      console.error("Error deleting booking:", result.error);
      // Optionally, handle this error with UI feedback
      return;
    }

    setIsConfirmed(true);
  };

  return (
    <>
      <button onClick={openModal} className={className}>
        Cancel
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative flex flex-col justify-center gap-2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            {isConfirmed ? (
              <>
                <button onClick={closeModal}>
                  <IoClose size={25} className="absolute top-2 right-2" />
                </button>
                <p className="text-center">Cancellation Confirmed</p>
                <Link
                  href="/"
                  className="text-center bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 px-8 rounded-lg"
                  onClick={closeModal}
                >
                  Keep Browsing
                </Link>
              </>
            ) : (
              <>
                <button onClick={closeModal}>
                  <IoClose size={25} className="absolute top-2 right-2" />
                </button>
                <p className="text-center">
                  Are you sure you want to cancel this reservation?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-buttonSecondary hover:bg-buttonSecondaryHover text-[#333333] py-2 rounded-lg"
                  >
                    Keep Reservation
                  </button>
                  <button
                    onClick={handleConfirmClick}
                    className="flex-1 bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 rounded-lg"
                  >
                    Cancel Reservation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CancelBookingModal;
