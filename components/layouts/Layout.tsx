import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface Props {
  title?: String;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "PokeApp"}</title>
        <meta name="author" content="Christopher Leal" />
        <meta name="description" content="Pokemon data" />
        <meta name="keywords" content="Keywords" />
      </Head>
      <Navbar />
      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
