"use client";

import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export function QueryClient({ children }) {
  const [queryClient] = useState(() => new ReactQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
