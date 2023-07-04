import { FC } from "react";
import { SmallPokemon } from "../../interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  return (
    <Grid
      key={pokemon.id}
      xs={6}
      sm={3}
      md={2}
      xl={1}
      onClick={() => {
        router.push(`/pokemon/${pokemon.name}`);
      }}
    >
      <Card isHoverable isPressable>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemon.image} width={"100%"} height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>#{pokemon.id}</Text>
            <Text transform="capitalize">{pokemon.name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
