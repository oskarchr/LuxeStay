import BackButton from "@/app/_components/BackButton";
import React from "react";

function TermsPage() {
  return (
    <div className="flex justify-center mx-auto min-h-[calc(100vh-256px)] max-w-4xl">
      <div className="relative m-6 md:max-h-fit md:min-h-fit md:mt-24 md:bg-white md:px-32 md:pt-6 md:pb-16 md:shadow-xl md:rounded-xl">
        <BackButton className="md:hidden absolute" />
        <h1 className="mb-12 font-semibold text-3xl text-center">Terms</h1>
        <div className="flex flex-col gap-4 md:text-center">
          <small className="text-secondary md:hidden">
            Last update: 25/6/2024
          </small>
          <p>
            LuxeStay provides an online platform connecting hosts who have
            accommodations to rent with guests seeking to book such
            accommodations.
          </p>
          <p className="text-[#1A73E8]">Conditions of Uses</p>
          <p className="overflow-hidden">
            As a host, you must ensure that your property and hosting activities
            are compliant with all relevant laws, regulations, and ordinances.
            This includes, but is not limited to:
            <br />
            Obtaining any necessary permits or licenses required to operate a
            short-term rental in your locality.
            <br />
            Ensuring that your property meets all health and safety standards,
            such as fire alarms, carbon monoxide detectors, and other required
            safety features.
            <br />
            Staying aware of any tax obligations that may arise from rental
            income. LuxeStay does not provide tax advice, and it is the
            responsibility of the host to comply with local tax laws, including
            registering with local tax authorities and reporting income as
            required.
          </p>
        </div>
        <small className="hidden text-secondary md:block md:absolute bottom-0 left-0 mb-4 ml-8">
          Last update: 25/6/2024
        </small>
      </div>
    </div>
  );
}

export default TermsPage;
