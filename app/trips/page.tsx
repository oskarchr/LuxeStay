import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import TripsList from "../_components/TripsList";
import { fetchBookings } from "@/utils/bookings";

async function Trips() {
  const supabase = createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    redirect("/login");
  }
  const userId = user?.user?.id;

  const bookings = await fetchBookings(userId);

  return (
    <div className="flex flex-col items-center relative mt-6 md:mt-32 min-h-[calc(100vh-256px)]">
      <h1 className="text-center font-semibold text-3xl mb-16 md:hidden">
        Trips
      </h1>
      <TripsList userId={userId} initialBookings={bookings || []} />
    </div>
  );
}

export default Trips;
