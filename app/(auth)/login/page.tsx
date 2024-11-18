import Link from "next/link";
import { login } from "../actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col p-6 gap-4 w-full">
      <h2 className="text-2xl font-semibold">Login</h2>
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

      <p className="my-4">
        Don't have an user?
        <Link href="/signup" className="font-semibold ml-2">
          Register here
        </Link>
      </p>

      <button
        formAction={login}
        className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white p-4 rounded-lg"
      >
        Continue
      </button>
    </form>
  );
}
