'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useFilters } from '@/context/filter';

const FilterModal = ({ closeModal }: { closeModal: () => void }) => {
  const { filters, setFilters } = useFilters();
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const supabase = createClient();
      const { data: listings } = await supabase.from('listings').select('property_features, property_services');

      if (listings) {
        const allFeatures = new Set<string>();
        const allServices = new Set<string>();

        listings.forEach((listing) => {
          listing.property_features?.forEach((feature: string) => allFeatures.add(feature));
          listing.property_services?.forEach((service: string) => allServices.add(service));
        });

        setAvailableFeatures(Array.from(allFeatures));
        setAvailableServices(Array.from(allServices));
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center mt-64">
      {/* Modal with large width and scrollable content */}
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mt-4">
          <label className="block mb-2">Max Guests:</label>
          <input
            type="number"
            value={filters.maxGuests || ''}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxGuests: +e.target.value }))}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Price Range:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0] || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [+e.target.value, prev.priceRange[1]],
                }))
              }
              className="w-1/2 border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1] || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], +e.target.value],
                }))
              }
              className="w-1/2 border p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Features:</label>
          {availableFeatures.map((feature) => (
            <div key={feature} className="flex items-center">
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
                className="mr-2"
              />
              <span className="ml-2">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block mb-2">Services:</label>
          {availableServices.map((service) => (
            <div key={service} className="flex items-center">
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
                className="mr-2"
              />
              <span className="ml-2">{service}</span>
            </div>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="bg-blue-500 text-white p-2 rounded mt-6 w-full"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
