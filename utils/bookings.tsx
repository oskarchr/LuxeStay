import { createClient } from "./supabase/client";

export async function createBooking(
  userId: string,
  listingId: string,
  startDate: string,
  endDate: string,
  guestCount: number,
  totalPrice: number
): Promise<{ booking?: Booking; error?: string }> {
  const supabase = createClient();

  if (
    !userId ||
    !listingId ||
    !startDate ||
    !endDate ||
    !guestCount ||
    !totalPrice
  ) {
    console.error("Missing required fields for booking creation.");
    return { error: "Missing required fields." };
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        user_id: userId,
        listing_id: listingId,
        start_date: startDate,
        end_date: endDate,
        guest_count: guestCount,
        total_price: totalPrice,
      },
    ])
    .select(); // Use select to fetch the inserted data

  // Log both data and error for debugging
  console.log("Supabase Response Data:", data);
  console.log("Supabase Error:", error);

  if (error) {
    console.error("Error creating booking:", error);
    return { error: error.message };
  }

  if (!data || data.length === 0) {
    console.error("Booking data is null or undefined");
    return { error: "Booking creation failed" };
  }

  // Assuming data[0] contains the inserted booking
  return { booking: data[0] as Booking };
}

export async function deleteBooking(
  bookingId: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Error deleting booking:", error);
    return { error: error.message };
  }
  return { success: true };
}

export async function fetchBookings(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*, listings!inner(title, city, country, images, price_per_night)")
    .eq("user_id", userId); // Query bookings for the specific user

  if (error) {
    console.error("Error fetching booking details:", error);
    return [];
  }

  return data; // Return the fetched bookings
}

export const checkOverlappingBookings = async (
  listingId?: string,
  startDate?: string,
  endDate?: string
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("listing_id", listingId)
    .gte("start_date", startDate)
    .lte("end_date", endDate)
    .or(`start_date.lte.${endDate},end_date.gte.${startDate}`); // Checking for overlaps

  if (error) {
    console.error("Error checking bookings:", error);
    return false;
  }

  return data.length > 0; // Returns true if there's an overlap
};
