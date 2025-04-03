import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteCryptoStore = create(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: (symbol) =>
        set((state) => {
          return { favorites: [...state.favorites, symbol] };
        }),
      removeFromFavorites: (symbol) =>
        set((state) => {
          return { favorites: state.favorites.filter((s) => s !== symbol) };
        }),
    }),
    {
      name: "favorite-crypto-storage",
    }
  )
);
