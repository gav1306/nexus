"use client";

import { getQueryClient } from "@/api";
import { QueryClientProvider } from "@tanstack/react-query";

export function QueryClient({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
