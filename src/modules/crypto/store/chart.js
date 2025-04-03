import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialFilterState = {
  interval: "15m",
  startTime: Date.now() - 24 * 60 * 60 * 1000,
  endTime: Date.now(),
  limit: 1000,
};

export const useCryptoChartStore = create(
    (set) => ({
      filter: initialFilterState,

      setFilter: (interval) =>
        set((state) => {
          switch (interval) {
            case "15m": {
              return {
                filter: initialFilterState,
              };
            }
            case "1h": {
              return {
                filter: {
                  ...state.filter,
                  interval: "1h",
                  startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
                },
              };
            }
            case "6h": {
              return {
                filter: {
                  ...state.filter,
                  interval: "6h",
                  startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
                },
              };
            }
            case "1d": {
              return {
                filter: {
                  ...state.filter,
                  interval: "1d",
                  startTime: Date.now() - 90 * 24 * 60 * 60 * 1000,
                },
              };
            }
            case "1w": {
              return {
                filter: {
                  ...state.filter,
                  interval: "1w",
                  startTime: Date.now() - 365 * 24 * 60 * 60 * 1000,
                },
              };
            }

            default: {
              return {
                filter: initialFilterState,
              };
            }
          }
        }),
    })
);
