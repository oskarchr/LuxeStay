import BackButton from "@/app/_components/BackButton";
import CancelBookingModal from "@/app/_components/CancelBookingModal";
import calculateNights from "@/utils/calculateNights";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

async function getAddressFromCoordinates(latitude: number, longitude: number) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    return data.results[0].formatted_address;
  } else {
    console.error("Geocoding error:", data.status);
    return "Address not found";
  }
}

async function TripDetails({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "start_date, end_date, guest_count, total_price, ...listings(title, city, country, images, price_per_night, cleaning_fee, latitude, longitude)"
    )
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Error fetching booking details:", error);
    return;
  }

  const nights = calculateNights(data.start_date, data.end_date);
  const address = await getAddressFromCoordinates(
    data.latitude,
    data.longitude
  );

  return (
    <div className="flex flex-col items-center mb-24 mx-8 md:min-h-[calc(100vh-256px)] mt-8 md:mt-24">
      <div className="flex flex-col gap-4 md:bg-white md:m-4 md:px-4 md:py-6 md:shadow-xl md:rounded-xl md:max-w-4xl">
        <div className="flex items-center justify-center relative mb-12">
          <BackButton className="absolute left-0" />
          <h1 className="text-center font-semibold text-3xl">Details</h1>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={data.images[0]}
            width={500}
            height={500}
            alt={`Image of ${data.title}`}
            className="rounded-lg object-cover"
          ></Image>
          <hr className="border-[#D8D5D5] min-w-full md:hidden"></hr>
          <h1 className="font-semibold text-2xl">You're going to</h1>
          <h2 className="font-semibold text-xl text-accent">{data.title}</h2>
          <hr className="border-[#D8D5D5] min-w-full md:hidden"></hr>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Check in:</p>
              <p className="text-secondary">
                {new Date(data.start_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p>Check out:</p>
              <p className="text-secondary">
                {new Date(data.end_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p>Stay Duration:</p>
              <p className="text-secondary">{nights} Nights</p>
            </div>
            <div>
              <p>Guests</p>
              <p className="text-secondary">{data.guest_count} Guests</p>
            </div>
          </div>
          <hr className="border-[#D8D5D5] min-w-full md:hidden"></hr>
          <div className="text-center">
            <h2 className="font-semibold text-lg">Adress</h2>
            <p className="text-secondary">{address || "Address not found"}</p>
          </div>
          <hr className="border-[#D8D5D5] min-w-full md:hidden"></hr>
          <div className="text-center">
            <h2 className="font-semibold text-lg">Price Breakdown</h2>
            <p className="text-secondary">
              Nightly Rate: €{data.price_per_night}/night
            </p>
            <p className="text-secondary">Cleaning Fee: €{data.cleaning_fee}</p>
            <p className="text-secondary">Service Fee: €0</p>
            <p className="text-secondary">Total Price: €{data.total_price}</p>
          </div>
          <hr className="border-[#D8D5D5] min-w-full md:hidden"></hr>
        </div>
      </div>
      <CancelBookingModal
        bookingId={params.id}
        className={
          "bg-buttonPrimary hover:bg-buttonPrimaryHover text-white py-2 rounded-lg mt-4 mx-8 w-full max-w-md"
        }
      />
    </div>
  );
}

export default TripDetails;
