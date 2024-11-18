import { fetchFavorites } from "@/utils/favorites";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FavoritesList from "../_components/FavoritesList";

export default async function Favorites() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const favorites = await fetchFavorites(data.user.id);

  return <FavoritesList initialFavorites={favorites} userId={data.user.id} />;
}
