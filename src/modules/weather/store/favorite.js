import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteWeatherStore = create(
  persist(
    (set) => ({
      favorites: ["mumbai", "bangalore"],
      addToFavorites: (city) =>
        set((state) => {
          return { favorites: [...state.favorites, city] };
        }),
      removeFromFavorites: (city) =>
        set((state) => {
          return { favorites: state.favorites.filter((c) => c !== city) };
        }),
    }),
    {
      name: "favorite-weather-storage",
    }
  )
);
