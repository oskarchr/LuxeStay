"use client";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={`md:hidden ${className}`}>
      <FaChevronLeft size={35} />
    </button>
  );
}

export default BackButton;
