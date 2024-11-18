

import { createClient } from '@/utils/supabase/server';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';
import Image from 'next/image';
import calculateNights from '@/utils/calculateNights';
import Link from 'next/link';


async function BookingConfirmationPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('start_date, end_date, guest_count, total_price, ...listings(title, city, country, images, price_per_night, cleaning_fee)')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching booking details:', error);
    return;
  }

  const nights = calculateNights(data.start_date, data.end_date)

  

  return (
    <div className="flex flex-col items-center h-[calc(100vh-256px)] mt-8 md:mt-24">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-3xl">Booking <br /> Confirmed!</h1>
        <MdOutlineCheckCircleOutline size={65}/>
      </div>
      <div className="flex flex-col gap-4 bg-white m-4 px-4 py-6 shadow-xl rounded-xl max-w-4xl">
        <div>
          <p>Booking ID: {params.id.split('-')[0]}</p>
          <p className="text-secondary">Booking Date: {new Date(data.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(data.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-4">
          <Image
            src={data.images[0]}
            width={500}
            height={500}
            alt={`Image of ${data.title}`}
            className="rounded-lg object-cover w-12 h-12"
            />
          <div>
            <h2 className="font-semibold">{data.title}</h2>
            <p className="text-secondary">{data.city}, {data.country}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Price Details</h2>
          <div className="flex justify-between">
            <p>€{data.price_per_night} x {nights} nights</p>
            <p>€{nights * (data.price_per_night ?? 0)}</p>
          </div>
          <div className="flex justify-between">
            <p>Cleaning fee</p>
            <p>€{data.cleaning_fee}</p>
          </div>
          <div className="flex justify-between">
            <p>Service fee</p>
            <p>€0</p>
          </div>

          <hr className="border-[#D8D5D5] mb-4 mt-16"></hr>
          <div className="flex justify-between">
            <p>Total (EUR) </p>
            <p>€{data.total_price}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-center font-semibold text-2xl">Enjoy your stay!</h1>
        <Link href="/" className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white text-center py-4 rounded-lg max-w-md">
          Return to home
        </Link>
      </div>
    </div>
  );
}
  
  export default BookingConfirmationPage;