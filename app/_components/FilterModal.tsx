"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFilters } from "@/context/filter";

const FilterModal = ({
  closeModal,
  toggleModal,
}: {
  closeModal: () => void;
  toggleModal: () => void;
}) => {
  const { filters, setFilters, filteredCount } = useFilters();
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);

  const handleMaxGuestsChange = (guests: number | null) => {
    setFilters((prev) => ({
      ...prev,
      maxGuests: guests,
    }));
  };

  const toggleShowMoreFeatures = () => {
    setShowMoreFeatures(!showMoreFeatures);
  };

  const toggleShowMoreServices = () => {
    setShowMoreServices(!showMoreServices);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const supabase = createClient();
      const { data: listings } = await supabase
        .from("listings")
        .select("property_features, property_services");

      if (listings) {
        const allFeatures = new Set<string>();
        const allServices = new Set<string>();

        listings.forEach((listing) => {
          listing.property_features?.forEach((feature: string) =>
            allFeatures.add(feature)
          );
          listing.property_services?.forEach((service: string) =>
            allServices.add(service)
          );
        });

        setAvailableFeatures(Array.from(allFeatures));
        setAvailableServices(Array.from(allServices));
      }
    };

    fetchOptions();
  }, [filters]);

  return (
    <div className="z-50 absolute inset-0 flex flex-col place-self-center bg-background p-4 mt-12 mx-[-16px] h-screen md:h-fit md:mt-14 md:rounded-xl md:p-4 md:shadow-lg min-w-max max-w-3xl w-full md:max-w-lg md:border md:border-[#CCCCCC]">
      <div className="max-w-lg place-self-center">
        {/* Price range */}
        <div className="mt-4 ml-8">
          <div className="flex space-x-4 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [+e.target.value, prev.priceRange[1]],
                }))
              }
              className="max-w-32 border border-[#999999] p-2 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <hr className="border-[#999999] w-4 items-center"></hr>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], +e.target.value],
                }))
              }
              className="max-w-32 border border-[#999999] p-2 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Number of guests */}
        <div className="mt-4">
          <label className="ml-8 block mb-2 font-semibold">
            Number of guests
          </label>
          <div className="space-x-4 place-self-center">
            <button
              onClick={() => handleMaxGuestsChange(null)}
              className={`px-2 py-1 rounded-full border border-[#999999] min-w-16 ${
                filters.maxGuests === null
                  ? "bg-accent text-white border-0"
                  : "bg-background text-foreground"
              }`}
            >
              Any
            </button>
            <button
              onClick={() => handleMaxGuestsChange(1)}
              className={`px-2 py-1 rounded-full border border-[#999999] min-w-16 ${
                filters.maxGuests === 1
                  ? "bg-accent text-white border-0"
                  : "bg-background text-foreground"
              }`}
            >
              1
            </button>
            <button
              onClick={() => handleMaxGuestsChange(2)}
              className={`px-2 py-1 rounded-full border border-[#999999] min-w-16 ${
                filters.maxGuests === 2
                  ? "bg-accent text-white border-0"
                  : "bg-background text-foreground"
              }`}
            >
              2
            </button>
            <button
              onClick={() => handleMaxGuestsChange(4)}
              className={`px-2 py-1 rounded-full border border-[#999999] min-w-16 ${
                filters.maxGuests === 4
                  ? "bg-accent text-white border-0"
                  : "bg-background text-foreground"
              }`}
            >
              4
            </button>
            <button
              onClick={() => handleMaxGuestsChange(8)}
              className={`px-2 py-1 rounded-full border border-[#999999] min-w-16 ${
                filters.maxGuests === 8
                  ? "bg-accent text-white border-0"
                  : "bg-background text-foreground"
              }`}
            >
              8+
            </button>
          </div>
        </div>

        {/* Property Features */}
        <div className="ml-8">
          <div className="mt-4 ">
            <label className="block mb-2 font-semibold">
              Property Features
            </label>
            <div
              className={`space-y-2 mb-2 ${
                showMoreFeatures ? "max-h-36 overflow-y-scroll" : ""
              }`}
            >
              {availableFeatures
                .slice(0, showMoreFeatures ? availableFeatures.length : 4)
                .map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feature)}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          features: e.target.checked
                            ? [...prev.features, feature]
                            : prev.features.filter((f) => f !== feature),
                        }))
                      }
                      className="mr-2 h-4 w-4 shadow-md accent-accent hover:accent-[#068488c2]"
                    />
                    <span className="ml-2">{feature}</span>
                  </label>
                ))}
            </div>
            {availableFeatures.length > 4 && (
              <button
                onClick={toggleShowMoreFeatures}
                className="text-accent underline font-semibold mb-6"
              >
                {showMoreFeatures ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Property Services */}
          <div className="">
            <div className="block mb-2 font-semibold">Services</div>
            <div
              className={`space-y-2 mb-2 ${
                showMoreServices ? "max-h-36 overflow-y-scroll" : ""
              }`}
            >
              {availableServices
                .slice(0, showMoreServices ? availableServices.length : 4)
                .map((service) => (
                  <label
                    key={service}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          services: e.target.checked
                            ? [...prev.services, service]
                            : prev.services.filter((s) => s !== service),
                        }))
                      }
                      className="mr-2 h-4 w-4 shadow-md accent-accent hover:accent-[#068488c2]"
                    />
                    <span className="ml-2">{service}</span>
                  </label>
                ))}
            </div>
            {availableServices.length > 4 && (
              <button
                onClick={toggleShowMoreServices}
                className="text-accent underline font-semibold mb-6"
              >
                {showMoreServices ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFilters({
                searchText: "",
                features: [],
                services: [],
                maxGuests: null,
                priceRange: [null, null],
              });
              toggleModal();
            }}
            className="bg-buttonSecondary text-foreground hover:bg-buttonSecondaryHover p-2 rounded-lg flex-1"
          >
            Reset
          </button>
          <button
            onClick={closeModal}
            className="bg-buttonPrimary text-white hover:bg-buttonPrimaryHover p-2 rounded-lg flex-1"
          >
            Search ({filteredCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
