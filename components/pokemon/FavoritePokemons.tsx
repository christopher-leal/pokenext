import { Grid } from "@nextui-org/react";
import React, { FC } from "react";
import { FavoritePokemonCard } from "./FavoritePokemonCard";

interface Props {
  pokemons: number[];
}
export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((favId) => (
        <FavoritePokemonCard key={favId} id={favId} />
      ))}
    </Grid.Container>
  );
};
