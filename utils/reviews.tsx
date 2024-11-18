import { createClient } from "./supabase/client";

export const fetchReviewsForListing = async (
  listingId: string
): Promise<Review[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("listing_id", listingId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data as Review[]; // Cast the data to the Review type
};
