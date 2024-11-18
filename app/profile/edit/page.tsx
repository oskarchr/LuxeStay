
import { updateEmail, updatePassword } from "@/app/(auth)/actions";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export default function EditProfile() {

  return (
    <form className="mx-auto min-h-[calc(100vh-256px)] max-w-md md:mt-24">
        <div className="flex flex-col gap-4 relative mt-6 w-full">
            <Link href="/profile" className="md:hidden absolute">
                <FaChevronLeft size={35}/>  
            </Link>
            <h2 className="text-3xl font-semibold text-center mb-12">Edit Profile</h2>
            <hr className="border-[#D8D5D5] mb-12" />
            {/* Email Input */}
            <label htmlFor="email" className="sr-only">Email</label>
            <input
                id="email"
                name="email"
                type="email"

                placeholder="New Email"

                className="border border-[#CCCCCC] rounded-lg p-4 bg-[#F5F5F5]"
            />

            <button
                formAction={updateEmail}
                className="bg-[#222222] text-white p-4 rounded-lg"
            >
                Update Email
            </button>

            {/* Password Input */}
            <label htmlFor="password" className="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="New Password"
                className="border border-[#CCCCCC] rounded-lg p-4 bg-[#F5F5F5]"
            />

            {/* Submit Button */}
            <button
                formAction={updatePassword}
                className="bg-[#222222] text-white p-4 rounded-lg"
            >
                Update Profile
            </button>
        </div>
    </form>
  );
};