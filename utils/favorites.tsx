import { createClient } from "./supabase/client";


export const addFavorite = async (userId: string, listingId: string): Promise<Favorite | null> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, listing_id: listingId }])
        .single();

    if (error) {
        console.error('Error adding favorite:', error);
        return null;
    }

    return data as Favorite;
};

export const removeFavorite = async (userId: string, listingId: string): Promise<Favorite | null> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: userId, listing_id: listingId });

    if (error) {
        console.error('Error removing favorite:', error);
        return null;
    }

    return data;
};

export const isFavorite = async (userId: string, listingId: string): Promise<boolean> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .match({ user_id: userId, listing_id: listingId })
        .single();

    if (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }

    return !!data;
};

export const fetchFavorites = async (userId: string): Promise<Favorite[]> => {
    const supabase = createClient();
  
    // Fetch the user's favorites
    const { data: favoritesData, error: favoritesError } = await supabase
      .from('favorites')
      .select(`
        id,
        listing_id,
        ...listings (
          title,
          images,
          country,
          city,
          price_per_night
        )
      `)
      .eq('user_id', userId);
  
    if (favoritesError) {
      console.error('Error fetching favorites:', favoritesError);
      return [];
    }
  
    // Fetch the ratings for all the listings in the favorites list
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('reviews')
      .select('listing_id, rating');
  
    if (ratingsError) {
      console.error('Error fetching ratings:', ratingsError);
      return [];
    }
  
    // Combine favorites with their average rating
    const favoritesWithRatings = favoritesData.map(favorite => {
      const listingId = favorite.listing_id;
      
  
      // Get ratings for this listing
      const listingRatings = ratingsData.filter(rating => rating.listing_id === listingId);

      // Get the number of reviews
      const reviewCount = listingRatings.length;
  
      // Calculate the average rating
      const averageRating =
        listingRatings.length > 0
          ? listingRatings.reduce((acc, review) => acc + review.rating, 0) / listingRatings.length
          : 0;
  
      return {
        id: favorite.id,
        listing_id: favorite.listing_id,
        title: favorite.title,
        image: favorite.images[0],
        country: favorite.country,
        city: favorite.city,
        price_per_night: favorite.price_per_night,
        average_rating: averageRating,
        review_count: reviewCount,
      };
    });
  
    return favoritesWithRatings || [];
  };