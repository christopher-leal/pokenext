import { Spacer, Text, useTheme } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Link href={"/"} style={{ display: "flex" }}>
        <Text color="white" h2>
          P
        </Text>
        <Text color="white" h3>
          okemon
        </Text>
      </Link>
      <Spacer
        css={{
          flex: 1,
        }}
      />
      <Link href="/favorites">
        <Text color="white">Favorites</Text>
      </Link>
    </div>
  );
};
