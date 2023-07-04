const toggleFavorites = (id: number): void => {
  let favorites: number[] = getFromLocalStorage();

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }
  saveOnLocalStorage(favorites);
};

const existsOnFavorites = (id: number): boolean => {
  let favorites: number[] = getFromLocalStorage();
  return favorites.includes(id);
};

const getFromLocalStorage = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const saveOnLocalStorage = (data: number[]): void => {
  localStorage.setItem("favorites", JSON.stringify(data));
};

export { toggleFavorites, existsOnFavorites, getFromLocalStorage };
