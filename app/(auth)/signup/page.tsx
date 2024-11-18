import React from "react";
import { signup } from "../actions";
import Link from "next/link";

function page() {
  return (
    <form className="flex flex-col p-6 gap-4 w-full">
      <h2 className="text-2xl font-semibold">Signup</h2>
      <p>to get started</p>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border border-[#CCCCCC] rounded-lg p-4 bg-[#F5F5F5]"
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border border-[#CCCCCC] rounded-lg p-4 bg-[#F5F5F5]"
      />

      <button
        formAction={signup}
        className="bg-[#222222] text-white p-4 rounded-lg"
      >
        Continue
      </button>
      <p className="my-4 text-center">
        Already registered?
        <Link href="/login" className="font-semibold ml-2">
          Login
        </Link>
      </p>
    </form>
  );
}

export default page;
