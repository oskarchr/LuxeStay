'use client'

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { IoStar } from "react-icons/io5";

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
    const [name, setName] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(false);
  
    const handleSubmit = async () => {
      const userName = name.trim() ? name : "Anonymous";
      // Insert review into the database
      const { error } = await supabase.from("reviews").insert([
        {
          listing_id: listingId,
          user_id: userId,
          name: userName,
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
      
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {!submitted ? (
            <>
              <h2 className="text-2xl text-center font-bold mb-4">Write a Review</h2>
  
              <div className="mb-4 place-self-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 text-center ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      <IoStar size={30}/>
                    </button>
                  ))}
                </div>
              </div>
  
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your experience"
                  className="w-full border rounded-lg p-2 bg-background"
                />
              </div>

              <div className="mb-4 w-2/3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name (optional)"
                  className="w-full border rounded-lg p-2 bg-background"
                />
              </div>
  
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-buttonSecondary hover:bg-buttonSecondaryHover flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg text-white bg-buttonPrimary hover:bg-buttonPrimaryHover flex-1"
                >
                  Submit Review
                </button>
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-xl font-bold mb-4">Thank you for your review!</h2>
              <p>Your feedback helps us maintain the highest standards of luxury.</p>
              <Link href="/" className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-4 rounded-lg px-4">
                Keep Browsing
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ReviewModal;