'use client'

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: string;
    userId: string;
}

const ReviewModal = ({ isOpen, onClose, listingId, userId }: ReviewModalProps) => {
    const supabase = createClient()
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
  
    const handleSubmit = async () => {
      // Insert review into the database
      const { error } = await supabase.from("reviews").insert([
        {
          listing_id: listingId,
          user_id: userId,
          name: "Anonymous",
          date: new Date().toISOString(),
          rating,
          comment,
        },
      ]);
  
      if (error) {
        console.error("Error submitting review:", error.message);
        return;
      }
  
      // Show the thank-you message
      setSubmitted(true);
  
      // Optionally close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 2000);
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {!submitted ? (
            <>
              <h2 className="text-xl font-bold mb-4">Write a Review</h2>
  
              <div className="mb-4">
                <p className="mb-2">Rate your experience:</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 text-center ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
  
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Write your review here..."
                  className="w-full border rounded-lg p-2"
                />
              </div>
  
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Thank you for your review!</h2>
              <p>Your feedback has been submitted successfully.</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ReviewModal;