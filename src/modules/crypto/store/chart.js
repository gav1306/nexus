import { create } from "zustand";

export const initialFilterState = {
  interval: "15m",
  startTime: Date.now() - 24 * 60 * 60 * 1000,
  endTime: Date.now(),
};

export const useCryptoChartStore = create((set) => ({
  filter: initialFilterState,

  setFilter: (value) =>
    set((state) => {
      switch (value) {
        case "1d": {
          return {
            filter: initialFilterState,
          };
        }
        case "7d": {
          return {
            filter: {
              ...state.filter,
              interval: "1h",
              startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
            },
          };
        }
        case "1m": {
          return {
            filter: {
              ...state.filter,
              interval: "4h",
              startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
            },
          };
        }
        case "3m": {
          return {
            filter: {
              ...state.filter,
              interval: "12h",
              startTime: Date.now() - 90 * 24 * 60 * 60 * 1000,
            },
          };
        }
        case "1y": {
          return {
            filter: {
              ...state.filter,
              interval: "3d",
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
}));
