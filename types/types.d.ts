

type Listing = {
  id: string; // UUID as a string
  title: string;
  country: string;
  city: string;
  description: string;
  images: string[];
  price_per_night: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  guests: number; // Maximum number of guests
  host_name: string;
  house_rules: string[];
  safety_information: string[];
  property_features: string[];
  property_services: string[];
  property_offers: string[];
  latitude: number | null; // New property for latitude
  longitude: number | null; // New property for longitude
}

type Review = {
  id: string; 
  listing_id: string;  // Foreign key linking to the listing table
  user_id: string;  // Foreign key linking to the auth.user.id
  name: string;
  date: string;
  rating: number;
  comment: string;
}

type Favorite = {
  id: string;
  listing_id: string;
  user_id?: string;
  title: string;
  image: string;
  country: string;
  city: string;
  price_per_night: number;
  average_rating?: number; 
  review_count?: number;
}

interface BookingDetails {
  userId?: string | null;
  startDate: date | string | null;
  endDate: date | string | null;
  guestCount: number;
  title: string;
  country: string;
  city: string;
  images: string[];
  latitude: number | null;
  longitude: number | null;
  listingId?: string;
  pricePerNight: number | null;
  cleaningFee: number | null;
  totalPrice: number | null;
  maxGuests: number;
}

interface Booking {
  id: string;
  user_id: string;
  listing_id: string;
  start_date: string;
  end_date: string;
  guest_count: number;
  total_price: number;
  listings: Listing;
}