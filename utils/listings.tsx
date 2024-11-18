import { createClient } from "@/utils/supabase/client";

export const getFilteredListings = async (filters: any) => {
  const supabase = createClient();

  let query = supabase.from("listings").select("*");

  if (filters.searchText) {
    const searchText = `%${filters.searchText}%`;
    query = query.or(
      `title.ilike.${searchText},country.ilike.${searchText},city.ilike.${searchText}`
    );
  }

  const features = Array.isArray(filters.features) ? filters.features : [];
  const services = Array.isArray(filters.services) ? filters.services : [];

  if (features.length > 0) {
    query = query.filter("property_features", "cs", JSON.stringify(features));
  }
  if (services.length > 0) {
    query = query.filter("property_services", "cs", JSON.stringify(services));
  }

  // Apply price range filters
  if (filters.priceRange[0] !== null && filters.priceRange[0] !== undefined) {
    query = query.gte("price_per_night", filters.priceRange[0]);
  }
  if (filters.priceRange[1] !== null && filters.priceRange[1] !== undefined) {
    query = query.lte("price_per_night", filters.priceRange[1]);
  }

  // Apply max guests filter
  if (filters.maxGuests !== null && filters.maxGuests !== undefined) {
    query = query.gte("guests", filters.maxGuests);
  }

  const { data: listings, error } = await query;

  if (error) {
    console.error("Error fetching listings:", error);
    return [];
  }

  // Fetch reviews and compute average ratings as before
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("listing_id, rating");

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
    return [];
  }

  const listingsWithRatings = listings.map((listing) => {
    const listingReviews = reviews.filter(
      (review) => review.listing_id === listing.id
    );
    const ratings = listingReviews.map((review) => review.rating);
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
        : 0;

    return { ...listing, average_rating: averageRating };
  });

  return listingsWithRatings;
};
