import { GetStaticPaths, GetStaticProps } from "next";
import { pokeApi } from "../../api";
import { FullPokemon, PokemonListResponse } from "../../interfaces";
import { NextPageWithLayout } from "../_app";
import { Layout } from "../../components/layouts";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { localFavorites } from "../../utils";
import { useEffect, useState } from "react";

interface Props {
  pokemon: FullPokemon;
}

const PokemonPage: NextPageWithLayout<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existsOnFavorites(pokemon.id));
  }, [pokemon.id]);

  return (
    <>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.["official-artwork"].front_shiny ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color={"gradient"}
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? "Remove from favorites" : "Save favorites"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
};

PokemonPage.getLayout = function getLayout(page) {
  return <Layout title={page.props.children.props.pokemon.name}>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonIdPaths = [...Array(151)].map((_value, index) => ({
    params: { id: `${index + 1}` },
  }));

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemonNamePaths = data.results.map((pokemon) => ({
    params: { id: pokemon.name },
  }));

  return {
    paths: [...pokemonIdPaths, ...pokemonNamePaths],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const { id } = ctx.params as { id: string };
    const { data } = await pokeApi.get<FullPokemon>(`/pokemon/${id}`);

    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };

    return {
      props: {
        pokemon,
      },
      revalidate: 86400, // -> 24 hours,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default PokemonPage;
