import { NextPageWithLayout } from "../_app";
import { Layout } from "../../components/layouts";
import { NoFavorites, FavoritePokemons } from "../../components/pokemon";
import { useState, useEffect } from "react";
import { localFavorites } from "../../utils";

const FavoritesPage: NextPageWithLayout = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    const pokemons = localFavorites.getFromLocalStorage();
    setFavoritePokemons(pokemons);
  }, []);

  return (
    <>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </>
  );
};

FavoritesPage.getLayout = function getLayout(page) {
  return <Layout title={"Favorites page"}>{page}</Layout>;
};

export default FavoritesPage;
