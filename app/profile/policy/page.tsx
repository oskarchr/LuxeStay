import BackButton from '@/app/_components/BackButton'

function PolicyPage() {
  return (
    <div className="flex justify-center mx-auto min-h-[calc(100vh-256px)] max-w-4xl"> 
        <div className="relative m-6 md:max-h-fit md:min-h-fit md:mt-24 md:bg-white md:px-32 md:pt-6 md:pb-16 md:shadow-xl md:rounded-xl">
          <BackButton className="md:hidden absolute" />
          <h1 className="mb-12 font-semibold text-3xl text-center">Policy</h1>
          <div className="flex flex-col gap-4 md:text-center">
              <small className="text-secondary md:hidden">Last update: 25/6/2024</small>
              <p>Welcome to LuxeStay! By using our platform, you agree to the following terms. Please read them carefully.</p>
              <p className="text-[#1A73E8]">Policy</p>
              <p className="overflow-hidden">You must ensure that the property is clean, well-maintained, and in good working order prior to each guest's arrival. Specifically:
                  <br />
                  The interior and exterior of the property should be presented in a condition that meets or exceeds the expectations set by the listing. Broken appliances, malfunctioning amenities, or unsafe conditions should be addressed immediately.
                  <br />
                  Any issues that arise during a guest’s stay should be addressed promptly. As a host, you should either be available to respond to guest concerns or provide contact information for a local representative who can assist with emergencies or repairs.
              </p>
          </div>
          <small className="hidden text-secondary md:block md:absolute bottom-0 left-0 mb-4 ml-8">Last update: 25/6/2024</small>
        </div>
    </div>
  )
}

export default PolicyPage