import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";

function Footer() {
  return (
    <div className="z-20 hidden mt-auto bg-[#F0F0F0] h-64 md:flex flex-col w-full">
      <div className="flex items-center gap-32 mx-16 mt-8 lg:mx-32 xl:mx-48">
        <div className="">
          <h3 className="font-semibold text-3xl mb-4">Get in Touch</h3>
          <p className="line-clamp-4 overflow-hidden max-w-96">
            leave feedback or ask general questions through a contact page.
            These pieces of information are valuable to businesses because they
            learn more about consumer expectations and preferences.
          </p>
        </div>
        <div className="flex gap-8 ml-auto">
          <FaXTwitter size="64" />
          <FaFacebook size="64" />
          <AiFillInstagram size="64" />
        </div>
      </div>
      <p className="text-center bottom-0 mt-auto ">
        2024 LuxeStay. inc • Copyright Reserved{" "}
      </p>
    </div>
  );
}

export default Footer;
