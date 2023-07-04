import React, { FC } from "react";
import { Grid, Card } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  id: number;
}
export const FavoritePokemonCard: FC<Props> = ({ id }) => {
  const router = useRouter();

  return (
    <Grid
      key={id}
      xs={6}
      sm={3}
      md={2}
      xl={1}
      onClick={() => {
        router.push(`/pokemon/${id}`);
      }}
    >
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
          width={"100%"}
          height={100}
        />
      </Card>
    </Grid>
  );
};
