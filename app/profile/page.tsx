import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { FaUserCircle } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { IoChevronForward, IoWalletOutline } from "react-icons/io5";
import { MdTextSnippet } from 'react-icons/md';
import Link from 'next/link';

export default async function Profile() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const signOut = async (): Promise<void> => {
    'use server'
    const supabase = createClient()
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      redirect('/login')
    }
  }
  

  return (
    <div className="flex justify-center mx-auto min-h-[calc(100vh-256px)] max-w-2xl">
      <div className="m-6 md:mt-32 w-full">
        <h1 className="mb-8 font-semibold text-3xl text-center">Profile</h1>
        <div className="flex items-center mx-6">
          <div className="mr-4 h-12 w-12 border-2 border-gray-700 rounded-full flex items-center justify-center">
            <FaUser size={32}/>
          </div>
          <p> {data.user.email}</p>
        </div>
        <hr className="border-[#D8D5D5] my-4"></hr>
        
        <h3 className="my-8 text-2xl font-semibold">Account settings</h3>

        <div className="flex items-center mx-4 gap-2">
          <FaUserCircle size={28} className="text-[#777777]"/>
          <p>Personal information</p>
          <IoChevronForward size={24} className="ml-auto"/>
        </div>
        <hr className="border-[#D8D5D5] my-4"></hr>

        <Link href="" className="flex items-center mx-4 gap-2">
          <IoWalletOutline size={28} className=""/>
          <p>Payments</p>
          <IoChevronForward size={24} className="ml-auto"/>
        </Link>
        <hr className="border-[#D8D5D5] my-4"></hr>

        <h3 className="my-8 text-2xl font-semibold">Law</h3>

        <Link href="profile/terms" className="flex items-center mx-4 gap-2">
          <MdTextSnippet size={28} className=""/>
          <p>Terms and services</p>
          <IoChevronForward size={24} className="ml-auto"/>
        </Link>
        <hr className="border-[#D8D5D5] my-4"></hr>

        <Link href="profile/policy" className="flex items-center mx-4 gap-2">
          <MdTextSnippet size={28} className=""/>
          <p>Privacy policy</p>
          <IoChevronForward size={24} className="ml-auto"/>
        </Link>
        <hr className="border-[#D8D5D5] my-4"></hr>

        <form action={signOut} className="">
          <button className="font-medium m-6 p-2 text-accent underline">Sign out</button>
        </form>
      </div>
    </div>
  )
}
