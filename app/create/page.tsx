'use client'
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

const CreateListingForm: React.FC = () => {
  // Define state variables using the Listing structure
  const [title, setTitle] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [pricePerNight, setPricePerNight] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [beds, setBeds] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [guests, setGuests] = useState<string>('');
  const [hostName, setHostName] = useState<string>('');
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [safetyInformation, setSafetyInformation] = useState<string[]>([]);
  const [propertyFeatures, setPropertyFeatures] = useState<string[]>([]);
  const [propertyServices, setPropertyServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const supabase = createClient()
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Construct new listing data
    const newListing: Omit<Listing, 'id'> = {
        title,
        country, // Directly use country
        city, // Directly use city
        description,
        images: images.length > 0 ? images : [],
        price_per_night: parseFloat(pricePerNight),
        bedrooms: parseInt(bedrooms), // Convert to integer
        beds: parseInt(beds), // Convert to integer
        bathrooms: parseInt(bathrooms), // Convert to integer
        guests: parseInt(guests), // Convert to integer
        host_name: hostName,
        house_rules: houseRules.length > 0 ? houseRules : [],
        safety_information: safetyInformation.length > 0 ? safetyInformation : [],
        property_features: propertyFeatures.length > 0 ? propertyFeatures : [],
        property_services: propertyServices.length > 0 ? propertyServices : [],
      };

    // Insert the new listing into Supabase
    const { data, error } = await supabase
      .from('listings')
      .insert(newListing);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Listing created successfully!');
      // Clear the form after submission
      setTitle('');
      setCountry('');
      setCity('');
      setDescription('');
      setImages([]);
      setPricePerNight('');
      setBedrooms('');
      setBeds('');
      setBathrooms('');
      setGuests('');
      setHostName('');
      setHouseRules([]);
      setSafetyInformation([]);
      setPropertyFeatures([]);
      setPropertyServices([]);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-24 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Create New Listing</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Images (comma separated URLs)</label>
          <input
            type="text"
            value={images.join(',')}
            onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per Night</label>
          <input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Beds</label>
          <input
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Maximum Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Host Name</label>
          <input
            type="text"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">House Rules (comma separated)</label>
          <input
            type="text"
            value={houseRules.join(',')}
            onChange={(e) => setHouseRules(e.target.value.split(',').map(rule => rule.trim()))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Safety Information (comma separated)</label>
          <input
            type="text"
            value={safetyInformation.join(',')}
            onChange={(e) => setSafetyInformation(e.target.value.split(',').map(info => info.trim()))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Features (comma separated)</label>
          <input
            type="text"
            value={propertyFeatures.join(',')}
            onChange={(e) => setPropertyFeatures(e.target.value.split(',').map(feature => feature.trim()))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Services (comma separated)</label>
          <input
            type="text"
            value={propertyServices.join(',')}
            onChange={(e) => setPropertyServices(e.target.value.split(',').map(service => service.trim()))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListingForm;
