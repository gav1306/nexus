import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCryptoNotificationStore = create(
  persist(
    (set) => ({
      threshold: 0.5,
      updateThreshold: (value) =>
        set(() => {
          return { threshold: value };
        }),
    }),
    {
      name: "crypto-notification-storage",
    }
  )
);
