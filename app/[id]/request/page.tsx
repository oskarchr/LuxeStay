import BackButton from '@/app/_components/BackButton';
import BookingRequest from '@/app/_components/BookingRequest'
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

async function RequestPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
    
    // Check if there's an error fetching the user
    if (userError || !user?.user) {
        redirect('/login')
    }

    const userId = user?.user.id; 

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single();

    // Handle error
    if (error) {
        console.error('Error fetching listing:', error);
        return <div>Error fetching listing</div>;
    }

    // Check if data exists
    if (!data) {
        return <div>No listing found.</div>;
    }

    console.log("userid : " , userId)

    return (
        <div className="flex flex-col items-center h-[calc(100vh-256px)]">
            <div className="flex justify-center w-full relative mt-8 md:mt-24">
                <BackButton className="absolute left-4" />
                <h1 className="text-center font-semibold text-3xl md:mb-8">Booking Request</h1>
            </div>
            <div className="flex gap-8 rounded-b-xl w-full max-w-3xl shadow-lg px-8 py-4 mt-8 bg-white md:hidden">
                <Image 
                    src={data.images[0]}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-12 h-12"
                    alt={`Image of ${data.title}`}
                    placeholder="empty"
                />
                <div>
                    <h1 className="font-semibold">{data.title}</h1>
                    <p>{data.city}, {data.country}</p>
                </div>
            </div>
            {/* Pass listingId (params.id) to BookingRequest */}
            <BookingRequest 
                listingId={params.id} // Passing the listingId
                title={data.title} 
                city={data.city} 
                country={data.country} 
                images={data.images} 
                latitude={data.latitude} 
                longitude={data.longitude} 
                pricePerNight={data.price_per_night ?? 0}  // Default to 0 if price_per_night is null
                cleaningFee={data.cleaning_fee}
                totalPrice={null}
                startDate={null} // Start date and end date could be initially null
                endDate={null}
                guestCount={1} // Assuming a default guest count of 1
                maxGuests={data.guests} // Add the maxGuests prop
                userId={userId}  // Set the userId in the context
                className={"flex flex-col items-center"}
            />
        </div>
    );
}

export default RequestPage;