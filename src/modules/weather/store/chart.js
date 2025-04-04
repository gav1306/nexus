import { create } from "zustand";

export const initialFilterState = {
  past_days: 3,
};

export const useWeatherChartStore = create((set) => ({
  filter: initialFilterState,
  setPastDays: (past_days) =>
    set((state) => {
      return {
        filter: {
          ...state.filter,
          past_days,
        },
      };
    }),
}));
