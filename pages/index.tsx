import { Layout } from "../components/layouts";
import { NextPageWithLayout } from "./_app";
import { GetStaticProps } from "next";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPageWithLayout<Props> = ({ pokemons }) => {
  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </Grid.Container>
    </>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title={"Pokedex"}>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons = data.results.map((result) => {
    const pokemonId = result.url.split("/").at(-2);
    return {
      ...result,
      id: pokemonId,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`,
    };
  });
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
