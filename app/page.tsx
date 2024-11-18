import { getFilteredListings } from "@/utils/listings";
import ItemList from "./_components/ItemList";
import Searchbar from "./_components/Searchbar";




export default async function Home() {
    const initialFilters = {
      searchText: '',
      features: [],
      services: [],
      maxGuests: null,
      priceRange: [null, null],
    };

    const initialListings = await getFilteredListings(initialFilters);
  return (
    <>
    <div className="md:hidden mt-4">
        {/* Mobile searchbar, only visibly on small devices */}
        <Searchbar />
    </div>
      <ItemList initialListings={initialListings} />
    </>
  );
}
